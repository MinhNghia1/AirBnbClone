import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainLayOut from "./Components/MainLayOut";
import Home from "./Module/Home/Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayOut />}>
          <Route index element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
