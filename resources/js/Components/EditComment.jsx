import React from "react";

export default function EditComment(handleEditClick, handleDeleteClick) {
    return (
        <div className="flex space-x-2 mt-2">
            <button
                onClick={handleEditClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring"
            >
                Edit
            </button>
            <button
                onClick={handleDeleteClick}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring"
            >
                Delete
            </button>
        </div>
    );
}
