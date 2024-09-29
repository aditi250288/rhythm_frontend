import { useState } from "react";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/textInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/home");
    } else {
      alert("Failure");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }

    try {
      const response = await makeUnauthenticatedPOSTRequest("/auth/forgot-password", { email });
      if (response && !response.err) {
        alert("Password reset instructions have been sent to your email.");
        setShowForgotPasswordModal(false);
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error sending forgot password email:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
      </div>
      
      <div className="w-full max-w-md p-8 rounded-lg bg-black bg-opacity-70 shadow-lg z-10">
        <div className="flex justify-center mb-8">
          <Icon icon="emojione-v1:musical-notes" width="80" className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login to Rhythm</h2>
        <TextInput
          label="Email address or username"
          placeholder="Email address or username"
          className="mb-4 text-white"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          className="mb-4 password-input"
          value={password}
          setValue={setPassword}
        />
        <button
          onClick={() => setShowForgotPasswordModal(true)}
          className="text-sm text-blue-500 hover:text-blue-400 mb-4 block"
        >
          Forgot Password?
        </button>
        <button
          className="w-full bg-blue-400 text-white py-2 rounded-full font-semibold hover:bg-blue-500 transition duration-300"
          onClick={login}
        >
          Login
        </button>
        <div className="mt-6 text-center">
          <p className="text-gray-300">Don't have an account?</p>
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold">
            Register for Rhythm
          </Link>
        </div>
      </div>
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-app-black p-8 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-white">Forgot Password</h2>
            <p className="mb-4 text-gray-400">Enter your email address to receive password reset instructions.</p>
            <TextInput
              label="Email address"
              placeholder="Enter your email"
              value={email}
              setValue={setEmail}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowForgotPasswordModal(false)}
                className="mr-2 px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPassword}
                className="px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-300"
              >
                Send Reset Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginComponent;