import React, { useState } from "react";
import axios from "axios";
import ErrorService from "./ErrorService";

const EditPostForm = ({ post, setPosts, setIsEditing }) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [error, setError] = useState(null);

    const handleSave = async () => {
        if (title.trim() === "" || content.trim() === "") return;
        try {
            await axios.put(`http://localhost:8000/posts/${post.id}`, {
                title,
                content,
            });
            setPosts((prevPosts) =>
                prevPosts.map((p) =>
                    p.id === post.id ? { ...p, title, content } : p
                )
            );
            setIsEditing(false);
        } catch (err) {
            setError("Error saving post");
        }
    };

    const handleClose = () => {
        setIsEditing(false);
    };

    return (
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
            {error && <ErrorService setErrorMessage={setError} error={error} />}
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="title"
                >
                    Post Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="content"
                >
                    Content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="6"
                />
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-5 py-3 rounded-md hover:bg-green-600 transition-colors"
                >
                    Save
                </button>
                <button
                    onClick={handleClose}
                    className="bg-gray-500 text-white px-5 py-3 rounded-md hover:bg-gray-600 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditPostForm;
