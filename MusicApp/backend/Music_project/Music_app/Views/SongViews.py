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


class SongFilterCreateView(generics.ListCreateAPIView):
    serializer_class = SongSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        min_year = self.kwargs.get("year")
        queryset = Song.objects.all()
        if min_year is not None:
            queryset = queryset.filter(year_of_release__gte=min_year)
        print(queryset.explain())
        print(min_year)
        return queryset