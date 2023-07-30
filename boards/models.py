from django.db import models
from django.conf import settings
from django.urls import reverse


# Create your models here.
class RegionCategory(models.Model):
    region_name = models.CharField(max_length=20, db_index=True)
    region_num = models.IntegerField(unique=True)

    slug = models.SlugField(max_length=200, db_index=True, allow_unicode=True)

    class Meta:
        ordering = ['region_name']
        verbose_name = 'region_name'
        verbose_name_plural = 'regions_name'

    def __str__(self):
        return self.region_name

    def get_absolute_url(self):
        return reverse('board:region_in_category', args=[str(self.slug)])

    @classmethod
    def get_instance_by_name(cls, region_name):
        try:
            return cls.objects.get(region_name=region_name)
        except cls.DoesNotExist:
            return None


class Board(models.Model):
    category = models.ForeignKey(RegionCategory, on_delete=models.SET_NULL, null=True, related_name='region')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True,
                             related_name='community')  # 유저가져오기
    description = models.TextField(max_length=200, blank=True)  # 내용쓰기
    info_image = models.ImageField(upload_to='community/%Y/%m/%d')  # 이미지 업로드 (다중이미지 안됨)
    create_date = models.DateTimeField(auto_now=True)  # 피그마에 나와있진 않지만 날짜가 없으면 혼돈 올 듯 해서 넣었슴돠...
    # 셀렉트 박스에 넣으려고 초이스로 했어유...
    region_choice = (
        ('서울', '서울'), ('경기도', '경기도'), ('강원도', '강원도'), ('부산', '부산'), ('인천', '인천'), ('대구', '대구'), ('대전', '대전'),
        ('광주', '광주'),
        ('울산', '울산'), ('세종', '세종'), ('충청북도', '충청북도'), ('충청남도', '충청남도'), ('전라북도', '전라북도'), ('전라남도', '전라남도'),
        ('경상북도', '경상북도'), ('경상남도', '경상남도'), ('제주도', '제주도'))
    region = models.CharField(max_length=20, choices=region_choice, null=True)
    complete = models.BooleanField(default=False)

    def __str__(self):
        return self.description


class Comment(models.Model):
    community = models.ForeignKey(Board, on_delete=models.CASCADE)  # 게시글 지우면 다 지워짐
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True,
                             related_name='comment')  # 유저가져오기
    description = models.TextField(blank=True)  # 내용쓰기

    def __str__(self):
        return self.description
