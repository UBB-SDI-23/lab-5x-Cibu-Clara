from django.db import models
from django.contrib.auth.models import User


class Song(models.Model):
    song_name = models.CharField(max_length=100)
    composer = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    year_of_release = models.IntegerField()
    artists = models.ManyToManyField('Artist', through='PerformsOn')
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.song_name


class Artist(models.Model):
    artist_name = models.CharField(max_length=100)
    real_name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    songs = models.ManyToManyField('Song', through='PerformsOn')
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.artist_name


class Album(models.Model):
    album_title = models.CharField(max_length=100)
    nr_of_tracks = models.IntegerField()
    label = models.CharField(max_length=100)
    year_of_release = models.PositiveSmallIntegerField()
    main_artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='albums')
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.album_title


class PerformsOn(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    nr_of_views = models.IntegerField()
    duration = models.CharField(max_length=10)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.artist.artist_name + " - " + self.song.song_name


class UserProfile(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    location = models.CharField(max_length=100)
    bio = models.CharField(max_length=600)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile", to_field="username")
    activation_code = models.CharField(max_length=36)
    activation_expiry_date = models.DateTimeField()
    active = models.BooleanField()

