package com.example.musicLibrary.album;

import com.example.musicLibrary.album.dto.AlbumRequestDto;
import com.example.musicLibrary.album.dto.AlbumResponseDto;
import com.example.musicLibrary.song.SongService;
import com.example.musicLibrary.song.dto.SongResponseDto;
import com.example.musicLibrary.user.Role;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/albums")
public class AlbumController {
    @Autowired
    private AlbumService albumService;

    @Autowired
    private SongService songService;

    @GetMapping("")
    public ResponseEntity<List<AlbumResponseDto>> all() {
        List<AlbumResponseDto> albums = albumService.findAllAlbum();
        return ResponseEntity.ok(albums);
    }

    @GetMapping("/{albumId}")
    public ResponseEntity<AlbumResponseDto> one(@PathVariable("albumId") UUID id) {
        AlbumResponseDto album = albumService.findById(id);
        return ResponseEntity.ok(album);
    }

    @GetMapping("/{albumId}/songs")
    public ResponseEntity<List<SongResponseDto>> songsFromAlbum(@PathVariable("albumId") UUID id) {
        List<SongResponseDto> songs = songService.findByAlbumId(id);
        return ResponseEntity.ok(songs);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AlbumResponseDto> post(@Valid @RequestBody AlbumRequestDto album) {
        AlbumResponseDto returnAlbum = albumService.createAlbum(album);
        return ResponseEntity.created(URI.create("/api/v1/albums/" + album.getId()))
                .body(returnAlbum);
    }

    @PutMapping("/{albumId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AlbumResponseDto> put(@Valid @RequestBody AlbumRequestDto album, @PathVariable(value = "albumId") UUID id) {
        album.setId(id);
        AlbumResponseDto updatedAlbum = albumService.updateAlbum(album);
        return ResponseEntity.ok(updatedAlbum);
    }

    @PatchMapping("/{albumId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AlbumResponseDto> patch(@RequestBody AlbumRequestDto album, @PathVariable(value = "albumId") UUID id) {
        AlbumResponseDto updatedAlbum = albumService.updateAlbum(id, album);
        return ResponseEntity.ok(updatedAlbum);
    }

    @DeleteMapping("/{albumId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable(value = "albumId") UUID id) {
        albumService.deleteAlbum(id);
        return ResponseEntity.noContent().build();
    }
}
