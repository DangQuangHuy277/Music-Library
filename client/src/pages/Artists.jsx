import { useEffect, useState } from "react";
import ArtistBar from "../components/bar/ArtistBar";
import Sidebar from "../components/Sidebar";
import AddArtistModal from "../components/modal/add/AddArtistModal";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ArtistPage() {
    const [isAdding, setIsAdding] = useState(false);
    const [artists, setArtists] = useState([]);
    document.title = "Artists";

    useEffect(() => {
        let isMounted = true;
        async function fetchArtists() {
            const res = await fetch(`${apiBaseUrl}/artists`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });
            const data = await res.json();
            console.log(data);
            if (!res.ok) {
                alert(data.message);
                return;
            }
            if (isMounted) setArtists(data);
        }
        fetchArtists();
        return () => { isMounted = false };
    }, [isAdding]);

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleDelete = async (id) => {
        const res = await fetch(`${apiBaseUrl}/artists/${id}`, {
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
        setArtists((prevArtists) => prevArtists.filter((artist) => artist.id !== id));
    };

    const handleUpdate = async (id, name, gender, birthdate, nationality) => {
        const res = await fetch(`${apiBaseUrl}/artists/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ id, name, gender, birthdate, nationality }),
        });
        if (!res.ok) {
            const message = await res.json();
            alert(message.message);
            return;
        }
        setArtists((prevArtists) => prevArtists.map((artist) => {
            if (artist.id === id) {
                return { ...artist, id, name, gender, birthdate, nationality };
            }
            return artist;
        }));

    }

    const handleCloseModal = () => {
        setIsAdding(false);
    };

    const handleSaveModal = async () => {
        setIsAdding(false);
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full p-4">
                <h1 className="text-3xl font-bold mb-4 text-center">Artists</h1>
                <button className="float-right me-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={handleAdd}>
                    Add New Artist
                </button>
                <AddArtistModal open={isAdding} onClose={handleCloseModal} onSave={handleSaveModal} />
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="w-1/12">#</th>
                            <th className="w-3/12">Name</th>
                            <th className="w-2/12">Gender</th>
                            <th className="w-2/12">Birthdate</th>
                            <th className="w-3/12">Nationality</th>
                            <th className="w-1/12"></th>
                            <th className="w-1/12"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {artists.map((artist, index) => (
                            <ArtistBar
                                key={artist.id}
                                id={artist.id}
                                number={index + 1}
                                name={artist.name}
                                gender={artist.gender}
                                birthdate={artist.birthdate}
                                nationality={artist.nationality}
                                onUpdate={handleUpdate}
                                onDelete={() => handleDelete(artist.id)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}