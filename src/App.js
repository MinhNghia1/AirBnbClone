import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
