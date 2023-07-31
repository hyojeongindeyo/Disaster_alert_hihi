from django import forms
from .models import Board
from .models import Comment

# boardForm
class boardForm(forms.ModelForm):
    class Meta:
        model = Board
        fields = ['region', 'description', 'info_image']

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)  # request 객체를 인스턴스 변수로 저장
        super(boardForm, self).__init__(*args, **kwargs)
        self.fields['region'].widget = forms.Select(choices=Board.region_choice)

class AddressFilterForm(forms.ModelForm):
    class Meta:
        model = Board
        fields = ['region']

    def __init__(self, *args, **kwargs):
        super(boardForm, self).__init__(*args, **kwargs)
        self.fields['region'].widget = forms.Select(choices=Board.region_choice)


# commentForm
class commentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['description']

# 임시 신고 form
#class ReportForm(forms.Form):
#    reason = forms.CharField(widget=forms.Textarea, max_length=200)