CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
BEGIN;


CREATE TABLE IF NOT EXISTS public.album
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    link character varying(255) COLLATE pg_catalog."default",
    release_date date NOT NULL,
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    artist_id uuid,
    CONSTRAINT album_pkey PRIMARY KEY (id),
    CONSTRAINT album_title_key UNIQUE (title)
);

CREATE TABLE IF NOT EXISTS public.artist
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    birthdate date NOT NULL,
    gender character varying(255) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    nationality character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT artist_pkey PRIMARY KEY (id),
    CONSTRAINT artist_name_key UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.song
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    duration numeric(21, 0) NOT NULL,
    genre character varying(255) COLLATE pg_catalog."default",
    link character varying(255) COLLATE pg_catalog."default",
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    album_id uuid,
    CONSTRAINT song_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.song_artist
(
    artist_id uuid NOT NULL,
    song_id uuid NOT NULL,
    CONSTRAINT song_artist_pkey PRIMARY KEY (artist_id, song_id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default",
    role character varying(255) COLLATE pg_catalog."default",
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT uk_6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email),
    CONSTRAINT uk_r43af9ap4edm43mmtq01oddj6 UNIQUE (username)
);

ALTER TABLE IF EXISTS public.album
    ADD CONSTRAINT fkmwc4fyyxb6tfi0qba26gcf8s1 FOREIGN KEY (artist_id)
    REFERENCES public.artist (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.song
    ADD CONSTRAINT fkrcjmk41yqj3pl3iyii40niab0 FOREIGN KEY (album_id)
    REFERENCES public.album (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.song_artist
    ADD CONSTRAINT fk9tevojs24wnwin3di24wlao1m FOREIGN KEY (artist_id)
    REFERENCES public.artist (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.song_artist
    ADD CONSTRAINT fka29cre1dfpdj3gek88ukv43cc FOREIGN KEY (song_id)
    REFERENCES public.song (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

END;