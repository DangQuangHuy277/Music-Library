package com.example.musicLibrary.album;

import com.example.musicLibrary.artist.Artist;
import com.example.musicLibrary.song.Song;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDate;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Album {
    @Id
    @GeneratedValue
    private UUID id;

    @NotNull
    @Column(unique = true)
    private String title;

    @NotNull
    @Temporal(TemporalType.DATE)
    private LocalDate releaseDate;

    private String link;

    @ManyToOne(cascade = CascadeType.ALL)
    private Artist artist;

    public Album(@NotNull String title, @NotNull LocalDate releaseDate, String link, Artist artist) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.link = link;
        this.artist = artist;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Album album)) return false;
        return Objects.equals(title, album.title) && Objects.equals(releaseDate, album.releaseDate) && Objects.equals(artist, album.artist);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, releaseDate, artist);
    }
}
