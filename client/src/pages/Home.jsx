import Sidebar from "../components/Sidebar"

function Home() {
    document.title = "Home";
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            Welcome to My Music Library
                        </h1>
                        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                            Browse and discover new music from your favorite artists.
                        </p>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default Home;