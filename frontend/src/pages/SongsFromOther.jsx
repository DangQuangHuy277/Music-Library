import Sidebar from "../components/Sidebar";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

import { useEffect, useState } from "react";
import SongBar from "../components/bar/SongBar";
import { useParams } from "react-router-dom";

export default function SongsFromOther({ source }) {
    const [songs, setSongs] = useState([]);
    const { id } = useParams();
    const [artistName, setArtistName] = useState("");

    const link = ((source === "album") ?
        apiBaseUrl + "/albums/" : apiBaseUrl + "/artists/")
        + id;

    const dataLink = link + "/songs";

    useEffect(() => {
        let isMounted = true;
        async function fetchSongs() {
            const response = await fetch(dataLink, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }
            if (isMounted) {
                data.forEach((song) => {
                    song.duration = new Date(song.duration * 1000).toISOString().slice(14, 19);
                });
                setSongs(data);
            }
        }
        fetchSongs();
        return () => { isMounted = false };
    }, [id, dataLink]);

    useEffect(() => {
        let isMounted = true;
        async function fetchAlbums() {
            const response = await fetch(link, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }
            if (isMounted) {
                if (source == 'album') {
                    document.title = data.title;
                    setArtistName(data.Artist.name);
                }
                else document.title = data.name;

            }
        }
        fetchAlbums();
        return () => { isMounted = false };
    }, [id, link, source]);


    const handleDelete = async (id) => {
        const res = await fetch(`${apiBaseUrl}/songs/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
        });
        const message = await res.json();
        if (!res.ok) {
            alert(message.message);
            return;
        }
        setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
    };

    const handleUpdate = async (id, title, duration) => {
        const formatedDuration = duration;
        const [min, sec] = duration.split(":").map((str) => parseInt(str));
        duration = min * 60 + sec;

        const res = await fetch(`${apiBaseUrl}/songs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, duration }),
        });
        const message = await res.json();
        if (!res.ok) {
            alert(message.message);
            return;
        }
        setSongs((prevSongs) =>
            prevSongs.map((song) => {
                if (song.id === id) {
                    return { ...song, title, duration: formatedDuration };
                }
                return song;
            })
        );
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full h-screen overflow-scroll">
                <h1 className="text-3xl font-bold mb-4 text-center">
                    {source == 'album' ? `Album ${document.title}` : `Artist ${document.title}`}
                </h1>
                {source == 'album' ? <div className="mb-4 flex justify-center">
                    <span className="text-gray-500 pr-1">Artist: </span>
                    <span className="text-gray-700 ">{artistName}</span>
                </div> : null}
                {songs.length > 0 ?
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="w-1/12">#</th>
                                <th className="w-3/12">Title</th>
                                <th className="w-2/12">Duration</th>
                                <th className="w-1/12"></th>
                                <th className="w-1/12"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.map((song, index) => (
                                <SongBar
                                    key={song.id}
                                    id={song.id}
                                    number={index + 1}
                                    title={song.title}
                                    showArtist={false}
                                    showAlbum={false}
                                    artists={song.artists}
                                    album={song.album?.title}
                                    duration={song.duration}
                                    onDelete={() => handleDelete(song.id)}
                                    onUpdate={handleUpdate}
                                />
                            ))}
                        </tbody>
                    </table> : <div className="text-center text-gray-700">No songs available</div>}
            </div>
        </div>
    );
}