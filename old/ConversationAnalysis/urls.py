from django.conf.urls import include
from django.urls import re_path as url
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^', include('MainPage.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
