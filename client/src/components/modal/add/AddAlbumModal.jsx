import { Modal } from "@mui/material";
import { useState } from "react";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export default function AddAlbumModal({ open, onClose, onSave }) {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [releaseDate, setReleaseDate] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleArtistChange = (event) => {
        setArtist(event.target.value);
    }

    const handleDateChange = (event) => {
        setReleaseDate(event.target.value);
    }

    const handleSave = async () => {
        if (!title || !artist || !releaseDate) {
            setError("All fields must be filled");
            return;
        }
        if (/^\d{4}-\d{2}-\d{2}$/.test(releaseDate) === false) {
            setError("Date must be in format yyyy-mm-dd");
            return;
        }

        const res = await fetch(`${apiBaseUrl}/albums`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, artist: artist.trim(), releaseDate }),
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
        setArtist("");
        setReleaseDate("");
        setError(null);
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-album-modal"
            aria-describedby="add-album-modal"
        >

            <div className="modal bg-white absolute top-1/2 left-1/2 p-4 border rounded border-sky-500 shadow-xl transform -translate-x-1/2 -translate-y-1/2">
                <h2 className='text-center font-semibold text-cyan-600 text-xl'>Add Album</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="modal-content">
                    <div className="modal-field">
                        <label htmlFor="title">Title</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="title" value={title} onChange={handleTitleChange} />
                    </div>
                    <div className="modal-field">
                        <label htmlFor="artist">Artist</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="artist"
                            value={artist} onChange={handleArtistChange} />
                    </div>
                    <div className="modal-field">
                        <label htmlFor="releaseDate">ReleaseDate</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="releaseDate" value={releaseDate} onChange={handleDateChange} />
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