import Sidebar from "../components/Sidebar";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

import { useEffect, useState } from "react";
import SongBar from "../components/bar/SongBar";
import AddSongModal from "../components/modal/add/AddSongModal";

export default function SongsFromAlbum() {
    const [songs, setSongs] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    document.title = "Songs";

    useEffect(() => {
        let isMounted = true;
        async function fetchSongs() {
            const response = await fetch(`${apiBaseUrl}/songs`,{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            console.log(data);
            if (isMounted) {
                data.forEach((song) => {
                    song.duration = new Date(song.duration * 1000).toISOString().slice(14, 19);
                });
                setSongs(data);
            }
        }
        fetchSongs();
        return () => { isMounted = false };
    }, [isAdding]);

    const handleDelete = async (id) => {
        const res = await fetch(`${apiBaseUrl}/songs/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
        });
        if (!res.ok) {
            const message = await res.json();
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
        if (!res.ok) {
            const message = await res.json();
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

    const handleAdd = async () => {
        setIsAdding(true);
    };

    const handleCloseModal = () => {
        setIsAdding(false);
    };

    const handleSaveModal = async () => {
        setIsAdding(false);
    }


    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full h-screen overflow-scroll">
                <h1 className="text-3xl font-bold mb-4 text-center">Songs</h1>
                <button className="float-right me-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={handleAdd}>
                    Add New Song
                </button>
                <AddSongModal open={isAdding} onClose={handleCloseModal} onSave={handleSaveModal} />
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="w-1/12">#</th>
                            <th className="w-3/12">Title</th>
                            <th className="w-2/12">Artist</th>
                            <th className="w-2/12">Album</th>
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
                                showArtist={true}
                                artists={song.artists}
                                showAlbum={true}
                                album={song.album?.title}
                                duration={song.duration}
                                onDelete={() => handleDelete(song.id)}
                                onUpdate={handleUpdate}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}