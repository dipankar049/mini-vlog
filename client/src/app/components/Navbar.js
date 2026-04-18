"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const initial = user?.name?.charAt(0).toUpperCase() || 'U';

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        Mini Vlog
      </Link>

      <div className={styles.right}>
        {!token ? (
          <>
            <Link href="/login" className={styles.btn}>
              Login
            </Link>
            <Link href="/register" className={styles.btn}>
              Register
            </Link>
          </>
        ) : (
          <>
            <div className={styles.avatar}>{initial}</div>
            <button className={styles.logout} onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}