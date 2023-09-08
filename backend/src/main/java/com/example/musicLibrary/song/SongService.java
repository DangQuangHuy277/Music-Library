package com.example.musicLibrary.song;

import com.example.musicLibrary.album.Album;
import com.example.musicLibrary.album.AlbumRepository;
import com.example.musicLibrary.artist.Artist;
import com.example.musicLibrary.artist.ArtistRepository;
import com.example.musicLibrary.exception.ResourceNotFoundException;
import com.example.musicLibrary.song.dto.SongRequestDto;
import com.example.musicLibrary.song.dto.SongResponseDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SongService {
    @Autowired
    private SongRepository songRepository;

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private AlbumRepository albumRepository;

    public List<SongResponseDto> findAllSong() {
        List<Song> songs = songRepository.findAll();
        return songs.stream()
                .map(SongResponseDto::new)
                .toList();
    }

    public SongResponseDto findById(UUID id) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Song not found"));
        return new SongResponseDto(song);
    }

    public List<SongResponseDto> findByArtistId(UUID id) {
        Set<Song> songs = songRepository.findByArtistId(id);
        if (songs.isEmpty()) throw new ResourceNotFoundException("Song not found");
        return songs.stream().map(SongResponseDto::new).toList();
    }

    public List<SongResponseDto> findByAlbumId(UUID id) {
        Set<Song> songs = songRepository.findByAlbumId(id);
        if (songs.isEmpty()) throw new ResourceNotFoundException("Song not found");
        return songs.stream().map(SongResponseDto::new).toList();
    }

    @Transactional
    public SongResponseDto createSong(SongRequestDto song) {
        Set<Artist> artists = new HashSet<>();
        for (String artistName : song.getArtists()) {
            Artist artist = artistRepository.findByName(artistName);
            if (artist == null)
                throw new ResourceNotFoundException("Artist with name: " + artistName + " not found");
            artists.add(artist);
        }

        Album album = null;
        if (song.getAlbum() != null) {
            album = albumRepository.findByTitle(song.getAlbum());
            if (album == null)
                throw new ResourceNotFoundException("Album with title: " + song.getAlbum() + " not found");
        }

        Song newSong = new Song(song.getTitle(), song.getGenre(),
                Duration.ofSeconds(song.getDuration()), song.getLink(), album, artists);
        return new SongResponseDto(songRepository.save(newSong));
    }

    @Transactional
    public SongResponseDto updateSong(UUID id, SongRequestDto partialSong) {
        Song existingSong = songRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Song not found"));

        if (partialSong.getTitle() != null) existingSong.setTitle(partialSong.getTitle());
        if (partialSong.getDuration() != null) existingSong.setDuration(Duration.ofSeconds(partialSong.getDuration()));
        if (partialSong.getGenre() != null) existingSong.setGenre(partialSong.getGenre());
        if (partialSong.getLink() != null) existingSong.setLink(partialSong.getLink());

        if (partialSong.getArtists() != null && !partialSong.getArtists().isEmpty()) {
            existingSong.setArtists(
                    partialSong.getArtists().stream()
                            .map(artistRepository::findByName)
                            .peek(artist -> {
                                if (artist == null) {
                                    throw new ResourceNotFoundException("Artist not found");
                                }
                            })
                            .collect(Collectors.toSet()));
        }

        if (partialSong.getAlbum() != null) {
            Album album = albumRepository.findByTitle(partialSong.getAlbum());
            existingSong.setAlbum(
                    Optional.ofNullable(album)
                            .orElseThrow(() -> new ResourceNotFoundException("Album with name: " + partialSong.getAlbum() + " not found")));
        }

        return new SongResponseDto(songRepository.save(existingSong));
    }

    @Transactional
    public SongResponseDto updateSong(SongRequestDto song) {
        Song existingSong = songRepository.findById(song.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Song not found"));

        existingSong.setTitle(song.getTitle());
        existingSong.setGenre(song.getGenre());
        existingSong.setLink(song.getLink());
        existingSong.setDuration(Duration.ofSeconds(song.getDuration()));
        Set<Artist> artists = new HashSet<>();
        for (String artistName : song.getArtists()) {
            Artist artist = artistRepository.findByName(artistName);
            if (artist == null)
                throw new ResourceNotFoundException("Artist with name: " + artistName + " not found");
            artists.add(artist);
        }
        existingSong.setArtists(artists);

        Album album = null;
        if (song.getAlbum() != null) {
            album = albumRepository.findByTitle(song.getAlbum());
            if (album == null)
                throw new ResourceNotFoundException("Album with title: " + song.getAlbum() + " not found");
        }
        existingSong.setAlbum(album);
        return new SongResponseDto(songRepository.save(existingSong));
    }


    public void deleteSong(UUID id) {
        songRepository.deleteById(id);
    }

}
