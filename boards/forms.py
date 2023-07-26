from django import forms
from .models import board
from .models import comment

# boardForm
class boardForm(forms.ModelForm):
    class Meta:
        model = board
        fields = ('user','region','description', 'info_image')

# commentForm
class commentForm(forms.ModelForm):
    class Meta:
        model = comment
        fields = ('user','community','description')