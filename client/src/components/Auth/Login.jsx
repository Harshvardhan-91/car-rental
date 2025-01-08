import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./Firebase.js";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import useAuthStore from "../../store/store.js";
import Loading from "../Loading/Loading";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  // Listen to auth state changes and update Zustand store
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set user in Zustand store
        navigate("/booking");
      } else {
        console.log("User is logged out");
      }
    });
    return () => unsubscribe();
  }, [navigate, setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please check your credentials and try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true); // Start loading
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Set Google user in Zustand store
      alert("Login with Google successful!");
    } catch (error) {
      console.error("Google login error:", error);
      setError("Failed to login with Google. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  if (isLoading) {
    // Show the Loading component if isLoading is true
    return <Loading />;
  }

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          value={formData.email}
          placeholder="Enter email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={styles.input}
        />
        <input
          type="password"
          value={formData.password}
          placeholder="Enter password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Login
        </button>
        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          style={styles.forgotPassword}
        >
          Forgot Password?
        </button>
      </form>
      <p style={styles.or}>OR</p>
      <button onClick={handleGoogleSignIn} style={styles.googleButton}>
        Login with Google
      </button>

      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  googleButton: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#DB4437",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  or: {
    margin: "10px 0",
    fontSize: "14px",
    color: "#666",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  forgotPassword: {
    background: "none",
    border: "none",
    color: "#007BFF",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "5px",
    textDecoration: "underline",
  },
};

export default Login;
