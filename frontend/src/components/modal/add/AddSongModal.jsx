import { Modal } from "@mui/material";
import { useState } from "react";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export default function AddSongModal({ open, onClose, onSave }) {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [artists, setArtists] = useState("");
    const [album, setAlbum] = useState("");
    const [duration, setDuration] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleArtistChange = (event) => {
        setArtists(event.target.value);
    }

    const handleAlbumChange = (event) => {
        setAlbum(event.target.value);
    }

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    }

    const handleSave = async () => {
        const [min, sec] = duration.split(":").map((str) => parseInt(str));
        if (min < 0 || min > 59 || sec < 0 || sec > 59) {
            setError("Duration must be in format mm:ss");
            return;
        }
        if (!title || !duration) {
            setError("Title, Duration, Artists are required");
            return;
        }

        if (/^[a-zA-Z ]+(, [a-zA-Z ]+)*$/.test(artists) === false) {
            setError("Artists must be in format: artist1, artist2, artist3, ...");
            return;
        }

        const artistList = artists.split(",").map((artist) => artist.trim());
        const res = await fetch(`${apiBaseUrl}/songs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ title, duration: min * 60 + sec, artists: artistList, album: album.trim() }),
        });

        // if(/^[a-zA-Z0-9 ]*$/.test(album) === false){
        //     setError("Album must be in format: album");
        //     return;
        // }
        if (!res.ok) {
            const message = await res.json();
            console.log(message)
            setError(message.message)
            return;
        }
        onSave();
        setTitle("");
        setArtists("");
        setAlbum("");
        setDuration("");
        setError(null);
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-song-modal"
            aria-describedby="add-song-modal"
        >

            <div className="modal bg-white absolute top-1/2 left-1/2 p-4 border rounded border-sky-500 shadow-xl transform -translate-x-1/2 -translate-y-1/2">
                <h2 className='text-center font-semibold text-cyan-600 text-xl'>Add Song</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="modal-content">
                    <div className="modal-field">
                        <label htmlFor="title">Title</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="title" value={title} onChange={handleTitleChange} />
                    </div>
                    <div className="modal-field">
                        <label htmlFor="artists">Artists</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="artists"
                            value={artists} onChange={handleArtistChange} />
                    </div>
                    <div className="modal-field">
                        <label htmlFor="album">Album</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="album" value={album} onChange={handleAlbumChange} />
                    </div>
                    <div className="modal-field">
                        <label htmlFor="duration">Duration</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="duration" value={duration} onChange={handleDurationChange} />
                    </div>
                    <div className="modal-buttons flex justify-between pt-2">
                        <button className="modal-button bg-gray-500 p-1 text-white rounded-md" onClick={onClose}>Cancel</button>
                        <button className="modal-button bg-green-500 p-1 pl-3 pr-3 text-white rounded-md" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>

        </Modal>
    )

}