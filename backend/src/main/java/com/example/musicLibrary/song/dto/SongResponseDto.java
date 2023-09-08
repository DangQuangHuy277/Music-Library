package com.example.musicLibrary.song.dto;

import com.example.musicLibrary.song.Song;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.util.Date;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Getter
@Setter
public class SongResponseDto {
    private UUID id;
    private String title;
    private String genre;
    private Long duration;
    private String link;
    private AlbumDto album;
    private Set<ArtistDto> artists;

    public SongResponseDto(Song song) {
        this.id = song.getId();
        this.title = song.getTitle();
        this.genre = song.getGenre();
        this.duration = song.getDuration().getSeconds();
        this.link = song.getLink();
        this.album = song.getAlbum() != null ?
                new AlbumDto(song.getAlbum().getId(), song.getAlbum().getTitle()) : null;
        this.artists = song.getArtists().stream()
                .map(artist -> new ArtistDto(artist.getId(), artist.getName()))
                .collect(Collectors.toSet());
    }
}

