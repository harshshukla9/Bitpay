import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import {Signin} from "./components/Signin";
import {Signup} from "./components/Signup";
import Dashboard from "./components/Dashboard";
import {SendMoney} from "./components/SendMoney";
import Home from "./UI/Home";

function App() {
  return (
    <>
   

    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
