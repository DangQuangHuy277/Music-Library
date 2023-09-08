package com.example.musicLibrary.album.dto;

import com.example.musicLibrary.album.Album;
import com.example.musicLibrary.song.dto.ArtistDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class AlbumResponseDto {
    private UUID id;
    private String title;
    private LocalDate releaseDate;
    private String link;
    private ArtistDto artist;

    public AlbumResponseDto(Album album) {
        this.id = album.getId();
        this.title = album.getTitle();
        this.releaseDate = album.getReleaseDate();
        this.link = album.getLink();
        this.artist = new ArtistDto(album.getArtist().getId(), album.getArtist().getName());
    }
}
