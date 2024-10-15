import React, { useState } from "react";
import axios from "axios";
import ErrorService from "./ErrorService";
import axiosClient from "@/helpers/axiosClient";

const CommentSection = ({ post, setPosts }) => {
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState(null);

    const handleAddComment = async () => {
        if (newComment.trim() === "") return;
        try {
            const response = await axiosClient.post(
                `/posts/${post.id}/comments`,
                {
                    comment: newComment,
                }
            );
            setPosts((prevPosts) =>
                prevPosts.map((p) =>
                    p.id === post.id
                        ? { ...p, comments: [...p.comments, response.data] }
                        : p
                )
            );
            setNewComment("");
        } catch (err) {
            setError("Error adding comment");
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axiosClient.delete(`/comments/${commentId}`);
            setPosts((prevPosts) =>
                prevPosts.map((p) =>
                    p.id === post.id
                        ? {
                              ...p,
                              comments: p.comments.filter(
                                  (comment) => comment.id !== commentId
                              ),
                          }
                        : p
                )
            );
        } catch (err) {
            setError("Error deleting comment");
        }
    };

    return (
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Comments
            </h3>
            {error && <ErrorService setErrorMessage={setError} error={error} />}
            <ul className="space-y-4">
                {post.comments.map((comment) => (
                    <li
                        key={comment.id}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
                    >
                        <span className="text-gray-700">{comment.comment}</span>
                        <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleAddComment}
                    className="bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
