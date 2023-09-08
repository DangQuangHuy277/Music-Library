import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditSongModal from '../modal/edit/EditSongModal';
import { useState } from 'react';
export default function SongBar(props) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleClose = () => {
        setIsEditing(false);
    }

    const handleSave = (song) => {
        props.onUpdate(song.id, song.title, song.duration);
        setIsEditing(false);
    }

    return (
        <tr className="song-bar text-center">
            <td className="w-1/12">{props.number}</td>
            <td className="w-3/12">{props.title}</td>
            {props.showArtist && <td className="w-2/12">{
                props.artists.map((artist) => artist.name).join(", ")
            }</td>}
            {props.showAlbum && <td className="w-2/12">{props.album}</td>}
            <td className="w-2/12">{props.duration}</td>

            <td className="w-1/12 cursor-pointer text-blue-500 hover:text-blue-600" onClick={handleEdit}>
                <EditIcon />
            </td>

            <td className="w-1/12 cursor-pointer text-red-500 hover:text-red-600" onClick={props.onDelete}>
                <DeleteIcon />
            </td>
            <EditSongModal open={isEditing} onClose={handleClose} onSave={handleSave} song={props} />
        </tr>
    )
}



