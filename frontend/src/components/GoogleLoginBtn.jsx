// components/GoogleLoginButton.jsx
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import api from "../utils/api";

const GoogleLoginBtn = ({ onSuccess }) => {
  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse?.credential;
    if (!token) {
      console.error("No Google token received.");
      return;
    }

    try {
      const res = await api.post(`/user/google-login`, { token });

      const { token: jwt, user } = res.data;

      // Store token however you want (localStorage, cookies, context, etc.)
      localStorage.setItem("token", jwt);

      // Call callback if needed
      onSuccess?.(user);
    } catch (error) {
      console.error("Google login failed:", error?.response?.data || error.message);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => console.log("Google login failed")}
    />
  );
};

export default GoogleLoginBtn;
