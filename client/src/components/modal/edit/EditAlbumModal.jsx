import { useState } from 'react';
import Modal from '@mui/material/Modal';
export default function EditAlbumModal({ album, open, onClose, onSave }) {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState(album.title);
    const [artist, setArtist] = useState(album.artist);
    const [releaseDate, setReleaseDate] = useState(album.releaseDate);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleArtistChange = (event) => {
        setArtist(event.target.value);
    }

    const handleDateChange = (event) => {
        setReleaseDate(event.target.value);
    }


    const handleSave = () => {
        if(!title || !artist || !releaseDate){
            setError("All fields must be filled");
            return;
        }
        if(/^\d{4}-\d{2}-\d{2}$/.test(releaseDate) === false){
            setError("Date must be in format yyyy-mm-dd");
            return;
        }
        onSave({
            id: album.id,
            title: title,
            artist: artist,
            releaseDate: releaseDate,
        });
        setError(null);
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-album-modal"
            aria-describedby="edit-album-modal"
        >
            <div className="modal bg-white absolute top-1/2 left-1/2 p-4 border rounded border-sky-500 shadow-xl transform -translate-x-1/2 -translate-y-1/2">
                <h2 className='text-center font-semibold text-cyan-600 text-xl'>Edit Album</h2>
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
                            value={artist} onChange={handleArtistChange} disabled />
                    </div>

                    <div className="modal-field">
                        <label htmlFor="date">Release Date</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="date" value={releaseDate} onChange={handleDateChange} />
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