import React from "react";

export default function AddComment({ onClick, onChange, value }) {
    return (
        <div className="mt-4">
            <textarea
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 mb-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                rows="3"
                placeholder="Add a comment..."
            />
            <button
                onClick={onClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring"
            >
                Add Comment
            </button>
        </div>
    );
}
