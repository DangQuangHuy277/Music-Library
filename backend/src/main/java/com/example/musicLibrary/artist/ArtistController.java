package com.example.musicLibrary.artist;

import com.example.musicLibrary.song.SongService;
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
@RequestMapping(value = "/api/v1/artists")
public class ArtistController {
    @Autowired
    ArtistService artistService;
    @Autowired
    SongService songService;

    @GetMapping("")
    public ResponseEntity<List<Artist>> all() {
        List<Artist> artists = artistService.findAllArtist();
        return ResponseEntity.ok(artists);
    }

    @GetMapping("/{artistId}")
    public ResponseEntity<Artist> one(@PathVariable("artistId") UUID id) {
        Artist artist = artistService.findById(id);
        return ResponseEntity.ok(artist);
    }

    @GetMapping("/{artistId}/songs")
    public ResponseEntity<List<SongResponseDto>> songsFromArtist(@PathVariable("artistId") UUID id) {
        List<SongResponseDto> songs = songService.findByArtistId(id);
        return ResponseEntity.ok(songs);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Artist> post(@Valid @RequestBody Artist artist) {
        Artist createdArtist = artistService.createArtist(artist);
        return ResponseEntity.created(URI.create("/api/v1/artists/" + createdArtist.getId()))
                .body(createdArtist);
    }

    @PutMapping("/{artistId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Artist> put(@Valid @RequestBody Artist artist) {
        Artist updatedArtist = artistService.updateArtist(artist);
        return ResponseEntity.ok(updatedArtist);
    }

    @PatchMapping("/{artistId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Artist> patch(@PathVariable("artistId") UUID id, @RequestBody Artist artist) {
        Artist updatedArtist = artistService.updateArtist(id, artist);
        return ResponseEntity.ok(updatedArtist);
    }

    @DeleteMapping("/{artistId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable(value = "artistId") UUID id) {
        artistService.deleteArtist(id);
        return ResponseEntity.noContent().build();
    }

}
