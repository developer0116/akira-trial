import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LoginPage, HomePage, NotFoundPage } from "pages";
import { HomeLayout } from "layouts";
import { PrivateRoutes } from "components";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="home" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
