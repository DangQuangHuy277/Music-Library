package com.example.musicLibrary.song;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;
import java.util.UUID;

public interface SongRepository extends JpaRepository<Song, UUID> {

    @Query("SELECT s FROM Song s JOIN s.artists a WHERE a.id = :artistId")
    Set<Song> findByArtistId(@Param("artistId") UUID artistId);

    @Query("SELECT s FROM Song s WHERE s.album.id = :albumId")
    Set<Song> findByAlbumId(@Param("albumId") UUID albumId);
}
