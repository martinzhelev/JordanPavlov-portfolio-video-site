import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [folders, setFolders] = useState([]);
  const [videos, setVideos] = useState([]);
  const [aboutData, setAboutData] = useState({ description: "", imageUrl: "" });
  const [team, setTeam] = useState([]);
  const [newFolder, setNewFolder] = useState({ name: "", thumbnailUrl: "" });
  const [newVideo, setNewVideo] = useState({
    title: "",
    url: "",
    folder_id: "",
    thumbnail: "",
  });
  const [newTeamMember, setNewTeamMember] = useState({ name: "", position: "", imageUrl: "" });
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState("");
  
  const deleteFolder = () => {
    fetch(`/api/folders/${selectedFolderId}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Folder deleted successfully!");
        setFolders(folders.filter(folder => folder.id !== selectedFolderId)); // Update UI
      })
      .catch((err) => alert("Error deleting folder: " + err.message));
  };
  
  const deleteVideo = () => {
    fetch(`/api/videos/${selectedVideoId}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Video deleted successfully!");
        setVideos(videos.filter(video => video.id !== selectedVideoId)); // Update UI
      })
      .catch((err) => alert("Error deleting video: " + err.message));
  };
  
  const deleteTeamMember = (memberId) => {
    fetch(`/api/team/${memberId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        alert("Team member deleted!");
        setTeam((prevTeam) => prevTeam.filter((member) => member.id !== memberId));
      })
      .catch((error) => console.error("Error deleting team member:", error));
  };
  
  useEffect(() => {
    // Fetch initial data
    fetch("/api/folders").then((res) => res.json()).then((data) => setFolders(data));
    fetch("/api/videos").then((res) => res.json()).then((data) => setVideos(data));
    fetch("/api/about").then((res) => res.json()).then((data) => setAboutData(data));
    fetch("/api/team").then((res) => res.json()).then((data) => setTeam(data));
  }, []);

  const updateHomepageVideo = (videoId) => {
    fetch("/api/videos/homepage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId }),
    }).then(() => alert("Homepage video updated!"));
  };

  const createFolder = (folder) => {
    fetch("/api/folders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(folder),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Folder created successfully!");
        setFolders([...folders, { id: data.folder_id, ...folder }]);
        setNewFolder({ name: "", thumbnail: "" }); // Reset the form
      })
      .catch((err) => console.error("Error creating folder:", err));
  };
  

  const addVideo = () => {
    fetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("Error: " + data.error);
        } else {
          alert("Video added successfully!");
          setNewVideo({ title: "", url: "", folder_id: "", thumbnail: "" }); // Reset form
        }
      });
  };

  const updateAbout = () => {
    fetch("/api/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aboutData),
    }).then(() => alert("About Us updated!"));
  };

  const addTeamMember = () => {
    fetch("/api/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTeamMember),
    }).then(() => alert("Team member added!"));
  };
  

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

      {/* Update Homepage Video */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Homepage Video</h2>
        <select
          className="w-full p-3 rounded-lg bg-gray-700 text-white"
          onChange={(e) => updateHomepageVideo(e.target.value)}
        >
          <option value="">Select Video</option>
          {videos.map((video) => (
            <option key={video.id} value={video.id}>
              {video.title}
            </option>
          ))}
        </select>
      </div>

      {/* Create Folder */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
  <h2 className="text-2xl font-semibold mb-4">Create Folder</h2>
  <div className="flex flex-col space-y-4">
    <input
      type="text"
      placeholder="Folder Name"
      className="w-full p-3 rounded-lg bg-gray-700 text-white"
      value={newFolder.name}
      onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
    />
    <input
      type="text"
      placeholder="Thumbnail URL"
      className="w-full p-3 rounded-lg bg-gray-700 text-white"
      value={newFolder.thumbnail}
      onChange={(e) => setNewFolder({ ...newFolder, thumbnail: e.target.value })}
    />
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      onClick={() => createFolder(newFolder)}
    >
      Create
    </button>
  </div>
</div>


      {/* Add Video */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
  <h2 className="text-2xl font-semibold mb-4">Add Video</h2>
  <div className="flex flex-col space-y-4">
    {/* Title Input */}
    <input
      type="text"
      placeholder="Video Title"
      className="w-full p-3 rounded-lg bg-gray-700 text-white"
      value={newVideo.title}
      onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
    />

    {/* URL Input */}
    <input
      type="text"
      placeholder="Video URL"
      className="w-full p-3 rounded-lg bg-gray-700 text-white"
      value={newVideo.url}
      onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
    />

    {/* Folder Selection */}
    <select
      className="w-full p-3 rounded-lg bg-gray-700 text-white"
      value={newVideo.folder_id}
      onChange={(e) => setNewVideo({ ...newVideo, folder_id: e.target.value })}
    >
      <option value="">Select Folder</option>
      {folders.map((folder) => (
        <option key={folder.id} value={folder.id}>
          {folder.name}
        </option>
      ))}
    </select>

    {/* Thumbnail Input */}
    <input
      type="text"
      placeholder="Thumbnail URL"
      className="w-full p-3 rounded-lg bg-gray-700 text-white"
      value={newVideo.thumbnail}
      onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
    />

    {/* Submit Button */}
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      onClick={addVideo}
    >
      Add Video
    </button>
  </div>
</div>


      {/* Update About Us */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <textarea
          className="w-full p-3 rounded-lg bg-gray-700 text-white"
          rows="5"
          value={aboutData.description}
          onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
        ></textarea>
        <button
          className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
          onClick={updateAbout}
        >
          Update
        </button>
      </div>

      {/* Manage Team */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
        <div className="mb-4">
          {team.map((member) => (
            <div key={member.id} className="text-gray-300">
              {member.name} - {member.position}
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="p-3 rounded-lg bg-gray-700 text-white"
            onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Position"
            className="p-3 rounded-lg bg-gray-700 text-white"
            onChange={(e) => setNewTeamMember({ ...newTeamMember, position: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="p-3 rounded-lg bg-gray-700 text-white"
            onChange={(e) => setNewTeamMember({ ...newTeamMember, imageUrl: e.target.value })}
          />
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            onClick={addTeamMember}
          >
            Add Member
          </button>
        </div>
      </div>
       <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Manage Folders</h2>
        <div className="flex items-center space-x-4">
          <select
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            onChange={(e) => setSelectedFolderId(e.target.value)}
          >
            <option value="">Select Folder</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            onClick={deleteFolder}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Manage Videos</h2>
        <div className="flex items-center space-x-4">
          <select
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            onChange={(e) => setSelectedVideoId(e.target.value)}
          >
            <option value="">Select Video</option>
            {videos.map((video) => (
              <option key={video.id} value={video.id}>
                {video.title}
              </option>
            ))}
          </select>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            onClick={deleteVideo}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Delete Team Member</h2>
        <div className="flex flex-col space-y-4">
          {team.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <span>{member.name} - {member.position}</span>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                onClick={() => deleteTeamMember(member.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
