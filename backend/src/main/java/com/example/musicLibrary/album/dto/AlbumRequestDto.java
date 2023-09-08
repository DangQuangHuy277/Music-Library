package com.example.musicLibrary.album.dto;

import com.example.musicLibrary.song.dto.ArtistDto;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class AlbumRequestDto {
    private UUID id;

    @NotNull
    private String title;

    @NotNull
    private LocalDate releaseDate;
    private String link;
    @NotNull
    private String artist;
}
