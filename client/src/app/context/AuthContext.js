"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const t = localStorage.getItem("mini-vlog-token-v1");
        const u = localStorage.getItem("mini-vlog-user");

        if (t) setToken(t);
        if (u) setUser(JSON.parse(u));
    }, []);

    const login = (token, user) => {
        localStorage.setItem("mini-vlog-token-v1", token);
        localStorage.setItem("mini-vlog-user", JSON.stringify(user));

        setToken(token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("mini-vlog-token-v1");
        localStorage.removeItem("mini-vlog-user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);