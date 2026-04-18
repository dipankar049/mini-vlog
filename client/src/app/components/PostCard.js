import { useAuth } from "../context/AuthContext";
import styles from "./post.module.css";

export default function PostCard({ post, onDelete }) {
    const { user } = useAuth();

    const isOwner = user?.id === post?.author?._id;

    const handleDelete = () => {
        const confirmDelete = confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            onDelete(post._id);
        }
    };

    const date = new Date(post.createdAt).toLocaleDateString();

    return (
        <div className={styles.card}>

            <div className={styles.topRow}>
                <div className={styles.author}>
                    By {post.author?.name} • {date}
                </div>

                {isOwner && (
                    <button className={styles.delete} onClick={handleDelete}>
                        Delete
                    </button>
                )}
            </div>

            <div className={styles.title}>{post.title}</div>
            <div className={styles.content}>{post.content}</div>

        </div>
    );
}