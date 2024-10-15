import axiosClient from "@/helpers/axiosClient";
import React, { useState } from "react";

const PostForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        setSuccessMessage("");
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axiosClient.post(
                `/posts`,

                {
                    title,
                    content,
                },
                {
                    withCredentials: true,
                }
            );
            setSuccessMessage("Blog post created successfully!");
            setTitle("");
            setContent("");
        } catch (err) {
            setError("Failed to create blog post. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Create a New Blog Post
            </h2>
            {successMessage && (
                <div className="bg-green-500 rounded-md">
                    <p className="text-white mb-4 p-3 font-black">
                        {successMessage}
                    </p>
                </div>
            )}
            {error && <p className="text-red-500 mb-4 ">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="content"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        rows="5"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default PostForm;
