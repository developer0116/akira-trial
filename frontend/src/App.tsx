import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LoginPage, HomePage, NotFoundPage } from "pages";
import { HomeLayout } from "./layouts";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="home" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
