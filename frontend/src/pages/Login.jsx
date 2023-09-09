import { useState } from "react";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Login() {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(apiBaseUrl + '/auth/authenticate', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                return;
            }
            if (data.accessToken) {
                localStorage.setItem('token', data.accessToken);
                window.location.href = '/';
            }
            localStorage.setItem('username', JSON.stringify(data.username));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        < div className="container mx-auto flex justify-center items-center h-screen" >
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold mb-8">Login</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
                        <a href="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</a>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Login;