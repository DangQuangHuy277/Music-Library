package com.example.musicLibrary.artist;

import com.example.musicLibrary.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ArtistService {
    @Autowired
    ArtistRepository artistRepository;

    public List<Artist> findAllArtist() {
        return artistRepository.findAll();
    }

    public Artist findById(UUID id) {
        return artistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artist not found"));
    }

    public Artist createArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public Artist updateArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public Artist updateArtist(UUID id, Artist partialArtist) {
        Artist existingArtist = artistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artist not found"));
        if (partialArtist.getName() != null) existingArtist.setName(partialArtist.getName());
        if (partialArtist.getGender() != null) existingArtist.setGender(partialArtist.getGender());
        if (partialArtist.getBirthdate() != null) existingArtist.setBirthdate(partialArtist.getBirthdate());
        if (partialArtist.getNationality() != null) existingArtist.setNationality(partialArtist.getNationality());

        return artistRepository.save(existingArtist);
    }

    public void deleteArtist(UUID id) {
        artistRepository.deleteById(id);
    }

}
