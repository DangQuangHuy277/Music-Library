package com.example.musicLibrary.album;

import com.example.musicLibrary.album.dto.AlbumRequestDto;
import com.example.musicLibrary.album.dto.AlbumResponseDto;
import com.example.musicLibrary.artist.Artist;
import com.example.musicLibrary.artist.ArtistRepository;
import com.example.musicLibrary.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AlbumService {
    @Autowired
    AlbumRepository albumRepository;

    @Autowired
    ArtistRepository artistRepository;

    public List<AlbumResponseDto> findAllAlbum() {
        return albumRepository.findAll().stream().map(AlbumResponseDto::new).toList();
    }

    public AlbumResponseDto findById(UUID id) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Album not found"));
        return new AlbumResponseDto(album);
    }

    public AlbumResponseDto createAlbum(AlbumRequestDto album) {
        Artist artist = artistRepository.findByName(album.getArtist());
        if (artist == null)
            throw new ResourceNotFoundException("Artist with name: " + album.getArtist() + " not found");
        Album newAlbum = new Album(album.getTitle(), album.getReleaseDate(), album.getLink(), artist);
        return new AlbumResponseDto(albumRepository.save(newAlbum));
    }

    public AlbumResponseDto updateAlbum(UUID id, AlbumRequestDto partialAlbum) {
        Album existingAlbum = albumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Album not found"));

        if (partialAlbum.getTitle() != null) existingAlbum.setTitle(partialAlbum.getTitle());
        if (partialAlbum.getLink() != null) existingAlbum.setLink(partialAlbum.getLink());
        if (partialAlbum.getReleaseDate() != null) existingAlbum.setReleaseDate(partialAlbum.getReleaseDate());
        if (partialAlbum.getArtist() != null) {
            Artist artist = artistRepository.findByName(partialAlbum.getArtist());
            if (artist == null)
                throw new ResourceNotFoundException("Artist with name: " + partialAlbum.getArtist() + " not found");
            existingAlbum.setArtist(artist);
        }

        return new AlbumResponseDto(albumRepository.save(existingAlbum));
    }

    public AlbumResponseDto updateAlbum(AlbumRequestDto album) {
        Album existingAlbum = albumRepository.findById(album.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Album not found"));

        Artist artist = artistRepository.findByName(album.getArtist());
        if (artist == null)
            throw new ResourceNotFoundException("Artist with name: " + album.getArtist() + " not found");

        existingAlbum.setTitle(album.getTitle());
        existingAlbum.setReleaseDate(album.getReleaseDate());
        existingAlbum.setLink(album.getLink());
        existingAlbum.setArtist(artist);

        return new AlbumResponseDto(albumRepository.save(existingAlbum));
    }


    public void deleteAlbum(UUID id) {
        albumRepository.deleteById(id);
    }
}
