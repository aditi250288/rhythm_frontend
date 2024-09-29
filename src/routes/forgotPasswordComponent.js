import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/textInput";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    try {
      const response = await makeUnauthenticatedPOSTRequest("/auth/forgot-password", { email });
      if (response && !response.err) {
        alert("Password reset instructions have been sent to your email.");
        navigate("/login");
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
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Forgot Password</h2>
        <TextInput
          label="Email address"
          placeholder="Enter your email"
          className="mb-4 text-gray"
          value={email}
          setValue={setEmail}
        />
        <button
          className="w-full bg-blue-400 text-white py-2 rounded-full font-semibold hover:bg-blue-500 transition duration-300"
          onClick={handleForgotPassword}
        >
          Send Reset Email
        </button>
        <button
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-blue-400 hover:text-blue-300"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;