import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import ErrorService from "./ErrorService";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/posts");
                setPosts(response.data);
            } catch (err) {
                setError("Error fetching posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <ErrorService setErrorMessage={setError} error={error} />;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Blog Posts</h1>
            {posts.map((post) => (
                <Post key={post.id} post={post} setPosts={setPosts} />
            ))}
        </div>
    );
};

export default PostList;
