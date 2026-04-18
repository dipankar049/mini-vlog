"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";
import styles from "./posts.module.css";
import toast from "react-hot-toast";

export default function Posts() {
    const { token } = useAuth();

    const [posts, setPosts] = useState([]);
    const [form, setForm] = useState({ title: "", content: "" });
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
            const data = await res.json();
            setPosts(data.data);
        } catch (err) {
            // console.error("Fetch posts error:", err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!form.title?.trim() || !form.content?.trim()) {
            return toast.error("All fields are required");
        }
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) return toast.error(data.msg || "Failed to add post");

            fetchPosts();
            toast.success("Post added successfully");
            setForm({ title: "", content: "" });
        } catch (err) {
            // console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) return toast.error(data.msg || "Failed to delete post");

            setPosts(posts.filter((p) => p._id !== id));
            toast.success("Post deleted");
        } catch (err) {
            // console.error(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className={styles.container}>
            {token && (
                <form className={styles.form} onSubmit={handleCreate}>
                    <input
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                    />
                    <input
                        placeholder="Content"
                        value={form.content}
                        onChange={(e) =>
                            setForm({ ...form, content: e.target.value })
                        }
                    />
                    <button type="submit" disabled={loading}>Add Post</button>
                </form>
            )}

            {posts.map((post) => (
                <PostCard
                    key={post._id}
                    post={post}
                    token={token}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}