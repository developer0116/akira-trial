import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LoginPage, HomePage, NotFoundPage } from "pages";
import { HomeLayout } from "layouts";
import { PrivateRoutes } from "components";
import { AuthProvider } from "contexts";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="home" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
