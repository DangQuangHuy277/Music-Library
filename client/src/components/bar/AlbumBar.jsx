import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import EditAlbumModal from '../modal/edit/EditAlbumModal';

export default function AlbumBar(props) {
    const [isEditting, setIsEditting] = useState(false);

    const handleEdit = () => {
        setIsEditting(true);
    }

    const handleClose = () => {
        setIsEditting(false);
    }

    const handleSave = (album) => {
        props.onUpdate(album.id, album.title, album.releaseDate);
        setIsEditting(false);
    }


    return (
        <tr className="album-bar text-center">
            <td className="w-1/12">{props.number}</td>
            <td className="w-3/12">
                <Link to={`/albums/${props.id}/songs`}>
                    {props.title}
                </Link>
            </td>
            <td className="w-3/12">{props.artist}</td>
            <td className="w-3/12">{props.releaseDate}</td>
            <td className="w-1/12 cursor-pointer text-blue-500 hover:text-blue-600 px-1" onClick={handleEdit}>
                <EditIcon />
            </td>
            <td className="w-1/12 cursor-pointer text-red-500 hover:text-red-600 px-3" onClick={props.onDelete}>
                <DeleteIcon />
            </td>
            <EditAlbumModal album={props} open={isEditting} onClose={handleClose} onSave={handleSave}/>
        </tr >
    );
}