import { Link } from 'react-router-dom';
import { Home, MusicNote, Album, People, ExitToApp } from '@mui/icons-material';

const Sidebar = () => {
  const handleLogout = () => {
    const response = confirm("Do you want to logout?");
    if (!response) return;
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  return (
    <div className="h-screen flex flex-col justify-between bg-gray-900 text-white fixed">
      <div>
        <div className="flex flex-col items-center justify-center h-16">
          <img src="/logo-removebg.png" alt="Logo" className="w-24 h-24" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Link to="/" className="flex items-center py-6 px-6 text-gray-500 hover:text-white gap-1">
            <Home /> Home
          </Link>
          <Link to="/songs" className="flex items-center py-6 px-6 text-gray-500 hover:text-white gap-1">
            <MusicNote /> Songs
          </Link>
          <Link to="/albums" className="flex items-center py-6 px-6 text-gray-500 hover:text-white gap-1">
            <Album /> Albums
          </Link>
          <Link to="/artists" className="flex items-center py-6 px-6 text-gray-500 hover:text-white gap-1">
            <People /> Artists
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-4 gap-10">
        <div className="flex items-center gap-2">
          <div className="text-zinc-300">Logged in as <span className='text-white break-words font-bold'>{localStorage.getItem('username')}</span></div>
        </div>
        <button className="flex items-center py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded text-white"
          onClick={handleLogout}>
          <ExitToApp /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;