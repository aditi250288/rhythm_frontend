import { useState } from "react";
import { useCookies } from "react-cookie";
import TextInput from "../components/shared/textInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const register = async () => {
    if (email !== confirmEmail) {
      alert("Email and confirm email fields must match. Please check again");
      return;
    }
    const data = { email, password, username, firstName, lastName };
    const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);
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

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
      </div>
      
      <div className="w-full max-w-lg p-6 rounded-lg bg-black bg-opacity-60 shadow-lg z-10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register for Rhythm</h2>
        
        <TextInput 
          label="Email address" 
          placeholder="Enter your email address"
          className="mb-4"
          value={email}
          setValue={setEmail}
        />
        
        <TextInput 
          label="Confirm email address" 
          placeholder="Confirm your email address"
          className="mb-4"
          value={confirmEmail}
          setValue={setConfirmEmail}
        />
        
        <TextInput 
          label="Username" 
          placeholder="Choose a username"
          className="mb-4 text-white"
          value={username}
          setValue={setUsername}
        />
        
        <PasswordInput
        label="Create Password"
        placeholder="Enter a strong password"
        className="mb-4 text-white"
        value={password}
        setValue={setPassword}
        />
        
        <div className="flex space-x-4 mb-4 text-white">
          <TextInput 
            label="First Name" 
            placeholder="Enter your first name"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput 
            label="Last Name" 
            placeholder="Enter your last name"
            value={lastName}
            setValue={setLastName}
          />
        </div>

        <button
          className="w-full bg-blue-400 text-white py-2 rounded-full font-semibold hover:bg-blue-500 transition duration-300 mt-4"
          onClick={register}
        >
          Register
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-gray-300">Already have an account?</p>
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
            Login to Rhythm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;