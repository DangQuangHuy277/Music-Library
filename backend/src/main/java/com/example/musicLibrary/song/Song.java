package com.example.musicLibrary.song;

import com.example.musicLibrary.album.Album;
import com.example.musicLibrary.artist.Artist;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.Duration;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Song {
    @Id
    @GeneratedValue
    private UUID id;
    @NotNull
    private String title;
    private String genre;
    @NotNull
    private Duration duration;
    private String link;
    @ManyToOne(fetch = FetchType.LAZY)
    private Album album;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "SONG_ARTIST",
            joinColumns = @JoinColumn(name = "SONG_ID"),
            inverseJoinColumns = @JoinColumn(name = "ARTIST_ID")
    )
    private Set<Artist> artists;


    public Song(@NotNull String title, String genre, @NotNull Duration duration, String link) {
        this.title = title;
        this.genre = genre;
        this.duration = duration;
        this.link = link;
    }

    public Song(@NotNull String title, String genre, @NotNull Duration duration, String link, Album album, Set<Artist> artists) {
        this.title = title;
        this.genre = genre;
        this.duration = duration;
        this.link = link;
        this.album = album;
        this.artists = artists;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Song song)) return false;
        return Objects.equals(title, song.title) && Objects.equals(duration, song.duration) && Objects.equals(link, song.link) && Objects.equals(artists, song.artists);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, duration, link, artists);
    }
}
