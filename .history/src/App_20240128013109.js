import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainLayOut from "./Components/MainLayOut";
import Home from "./Module/Home/Pages/Home";
import SignIn from "./Module/Auth/SignIn";
import SignUp from "./Module/Auth/SignUp/SignUp";
import Account from "./Module/Personal-info/Page/Account";
import RoomByLocation from "./Module/RoomByLocation/pages";
<<<<<<< HEAD
import PrivateRoute from "./Routers/PrivateRouteInfoUser/PrivateRoute";
import PrivateRouteTicket from "./Routers/PrivateRouteTicket/PrivateRouteTicket";
import BookingRoom from "./Module/BookingRoom/Pages/BookingRoom";
import RoomDetail from "./Module/RoomDetail/RoomDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayOut />}>
          <Route index element={<Home />}></Route>
          <Route path="/RoomByCity/:IdRoom" element={<RoomByLocation />}></Route>
          <Route path="/BookingRoom/:IdUser" element={<PrivateRouteTicket />}>
            <Route index element={<BookingRoom />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            {/* <Route path="profile/:userId" element={<Profile />} /> */}
            <Route path="roomDetail/:roomId" element={<RoomDetail />} />
          </Route>
        </Route>
        <Route path="/personal-info/:IdUser" element={<PrivateRoute />}>
          <Route index element={<Account />}></Route>
        </Route>

        <Route path="/SiginUser" element={<SignIn />}></Route>
        <Route path="/SigupUser" element={<SignUp />}></Route>
        <Route path="*" element={<h1>not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>
=======
import PrivateRoute from "./Routers/PrivateRoute";
import RoomDetail from "./Module/RoomDetail/RoomDetail";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayOut />}>
            <Route index element={<Home />}></Route>
            <Route path="/RoomByCity/:IdRoom" element={<RoomByLocation />}></Route>
            <Route element={<PrivateRoute />}>
              {/* <Route path="profile/:userId" element={<Profile />} /> */}
              <Route path="roomDetail/:roomId" element={<RoomDetail />} />
            </Route>
          </Route>
          <Route path="/personal-info/:IdUser" element={<PrivateRoute />}>
            <Route index element={<Account />}></Route>
          </Route>

          <Route path="/SiginUser" element={<SignIn />}></Route>
          <Route path="/SigupUser" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
>>>>>>> f2e89d04641a6cde510bb4956e8f3c49093a8cf9
  );
}

export default App;
