package com.example.musicLibrary.song.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class ArtistDto {
    private UUID id;
    private String name;
}
