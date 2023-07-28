from django.db import models
from django.conf import settings
from django.urls import reverse


# 지역을 선택하게 choices를 하나 넣고 하나는 즐겨찾기를 생각해서 category를 넣을게요.

class RegionCategory(models.Model):
    region_C = models.CharField(max_length=20, db_index=True)
    region_num = models.IntegerField(unique=True)
    meta_description = models.TextField(blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True,
                             related_name='region_C')  # 유저가져오기
    star = models.BooleanField(default=None)

    class Meta:
        ordering = ['region_C']
        verbose_name = 'region_C'
        verbose_name_plural = 'regions_C'

    def __str__(self):
        return self.region_C


# Create your models here.
class Board(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True,
                             related_name='community')  # 유저가져오기
    description = models.TextField(max_length=200, blank=True)  # 내용쓰기
    info_image = models.ImageField(upload_to='board/%Y/%m/%d')  # 이미지 업로드 (다중이미지 안됨)
    create_date = models.DateTimeField(auto_now=True)  # 피그마에 나와있진 않지만 날짜가 없으면 혼돈 올 듯 해서 넣었슴돠...
    # 셀렉트 박스에 넣으려고 초이스로 했어유...
    category_choice = (
    ('서울', '서울'), ('경기도', '경기도'), ('강원도', '강원도'), ('부산', '부산'), ('인천', '인천'), ('대구', '대구'), ('대전', '대전'), ('광주', '광주'),
    ('울산', '울산'), ('세종', '세종'), ('충청북도', '충청북도'), ('충청남도', '충청남도'), ('전라북도', '전라북도'), ('전라남도', '전라남도'),
    ('경상북도', '경상북도'), ('경상남도', '경상남도'), ('제주도', '제주도'))
    region = models.CharField(max_length=20, choices=category_choice, null=True)


class Comment(models.Model):
    community = models.ForeignKey(Board, on_delete=models.CASCADE)  # 게시글 지우면 다 지워짐

    description = models.TextField(blank=True)  # 내용쓰기


class Card(models.Model):
    KIND_CHOICES = (
        ('메뉴얼', '메뉴얼'),
        ('카드뉴스', '카드뉴스'),
    )

    kind = models.CharField(max_length=30, choices=KIND_CHOICES)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True,
                             related_name='menu_card')  # 유저가져오기
    tags = models.CharField(max_length=50, blank=True)  # 해쉬태그
    title = models.CharField(max_length=50)
    scrap = models.BooleanField(default=None)

    created_at = models.DateTimeField(auto_now=True)  # 생성 날짜

class Images(models.Model) :
    menu_card = models.ForeignKey(Card, on_delete=models.CASCADE)
    images = models.ImageField(upload_to='mc/%Y/%m/%d')
    description = models.TextField(blank=True)