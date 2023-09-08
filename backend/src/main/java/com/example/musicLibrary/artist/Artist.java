package com.example.musicLibrary.artist;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

@Entity
@Getter @Setter
public class Artist {
    @Id
    @GeneratedValue
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    private UUID id;

    @NotNull
    @Column(unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotNull
    @Temporal(TemporalType.DATE)
    private LocalDate birthdate;

    private String nationality;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Artist artist)) return false;
        return Objects.equals(name, artist.name) && gender == artist.gender && Objects.equals(birthdate, artist.birthdate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, gender, birthdate);
    }
}
