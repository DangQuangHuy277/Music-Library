package com.example.musicLibrary.song.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class SongRequestDto {
    private UUID id;
    @NotNull
    private String title;
    private String genre;
    @NotNull
    private Long duration;
    private String link;
    private String album;
    private Set<String> artists;
}
