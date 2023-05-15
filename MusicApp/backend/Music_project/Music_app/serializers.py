from rest_framework import serializers
from .models import *


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        include_fields = kwargs.pop('include_fields', None)
        exclude_fields = kwargs.pop('exclude_fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if include_fields is not None:
            for field in include_fields:
                self.fields.append(field)
        if exclude_fields is not None:
            for field in exclude_fields:
                split = field.split('__')
                to_access = self.fields
                for i in range(len(split)-1):
                    to_access = to_access.get(split[i])
                if isinstance(to_access, serializers.ListSerializer):
                    to_access = to_access.child
                to_access.fields.pop(split[-1])


class ArtistSerializer(DynamicFieldsModelSerializer):
    """
    """
    artist_name = serializers.CharField(max_length=100)
    real_name = serializers.CharField(max_length=100)
    country = serializers.CharField(max_length=100)
    email = serializers.EmailField(max_length=100)
    songs = Song()

    class Meta:
        model = Artist
        fields = ('id', 'artist_name', 'real_name', 'country', 'email', 'songs')
        ordering = ['id']


class SongSerializer(DynamicFieldsModelSerializer):
    """
    """
    song_name = serializers.CharField(max_length=100)
    composer = serializers.CharField(max_length=100)
    genre = serializers.CharField(max_length=100)
    year_of_release = serializers.IntegerField()
    artists = ArtistSerializer(many=True, read_only=True)

    class Meta:
        model = Song
        fields = (
            'id', 'song_name', 'composer', 'genre', 'year_of_release', 'artists')
        ordering = ['id']


class AlbumSerializer(DynamicFieldsModelSerializer):
    """
    """
    album_title = serializers.CharField(max_length=100)
    nr_of_tracks = serializers.IntegerField()
    label = serializers.CharField(max_length=100)
    year_of_release = serializers.IntegerField()
    main_artist = ArtistSerializer(read_only=True)
    main_artist_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Album
        fields = "__all__"
        ordering = ['id']


class AlbumSerializerID(DynamicFieldsModelSerializer):
    album_title = serializers.CharField(max_length=100)
    nr_of_tracks = serializers.IntegerField()
    label = serializers.CharField(max_length=100)
    year_of_release = serializers.IntegerField()
    main_artist = ArtistSerializer()

    class Meta:
        model = Album
        fields = "__all__"
        depth = 1


class PerformsOnSerializer(DynamicFieldsModelSerializer):
    """
    """
    song = SongSerializer(read_only=True)
    artist = ArtistSerializer(read_only=True)
    nr_of_views = serializers.IntegerField()
    duration = serializers.CharField(max_length=10)
    song_id = serializers.IntegerField(write_only=True)
    artist_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = PerformsOn
        fields = "__all__"
        ordering = ['id']


class PerformsOnSerializerID(DynamicFieldsModelSerializer):
    song = SongSerializer()
    artist = ArtistSerializer()
    nr_of_views = serializers.IntegerField()
    duration = serializers.CharField(max_length=10)

    class Meta:
        model = PerformsOn
        fields = "__all__"
        depth = 1


class ArtistViewsStatisticsSerializer(DynamicFieldsModelSerializer):
    """
    """
    avg_views = serializers.IntegerField(read_only=True)

    class Meta:
        model = Artist
        fields = ['artist_name', 'avg_views']


class SongsNumberStatisticsSerializer(DynamicFieldsModelSerializer):
    """
    """
    nr_performances = serializers.IntegerField(read_only=True)

    class Meta:
        model = Song
        fields = ['song_name', 'nr_performances']
