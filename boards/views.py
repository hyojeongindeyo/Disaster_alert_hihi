import math
import time
from itertools import islice
from django.http import JsonResponse

from collections import defaultdict
from django.db.models import F

from django.contrib.auth.decorators import login_required
import csv

from pyproj import Proj, transform
import requests, json
from django.shortcuts import render, get_object_or_404, redirect
import random

from .forms import boardForm, commentForm
from .models import *
from django.contrib import messages

import os
from dotenv import load_dotenv

load_dotenv()

# Create your views here.

def main_page(request):
    banners = Banner.objects.all()
    selected_banner = random.choice(banners)

    context = {
        'selected_banner': selected_banner,
    }

    return render(request, 'boards/board_main_page.html', context)


def board_list(request):
    region_filter = request.GET.get('region', '')  # 주소 필터링 값을 가져옴
    print(region_filter)
    if region_filter:  # 주소 필터링 값이 있다면 해당 주소의 게시글만 필터링
        boards = Board.objects.filter(region=region_filter, complete=False).order_by('-create_date')
    else:  # 주소 필터링 값이 없다면 모든 게시글 표시
        boards = Board.objects.filter(complete=False).order_by('-create_date')

    region_choices = Board.region_choice  # 주소 선택지

    context = {
        'boards': boards,
        'region_choices': region_choices,
        'selected_region': region_filter,  # 선택한 주소를 템플릿으로 전달
    }

    return render(request, 'boards/board_list.html', context)


@login_required
def board_post(request):
    if request.method == 'POST':
        form = boardForm(request.POST, request.FILES)
        print(request.POST)
        print(request.FILES)
        if form.is_valid():
            board = form.save(commit=False)
            board.user = request.user

            # 사용자가 선택한 지역 이름
            selected_region_name = request.POST.get('region')

            try:
                # 사용자가 선택한 지역 이름으로 'RegionCategory' 모델에서 인스턴스를 찾음
                selected_region_instance = RegionCategory.objects.get(region_name=selected_region_name)
            except RegionCategory.DoesNotExist:
                # 사용자가 선택한 지역 이름에 해당하는 인스턴스를 찾지 못한 경우에 대한 처리
                # 적절한 예외 처리를 수행하거나 다른 로직을 추가할 수 있습니다.
                return render(request, 'boards/board_create.html',
                              {'form': form, 'region_choices': Board.region_choice})

            board.category = selected_region_instance  # 선택한 지역의 인스턴스를 'category' 필드에 할당
            board.save()
            return redirect('board_list')
    else:
        form = boardForm(request=request)
    return render(request, 'boards/board_create.html', {'form': form, 'region_choices': Board.region_choice})


def board_detail(request, pk):
    board = Board.objects.get(id=pk)
    return render(request, 'boards/board_detail.html', {'board': board})


@login_required
def board_update(request, pk):
    board = get_object_or_404(Board, pk=pk)
    if request.method == 'POST':
        form = boardForm(request.POST, request.FILES, instance=board)
        print(request.POST)
        print(request.FILES)
        print(form.is_valid())
        if form.is_valid():
            board.user = request.user
            boards = form.save(commit=False)
            # 사용자가 선택한 지역 이름
            selected_region_name = request.POST.get('region')

            if request.POST.get('info_image') == '' :
                board.info_image = ''

            try:
                # 사용자가 선택한 지역 이름으로 'RegionCategory' 모델에서 인스턴스를 찾음
                selected_region_instance = RegionCategory.objects.get(region_name=selected_region_name)
            except RegionCategory.DoesNotExist:
                # 사용자가 선택한 지역 이름에 해당하는 인스턴스를 찾지 못한 경우에 대한 처리
                # 적절한 예외 처리를 수행하거나 다른 로직을 추가할 수 있습니다.
                return render(request, 'boards/board_update.html',
                              {'form': form, 'board': board, 'region_choices': Board.region_choice})

            board.category = selected_region_instance  # 선택한 지역의 인스턴스를 'category' 필드에 할당
            boards.save()
            return redirect('board_detail', pk=board.pk)
    else:
        form = boardForm(request=request, instance=board)
    return render(request, 'boards/board_update.html',
                  {'form': form, 'board': board, 'region_choices': Board.region_choice})


def board_delete(request, pk):
    board = Board.objects.get(id=pk)
    board.delete()
    return redirect('board_list')


def comment_create(request, pk):
    board = Board.objects.get(id=pk)
    if request.method == 'POST':
        form = commentForm(request.POST)
        if form.is_valid():
            description = form.cleaned_data['description']
            comment = Comment.objects.create(description=description, community=board)
            comment.user = request.user
            comment.save()
            return redirect('board_detail', pk)
    else:
        form = commentForm()
    return render(request, 'boards/board_detail.html', {'form': form})


def comment_delete(request, board_id, comment_id):
    comment = Comment.objects.get(id=comment_id)
    comment.delete()
    return redirect('board_detail', board_id)


def board_report(request, pk):
    board = get_object_or_404(Board, id=pk)
    report = BoardReport.objects.filter(board=board, user=request.user).first()

    if report is None:
        apply = BoardReport(board=board, user=request.user, complete=True)
        apply.save()

        board.count += 1
        if board.count == 3:
            board.delete()
        else :
            board.save()
    else:
        messages.warning(request, '이미 신고한 게시글 입니다.')

    return redirect('board_list')

def comment_report(request, board_id, comment_id):
    comment = get_object_or_404(Comment, id=comment_id)
    report = CommentReport.objects.filter(comment=comment, user=request.user).first()

    if report is None:
        apply = CommentReport(comment=comment, user=request.user, complete=True)
        apply.save()

        comment.count += 1
        if comment.count == 3:
            comment.delete()
        else :
            comment.save()
    else:
        messages.warning(request, '이미 신고한 댓글 입니다.')

    return redirect('board_detail', pk=board_id)

def region_in_category(request, category_slug=None):
    current_category = None
    categories = RegionCategory.objects.all()

    if category_slug:
        current_category = get_object_or_404(RegionCategory, slug=category_slug)

    if request.method == 'POST' :
        print(request.POST)
        print(request.user)
        print(current_category)

    banners = Banner.objects.all()
    selected_banner = random.choice(banners)

    context = {
        'selected_banner': selected_banner,
        'current_category': current_category,
        'categories': categories,
    }

    return render(request, 'boards/message_main.html', context)



def detail_in_category(request, category_slug=None):

    region = get_object_or_404(RegionCategory, slug=category_slug)
    banners = Banner.objects.all()
    selected_banner = random.choice(banners)

    context = {
        'selected_banner': selected_banner,
        'region' : region,
        'appkey' : os.getenv('MESSAGE_KEY')
    }

    return render(request, 'boards/message_detail.html', context)


def BtoW_coordinate_transform(x1, y1) :

    inProj = Proj(init='epsg:2097')
    outProj = Proj(init='epsg:4326')

    x2, y2 = transform(inProj, outProj, x1, y1)  # 구형 좌표계를 투영 좌표계로 변환

    return x2, y2

def WtoB_coordinate_transform(a,b) :

    inProj = Proj(init='epsg:4326')
    outProj = Proj(init='epsg:2097')


    x1, y1 = a, b
    x2, y2 = transform(inProj, outProj, x1, y1)  # 구형 좌표계를 투영 좌표계로 변환

    return x2, y2

def shelter_enter(request):

    locX = 127.048995
    locY = 37.5571237

    x1, y1 = WtoB_coordinate_transform(locX, locY)

    f = open('boards/shelter.csv', 'r')
    rdr = csv.reader(f)

    locLength = {}
    locLoc = []
    locName = []
    shelterX = []
    shelterY = []

    for line in rdr :
        if line[7] == '01':
            x2 = line[26]
            y2 = line[27]
            if x2=='' or y2== '' :
                pass
            else :
                x = float(x1)-float(x2)
                y = float(y1)-float(y2)
                locLength[float(math.sqrt(pow(x, 2) + pow(y, 2)))] = [line[19], line[21], line[26], line[27]]

    dic = dict(sorted(locLength.items()))
    dic = dict(islice(dic.items(), 5))
    result = list(dic.values())

    for i in result :
        x, y = BtoW_coordinate_transform(float(i[2]), float(i[3]))
        locLoc.append(i[0])
        locName.append(i[1])
        shelterX.append(x)
        shelterY.append(y)

    print(locLoc)

    f.close()

    context = {
        'locX': locX,
        'locY': locY,
        'locLocs': locLoc,
        'locNames': locName,
        'shelterXs': shelterX,
        'shelterYs': shelterY,
        'kakao_key': os.getenv('KAKAO_APP_KEY')
    }

    return render(request, 'boards/shelter_first.html', context)

def shelter_location(request):

    locX = 0
    locY = 0

    if request.method == 'POST':
        print(request.POST)
        locX = float(request.POST['locationY'])
        locY = float(request.POST['locationX'])

    x1, y1 = WtoB_coordinate_transform(locX, locY)

    f = open('boards/shelter.csv', 'r', encoding='cp949')
    rdr = csv.reader(f)

    locLength = {}
    locLoc = []
    locName = []
    shelterX = []
    shelterY = []

    for line in rdr :
        if line[7] == '01':
            x2 = line[26]
            y2 = line[27]
            if x2=='' or y2== '' :
                pass
            else :
                x = float(x1)-float(x2)
                y = float(y1)-float(y2)
                locLength[float(math.sqrt(pow(x, 2) + pow(y, 2)))] = [line[19], line[21], line[26], line[27]]

    dic = dict(sorted(locLength.items()))
    dic = dict(islice(dic.items(), 5))
    result = list(dic.values())

    for i in result :
        x, y = BtoW_coordinate_transform(float(i[2]), float(i[3]))
        locLoc.append(i[0])
        locName.append(i[1])
        shelterX.append(x)
        shelterY.append(y)

    print(locLoc)

    f.close()

    api_json = geocode_myposition(locX, locY)

    if api_json.status_code == 200 :
        json_body = json.loads(api_json.text)
        full_address = json_body['documents'][0]['road_address']['address_name']
    else:
        full_address = "Address not available"

    avgX = (locX + shelterX[0] + shelterX[1] + shelterX[2] + shelterX[3] + shelterX[4]) / 6.0
    avgY = (locY + shelterY[0] + shelterY[1] + shelterY[2] + shelterY[3] + shelterY[4]) / 6.0

    print(avgX, avgY)

    context = {
        'locX': locX,
        'locY': locY,
        'avgX': avgX,
        'avgY': avgY,
        'locLocs': locLoc,
        'locNames': locName,
        'shelterXs': shelterX,
        'shelterYs': shelterY,
        'kakao_key': os.getenv('KAKAO_APP_KEY'),
        'full_address' : full_address
    }

    return render(request, 'boards/shelter.html', context)

def geocode_myposition(locX, locY) :

    kakao_url = f'https://dapi.kakao.com/v2/local/geo/coord2address.json?x={locX}&y={locY}&input_coord=WGS84'
    headers = {'Authorization': f'KakaoAK {os.getenv("KAKAO_REST_API")}'}
    api_json = requests.get(kakao_url, headers=headers)

    return api_json


def random_banner(request):
    banners = Banner.objects.all()
    selected_banner = random.choice(banners)

    context = {
        'selected_banner': selected_banner,
    }

    return render(request, 'boards/board_main_page.html', context)

def actions(request) :
    return render(request, 'boards/actionTips_main.html')


def manuals(request):
    menus = CardNews.objects.filter(kind='메뉴얼').order_by('-id')
    return render(request, 'boards/actionTips_menual.html', {'menus':menus})

def cardNews(request):
    cards = CardNews.objects.filter(kind='카드뉴스').order_by('-id')
    return render(request, 'boards/actionTips_cardnews.html', {'cards':cards})

def manual_view(request, card_id):
    #manual = ImageMulti.objects.get(card_id=card_id)
    behaviors = Behavior.objects.filter(card_id=card_id)
    behaviors_with_images = BehaviorImage.objects.select_related('behavior').filter(behavior__in=behaviors).values(
        card_id = F('behavior__card'),
        title_cd = F('behavior__title_cd'),
        title_nm = F('behavior__title_nm'),
        description = F('behavior__description'),
        image_src = F('image'))

    title_cd_dict = defaultdict(list)
    for data in behaviors_with_images:
        title_cd_dict[data['title_cd']].append(data)

    result = []
    for title_cd, behaviors_with_images in title_cd_dict.items():
        result_data = {
            'card_id': behaviors_with_images[0]['card_id'],
            'title_cd': title_cd,
            'title_nm': behaviors_with_images[0]['title_nm'],
            'description': behaviors_with_images[0]['description'],
            'image_src': [data['image_src'] for data in behaviors_with_images],
        }
        result.append(result_data)
    #print(result)

    manual_type_nm = "none"
    if card_id == 1:
        manual_type_nm = "태풍"
    elif card_id == 5:
        manual_type_nm = "지진"
    elif card_id == 6:
        manual_type_nm = "호우"

    context = {
        'behaviors': result,
        'type':manual_type_nm,
    }
    #print(behaviors_with_images)
    return render(request, 'boards/manual_view.html', context)
# def card_view(request, card_id):
#    card = ImageMulti.objects.get(card_id=card_id)
#    card_type_nm = "none"
#    if card_id == 7:
#        card_type_nm = "침수차량"
#    elif card_id == 8:
#        card_type_nm = "여름철"
#    elif card_id == 9:
#        card_type_nm = "손씻기"
#    return render(request, 'boards/card_view.html', {'card': card, 'type':card_type_nm})

## 이 부분은 현재 모델 고친다는 얘기 들었기 때문에 일단 주석처리하고 고치고 난 후에 다시 살릴게요.
# def manual_scrap (request, card_id):
#     card = get_object_or_404(CardNews, card_id=card_id)
#     scrap = CardScrap.objects.filter(card=card, user=request.user).first()
#
#     if scrap is None:
#         apply = CardScrap(card=card, user=request.user, scrap=True)
#         apply.save()
#     else:
#         apply = CardScrap(card=card, user=request.user, scrap=False)
#         apply.save()
#
#     return redirect('boards/manual_view.html', card_id)