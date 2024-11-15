import { useState } from "react";
import { BottomWarning } from "../UI/BottomWarning";
import { Button } from "../UI/Button";
import { Heading } from "../UI/Heading";
import { InputBox } from "../UI/InputBox";
import { InputBoxPassword } from "../UI/InputBox";
import { SubHeading } from "../UI/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password,
            });
            localStorage.setItem("firstname",username)
            localStorage.setItem("token",response.data.token)

            navigate("/dashboard");
        } catch (error) {
            // Set an error message if the user is not found or credentials are incorrect
            if (error.response && error.response.status === 404) {
                setErrorMessage("User not found. Please sign up.");
            } else if (error.response && error.response.status === 401) {
                setErrorMessage("Incorrect password. Please try again.");
            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <>

        <div className="flex items-center justify-center text-3xl font-bold gap-x-7 text-slate-600">
          BitPay
        </div>
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="harsh@gmail.com" label={"Email"} />
                    <InputBoxPassword  onChange={(e) => setPassword(e.target.value)} placeholder="123456" label={"Password"}  />
                    <div className="pt-4">
                        <Button onClick={handleSignin} label={"Sign in"} />
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 mt-2">{errorMessage}</div>
                    )}
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
        </>
    );
};
