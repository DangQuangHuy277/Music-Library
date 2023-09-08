package com.example.musicLibrary.song;

import com.example.musicLibrary.song.dto.SongRequestDto;
import com.example.musicLibrary.song.dto.SongResponseDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/songs")
public class SongController {

    @Autowired
    private SongService songService;

    @GetMapping("")
    public ResponseEntity<List<SongResponseDto>> all() {
        List<SongResponseDto> songs = songService.findAllSong();
        return ResponseEntity.ok(songs);
    }

    @GetMapping("/{songId}")
    public ResponseEntity<SongResponseDto> one(@PathVariable("songId") UUID id) {
        SongResponseDto song = songService.findById(id);
        return ResponseEntity.ok(song);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SongResponseDto> post(@Valid @RequestBody SongRequestDto song) {
        SongResponseDto returnSong = songService.createSong(song);
        return ResponseEntity.created(URI.create("/api/v1/songs/" + returnSong.getId()))
                .body(returnSong);
    }

    @PutMapping("/{songId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SongResponseDto> put(@Valid @RequestBody SongRequestDto song, @PathVariable(value = "songId") UUID id) {
        song.setId(id);
        SongResponseDto updatedSong = songService.updateSong(song);
        return ResponseEntity.ok(updatedSong);
    }

    @PatchMapping("/{songId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SongResponseDto> patch(@RequestBody SongRequestDto song, @PathVariable(value = "songId") UUID id) {
        SongResponseDto updatedSong = songService.updateSong(id, song);
        return ResponseEntity.ok(updatedSong);
    }

    @DeleteMapping("/{songId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable(value = "songId") UUID id) {
        songService.deleteSong(id);
        return ResponseEntity.noContent().build();
    }

}
