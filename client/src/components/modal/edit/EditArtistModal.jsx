import { useState } from 'react';
import Modal from '@mui/material/Modal';
export default function EditArtistModal({ artist, open, onClose, onSave }) {
    const [error, setError] = useState(null);
    const [name, setName] = useState(artist.name);
    const [gender, setGender] = useState(artist.gender);
    const [dob, setDob] = useState(artist.birthdate);
    const [nationality, setNationality] = useState(artist.nationality);

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    }

    const handleDobChange = (event) => {
        setDob(event.target.value);
    }

    const handleNationalityChange = (event) => {
        setNationality(event.target.value);
    }

    const handleSave = () => {
        if (name === '') {
            setError('Name cannot be empty');
            return;
        }
        if (/^\d{4}-\d{2}-\d{2}$/.test(dob) === false) {
            setError('Date of birth must be in the format YYYY-MM-DD');
            return;
        }

        onSave({
            id: artist.id,
            name: name,
            gender: gender,
            birthdate: dob,
            nationality: nationality,
        });

        setError(null);
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-artist-modal"
            aria-describedby="edit-artist-modal"
        >
            <div className="modal bg-white absolute top-1/2 left-1/2 p-4 border rounded border-sky-500 shadow-xl transform -translate-x-1/2 -translate-y-1/2">
                <h2 className='text-center font-semibold text-cyan-600 text-xl'>Edit Song</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="modal-content">
                    <div className="modal-field">
                        <label htmlFor="name">Name</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="name" value={name} onChange={handleNameChange} />
                    </div>
                    <div className="modal-field">
                        <label htmlFor="gender">Gender</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="gender"
                            value={gender} onChange={handleGenderChange} />
                    </div>
                    <div className="modal-field">
                        <label htmlFor="dob">Birthdate</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="dob" value={dob} onChange={handleDobChange} />
                    </div>
                    <div className="modal-field">
                        <label htmlFor="nationality">Nationality</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="nationality" value={nationality} onChange={handleNationalityChange} />
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