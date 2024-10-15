import React, { useState } from "react";
import EditPostForm from "./EditPostForm";
import CommentSection from "./CommentSection";
import axios from "axios";
import ErrorService from "./ErrorService";

const Post = ({ post, setPosts }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/posts/${post.id}`);
            setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
        } catch (err) {
            setError("Error deleting post");
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            {error && <ErrorService setErrorMessage={setError} error={error} />}
            {isEditing ? (
                <EditPostForm
                    post={post}
                    setPosts={setPosts}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <>
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            Title:
                        </h2>
                        <p className="text-lg font-medium text-gray-900">
                            {post.title}
                        </p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Content:
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            {post.content}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-500 text-white px-5 py-3 rounded-md hover:bg-yellow-600 transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-5 py-3 rounded-md hover:bg-red-600 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
            <CommentSection post={post} setPosts={setPosts} />
        </div>
    );
};

export default Post;
