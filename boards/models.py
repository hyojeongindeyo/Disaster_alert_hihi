from django.db import models
from django.urls import reverse


# class Category(models.Model) :
#     name = models.CharField(max_length=20, unique=True)
#
#     def __str__(self):
#         return self.name
#
#     def get_absolute_url(self):
#         return reverse('boards:board_list', args=[self.name])


# Create your models here.
class Board(models.Model) :
    # 유저 가져오기 = user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name='community')  # 유저가져오기
    # region = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='regions')
    description = models.TextField(max_length=200,blank=True)  # 내용쓰기
    info_image = models.ImageField(upload_to='board/%Y/%m/%d')  # 이미지 업로드 (다중이미지 안됨)
    create_date = models.DateTimeField(auto_now=True)  # 피그마에 나와있진 않지만 날짜가 없으면 혼돈 올 듯 해서 넣었슴돠...
    #셀렉트 박스에 넣으려고 초이스로 했어유...
    category_choice = (('서울', '서울'), ('경기도', '경기도'), ('강원도', '강원도'), ('부산', '부산'), ('인천', '인천'), ('대구', '대구'), ('대전', '대전'), ('광주', '광주'),('울산', '울산'), ('세종', '세종'), ('충청북도', '충청북도'), ('충청남도', '충청남도'), ('전라북도', '전라북도'), ('전라남도', '전라남도'),('경상북도', '경상북도'), ('경상남도', '경상남도'), ('제주도', '제주도'))
    category = models.CharField(max_length=20, choices=category_choice)



class Comment(models.Model) :
    community = models.ForeignKey(Board, on_delete=models.CASCADE)  # 게시글 지우면 다 지워짐
    ## user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name='comment')  # 유저가져오기
    description = models.TextField(blank=True)  # 내용쓰기