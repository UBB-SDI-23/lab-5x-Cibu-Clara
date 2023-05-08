from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from .Pagination import CustomPagination
from ..models import Song
from ..serializers import SongSerializer


class SongListCreateView(generics.ListCreateAPIView):
    serializer_class = SongSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Song.objects.all()
        print(queryset.explain())
        return queryset