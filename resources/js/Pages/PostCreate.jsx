import PostForm from "@/Components/PostForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Postcreate = () => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Post
                </h2>
            }
        >
            <Head title="Profile" />
            <PostForm />
        </AuthenticatedLayout>
    );
};

export default Postcreate;
