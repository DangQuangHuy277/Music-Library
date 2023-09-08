import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import EditArtistModal from '../modal/edit/EditArtistModal';

export default function ArtistBar(props) {
    const [isEditting, setIsEditting] = useState(false);

    const handleEdit = () => {
        setIsEditting(true);
    }

    const handleCloseModal = () => {
        setIsEditting(false);
    }

    const handleSaveModal = (artist) => {
        props.onUpdate(artist.id, artist.name, artist.gender, artist.birthdate, artist.nationality);
        setIsEditting(false);
    }

    return (
        <tr className="artist-bar text-center">
            <td className="w-1/12">{props.number}</td>
            <td className="w-3/12">
                <Link to={`/artists/${props.id}/songs`}>
                    {props.name}
                </Link>
            </td>
            <td className="w-2/12">{props.gender}</td>
            <td className="w-2/12">{props.birthdate}</td>
            <td className="w-3/12">{props.nationality}</td>
            <td className="w-1/12 cursor-pointer text-blue-500 hover:text-blue-600" onClick={handleEdit}>
                <EditIcon />
            </td>
            <td className="w-1/12 cursor-pointer text-red-500 hover:text-red-600" onClick={props.onDelete}>
                <DeleteIcon />
            </td>
            <EditArtistModal artist={props} open={isEditting} onClose={handleCloseModal} onSave={handleSaveModal} />
        </tr>
    )
}