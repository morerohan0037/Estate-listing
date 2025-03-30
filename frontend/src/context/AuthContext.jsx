import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to handle login and update user state
    const login = (token) => {
        localStorage.setItem("token", token); // Store token
        const decodedUser = jwtDecode(token); // Decode token
        setUser(decodedUser); // Update user state
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    // Check for token when app loads
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                setUser(jwtDecode(token)); // Decode and set user
            } catch (error) {
                console.error("Invalid token:", error);
                setUser(null);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
