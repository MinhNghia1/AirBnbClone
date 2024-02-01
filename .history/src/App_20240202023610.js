import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainLayOut from "./Components/MainLayOut";
import Home from "./Module/Home/Pages/Home";
import SignIn from "./Module/Auth/SignIn";
import SignUp from "./Module/Auth/SignUp/SignUp";
import Account from "./Module/Personal-info/Page/Account";
import RoomByLocation from "./Module/RoomByLocation/pages";
import PrivateRoute from "./Routers/PrivateRouteInfoUser/PrivateRoute";
import PrivateRouteTicket from "./Routers/PrivateRouteTicket/PrivateRouteTicket";
import BookingRoom from "./Module/BookingRoom/Pages/BookingRoom";
import RoomDetail from "./Module/RoomDetail/RoomDetail";
import PrivateRouteAdmin from "./Routers/PrivateRouteAdmin/PrivateRouteAdmin";
import MainLayOutAdmin from "./Components/MainLayOutAdmin/MainLayOutAdmin";
import AdminUser from "./Module/Admin/AdminUser/pages/AdminUser";
import AdminInfo from "./Module/Admin/AdminInfo/pages/AdminInfo";
import AdminBooking from "./Module/Admin/AdminBooking";
import AdminLocation from "./Module/Admin/AdminLocation";
import NotFoundImage from "./Components/NotFound";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayOut />}>
            <Route index element={<Home />}></Route>
            <Route path="/RoomByCity/:IdRoom" element={<RoomByLocation />}></Route>
            <Route path="/BookingRoom/:IdUser" element={<PrivateRouteTicket />}>
              <Route index element={<BookingRoom />}></Route>
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="roomDetail/:roomId" element={<RoomDetail />} />
            </Route>
          </Route>
          <Route path="/personal-info/:IdUser" element={<PrivateRoute />}>
            <Route index element={<Account />}></Route>
          </Route>
          <Route path="/SiginUser" element={<SignIn />}></Route>
          <Route path="/SigupUser" element={<SignUp />}></Route>
          <Route element={<MainLayOutAdmin />}>
            <Route path="/admin/ManageUser" element={<PrivateRouteAdmin />}>
              <Route index element={<AdminUser />}></Route>
            </Route>
            <Route path="/admin/ManageLocation" element={<PrivateRouteAdmin />}>
              <Route path="/admin/ManageLocation" element={<AdminLocation />}></Route>
            </Route>
            <Route path="/admin/ManageInfoRoom" element={<PrivateRouteAdmin />}>
              <Route index element={<AdminInfo />}></Route>
            </Route>
            <Route path="/admin/ManageBooking" element={<PrivateRouteAdmin />}>
              <Route index element={<AdminBooking />}></Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFoundImage />}></Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
