import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainLayOut from "./Components/MainLayOut";
import Home from "./Module/Home/Pages/Home";
import SignIn from "./Module/Auth/SignIn";
import SignUp from "./Module/Auth/SignUp/SignUp";
import PersonalInfo from "./Module/Personal-info/Components/PersonInfo/PersonalInfo";
import Account from "./Module/Personal-info/Page/Account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayOut />}>
          <Route index element={<Home />}></Route>
        </Route>
        <Route path="/personal-info/:IdUser" element={<Account />}></Route>
        <Route path="/SiginUser" element={<SignIn />}></Route>
        <Route path="/SigupUser" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
