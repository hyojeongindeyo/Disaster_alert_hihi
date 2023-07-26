from django.db import models


# Create your models here.
class Board(models.Model) :
    # 유저 가져오기 = user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name='community')  # 유저가져오기
    # 카테고리 = region = models.ForeignKey(Region, ondelete=models.CASCADE, related_name = 'regions') # 지역 카테고리라면
    description = models.TextField(max_length=200,blank=True)  # 내용쓰기
    info_image = models.ImageField(upload_to='board/%Y/%m/%d')  # 이미지 업로드 (다중이미지 안됨)
    create_date = models.DateTimeField(auto_now=True)  # 피그마에 나와있진 않지만 날짜가 없으면 혼돈 올 듯 해서 넣었슴돠...



class Comment(models.Model) :
    community = models.foreignKey(Board, on_delete=models.CASCADE)  # 게시글 지우면 다 지워짐
    ## user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name='comment')  # 유저가져오기
    description = models.TextField(blank=True)  # 내용쓰기