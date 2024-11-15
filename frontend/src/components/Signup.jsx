import { useState } from "react";
import axios from "axios";
import { BottomWarning } from "../UI/BottomWarning";
import { Button } from "../UI/Button";
import { Heading } from "../UI/Heading";
import { InputBox } from "../UI/InputBox";
import { SubHeading } from "../UI/SubHeading";
import { useNavigate } from "react-router-dom";
import { InputBoxPassword } from "../UI/InputBox";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  return (
    <>

<div className="flex items-center justify-center text-3xl font-bold gap-x-7 text-slate-600">
  BitPay
</div>
    
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
          <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
          <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="Harsh@gmail.com" label={"Email"} />
          <InputBoxPassword onChange={(e) => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
          
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div> // Display error message if it exists
          )}
          
          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username: username,
                    password: password,
                    firstname: firstName,
                    lastname: lastName
                  });
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("firstname", firstName);
                  navigate("/dashboard");
                } catch (error) {
                  console.error("Signup error:", error);
                  setErrorMessage("Signup failed. Please check your details and try again.");
                }
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
    </>
  );
};
