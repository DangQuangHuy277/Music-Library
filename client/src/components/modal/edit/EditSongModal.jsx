import { useState } from 'react';
import Modal from '@mui/material/Modal';
export default function EditSongModal({ song, open, onClose, onSave }) {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState(song.title);
    const [artists, setArtists] = useState(song.artists);
    const [album, setAlbum] = useState(song.album);
    const [duration, setDuration] = useState(song.duration);

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

    const handleSave = () => {
        const [min, sec] = duration.split(":").map((str) => parseInt(str));
        if (min < 0 || min > 59 || sec < 0 || sec > 59) {
            setError("Duration must be in format mm:ss");
            return;
        }

        onSave({
            id: song.id,
            title: title,
            duration: duration,
        });
        setError(null);
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-song-modal"
            aria-describedby="edit-song-modal"
        >
            <div className="modal bg-white absolute top-1/2 left-1/2 p-4 border rounded border-sky-500 shadow-xl transform -translate-x-1/2 -translate-y-1/2">
                <h2 className='text-center font-semibold text-cyan-600 text-xl'>Edit Song</h2>
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
                            value={artists.map((artist) => artist.name).join(', ')} onChange={handleArtistChange} disabled />
                    </div>
                    <div className="modal-field">
                        <label htmlFor="album">Album</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="album" value={album} onChange={handleAlbumChange} disabled />
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