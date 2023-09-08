package com.example.musicLibrary.album;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;


public interface AlbumRepository extends JpaRepository<Album, UUID> {
    Album findByTitle(String name);
}
