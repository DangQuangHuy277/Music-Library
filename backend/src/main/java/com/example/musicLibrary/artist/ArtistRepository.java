package com.example.musicLibrary.artist;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ArtistRepository extends JpaRepository<Artist, UUID> {
    public Artist findByName(String name);
}
