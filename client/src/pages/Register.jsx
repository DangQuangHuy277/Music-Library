import { useState } from "react"
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Register() {
    const [error, setError] = useState();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const res = await fetch(`${apiBaseUrl}/auth/register`, {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                return;
            }
            alert("User created successfully");
            window.location.href = '/login';
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold mb-8">Register</h1>
                {error && <span className="text-red-500 mb-4">{error}</span>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
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
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                        <input

                            id="confirmPassword"
                            type="password"
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center gap-10">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button>
                        <a href="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back to Login</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

