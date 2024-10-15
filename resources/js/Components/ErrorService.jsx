import React, { useState } from "react";

export default function ErrorService({ error, setErrorMessage }) {
    const handleClose = () => {
        setErrorMessage(null);
    };

    if (!error) return null;

    return (
        <div className="relative p-4 bg-red-100 text-red-600 rounded">
            <p className="text-center">{error}</p>
            <button
                onClick={handleClose}
                className="absolute top-0 right-0 m-2 text-red-600 font-bold"
            >
                X
            </button>
        </div>
    );
}
