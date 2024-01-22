import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainLayOut from "./Components/MainLayOut";
import Home from "./Module/Home/Pages/Home";
import SignIn from "./Module/Auth/SignIn";
import SignUp from "./Module/Auth/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayOut />}>
          <Route index element={<Home />}></Route>
        </Route>
        <Route path="/SiginUser" element={<SignIn />}></Route>
        <Route path="/SigupUser" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
