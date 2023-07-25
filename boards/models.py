from django.db import models


# Create your models here.
class board(models.Model) :
    ## user랑 category는 모델 완성후 외래키로 가져옴
    description = models.TextField(max_length = 100, blank = True)
    img = models.ImageField(upload_to = 'board/%Y/%m/%d')
    create_date = models.DateTimeField(auto_now = True) #피그마에 나와있진 않지만 날짜가 없으면 혼돈 올 듯 해서 넣었슴돠...

class comment(models.Model) :
    ## user 받아오기 / author = models.ForeignKey(예를 들어 user, on_delete=models.CASCADE) -> 참조 된 user가 삭제되면 삭제되게끔 CASCADE를 썼슴돠.. 바꾸셔도 돼유
    content = models.TextField(max_length = 50, blank = False)
    create_date = models.DateTimeField(auto_now=True)