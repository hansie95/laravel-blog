import React, { useEffect, useState } from "react";
import axios from "axios";
import ErrorService from "./ErrorService";

const BlogPosts = () => {
    const [posts, setPosts] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");
    const [editingContent, setEditingContent] = useState("");
    const [newComments, setNewComments] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorAllPost, setErrorAllPost] = useState(null);
    const [errorSavePost, setErrorSavePost] = useState(null);
    const [errorDeletePost, setErrorDeletePost] = useState(null);
    const [errorAddComment, setErrorAddComment] = useState(null);
    const [errorDeleteComment, setErrorDeleteComment] = useState(null);

    useEffect(() => {
        // Fetch blog posts from the server
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/posts");
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                setErrorAllPost(`Error fetching posts`);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleEdit = (post) => {
        setEditingPostId(post.id);
        setEditingTitle(post.title);
        setEditingContent(post.content);
    };

    const handleSave = async (postId) => {
        try {
            await axios.put(`http://localhost:8000/posts/${postId}`, {
                title: editingTitle,
                content: editingContent,
            });
            const updatedPosts = posts.map((post) =>
                post.id === postId
                    ? { ...post, title: editingTitle, content: editingContent }
                    : post
            );
            setPosts(updatedPosts);
            setEditingPostId(null);
        } catch (err) {
            setErrorSavePost(`Error saving post`);
            setEditingPostId(null);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:8000/posts/${postId}`);
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (err) {
            setErrorDeletePost(`Error deleting post`);
        }
    };

    const handleAddComment = async (postId) => {
        if (newComments[postId]?.trim() === "") return;
        try {
            const response = await axios.post(
                `http://localhost:8000/posts/${postId}/comments`,
                {
                    comment: newComments[postId],
                }
            );
            const updatedPosts = posts.map((post) =>
                post.id === postId
                    ? { ...post, comments: [...post.comments, response.data] }
                    : post
            );
            setPosts(updatedPosts);
            setNewComments({ ...newComments, [postId]: "" });
        } catch (err) {
            setErrorAddComment(`Error adding comment`);
        }
    };

    const handleCommentChange = (postId, value) => {
        setNewComments({ ...newComments, [postId]: value });
    };

    const handleDeleteComment = async (commentId, postId) => {
        try {
            await axios.delete(`http://localhost:8000/comments/${commentId}`);
            const updatedPosts = posts.map((post) =>
                post.id === postId
                    ? {
                          ...post,
                          comments: post.comments.filter(
                              (comment) => comment.id !== commentId
                          ),
                      }
                    : post
            );
            setPosts(updatedPosts);
        } catch (err) {
            setErrorDeleteComment(`Error deleting comment`);
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Blog Posts</h1>
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="bg-white shadow-md rounded-lg p-6 mb-6"
                >
                    {errorSavePost && (
                        <ErrorService
                            setErrorMessage={setErrorSavePost}
                            error={errorSavePost}
                        />
                    )}
                    {editingPostId === post.id ? (
                        <>
                            <input
                                type="text"
                                value={editingTitle}
                                onChange={(e) =>
                                    setEditingTitle(e.target.value)
                                }
                                className="block w-full text-xl font-semibold border-b mb-4 p-2"
                            />
                            <textarea
                                value={editingContent}
                                onChange={(e) =>
                                    setEditingContent(e.target.value)
                                }
                                className="block w-full text-gray-700 border mb-4 p-2"
                                rows="5"
                            />
                            <button
                                onClick={() => handleSave(post.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            {errorDeletePost && (
                                <ErrorService
                                    setErrorMessage={setErrorDeletePost}
                                    error={errorDeletePost}
                                />
                            )}
                            <h2 className="text-2xl font-semibold mb-4">
                                {post.title}
                            </h2>
                            <p className="text-gray-700 mb-4">{post.content}</p>
                            <button
                                onClick={() => handleEdit(post)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </>
                    )}
                    <h3 className="text-lg font-semibold mb-2">Comments:</h3>
                    {errorDeleteComment && (
                        <ErrorService
                            setErrorMessage={setErrorDeleteComment}
                            error={errorDeleteComment}
                        />
                    )}
                    <ul className="list-disc list-inside space-y-2">
                        {post.comments.map((comment) => (
                            <li
                                key={comment.id}
                                className="text-gray-600 flex justify-between"
                            >
                                {comment.comment}
                                <button
                                    onClick={() =>
                                        handleDeleteComment(comment.id, post.id)
                                    }
                                    className="bg-red-500 text-white px-2 py-1 rounded ml-4"
                                >
                                    Delete Comment
                                </button>
                            </li>
                        ))}
                    </ul>
                    {errorAddComment && (
                        <ErrorService
                            setErrorMessage={setErrorAddComment}
                            error={errorAddComment}
                        />
                    )}
                    <div className="mt-4">
                        <input
                            type="text"
                            value={newComments[post.id] || ""}
                            onChange={(e) =>
                                handleCommentChange(post.id, e.target.value)
                            }
                            placeholder="Add a comment"
                            className="w-full border p-2 rounded mb-2"
                        />

                        <button
                            onClick={() => handleAddComment(post.id)}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Add Comment
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogPosts;
