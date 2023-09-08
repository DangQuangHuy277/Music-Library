import { useState } from "react";
import { Modal } from "@mui/material"
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function AddArtisitModal({ open, onClose, onSave }) {
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [nationality, setNationality] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    }

    const handleDateChange = (event) => {
        setBirthdate(event.target.value);
    }

    const handleNationalityChange = (event) => {
        setNationality(event.target.value);
    }

    const handleSave = async () => {
        if (!name || !gender || !birthdate) {
            setError("Please fill in name, gender and birthdate");
            return;
        }
        if (/^\d{4}-\d{2}-\d{2}$/.test(birthdate) === false) {
            setError("Date must be in format yyyy-mm-dd");
            return;
        }

        const res = await fetch(`${apiBaseUrl}/artists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ name, gender, birthdate, nationality }),
        });
        
        if (!res.ok) {
            const message = await res.json();
            setError(message.message)
            return;
        }
        onSave();
        setName("");
        setGender("");
        setBirthdate("");
        setNationality("");
        setError(null);
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-artisit-modal"
            aria-describedby="add-artisit-modal"
        >

            <div className="modal bg-white absolute top-1/2 left-1/2 p-4 border rounded border-sky-500 shadow-xl transform -translate-x-1/2 -translate-y-1/2">
                <h2 className='text-center font-semibold text-cyan-600 text-xl'>Add Artisit</h2>
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
                        <label htmlFor="birthdate">Birthdate</label>
                        <input className='border border-gray-300 rounded p-1 w-full'
                            type="text" id="birthdate" value={birthdate} onChange={handleDateChange} />
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