import React, { useEffect, useState } from "react";
import axios from "axios";

const Portfolio = () => {
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/folders")
            .then((res) => setFolders(res.data))
            .catch((err) => console.error("Error fetching folders:", err));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
            <h1 className="text-5xl font-bold text-white mb-6 text-center">Our Portfolio</h1>
            <p className="text-lg text-gray-300 text-center max-w-3xl mb-8">
                Explore our projects by folders.
            </p>

            {!selectedFolder && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {folders.map((folder) => (
                        <div
                            key={folder.id}
                            className="bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer"
                            onClick={() => {
                                setSelectedFolder(folder);
                                setSelectedVideo(folder.videos[0]);
                            }}
                        >
                            <img
                                src={folder.thumbnail}
                                alt={`Folder thumbnail for ${folder.name}`}
                                className="rounded-lg shadow-md mb-4"
                            />
                            <h2 className="text-xl font-bold text-blue-400">{folder.name}</h2>
                        </div>
                    ))}
                </div>
            )}

            {selectedFolder && (
                <div className="w-full max-w-6xl">
                    <button
                        className="text-blue-400 mb-4"
                        onClick={() => {
                            setSelectedFolder(null);
                            setSelectedVideo(null);
                        }}
                    >
                        &larr; Back to Folders
                    </button>

                    <div className="mb-6">
                        {selectedVideo && (
                            <video
                                controls
                                className="w-full rounded-lg shadow-md aspect-video object-cover"
                                src={selectedVideo.url}
                            />
                        )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {selectedFolder.videos.map((video) => (
                            <div
                                key={video.id}
                                className="cursor-pointer"
                                onClick={() => setSelectedVideo(video)}
                            >
                                <img
                                    src={video.thumbnail}
                                    alt={`Thumbnail for ${video.title}`}
                                    className={`rounded-lg shadow-md ${
                                        video.id === selectedVideo?.id ? "ring-4 ring-blue-400" : ""
                                    }`}
                                />
                                <h3 className="text-sm text-gray-300 mt-2 text-center">{video.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolio;
