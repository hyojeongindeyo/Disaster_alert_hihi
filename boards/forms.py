from django import forms
from .models import Board
from .models import Comment

# boardForm
class boardForm(forms.ModelForm):
    class Meta:
        model = Board
        fields = ('user','region','description', 'info_image')

# commentForm
class commentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('community','description')