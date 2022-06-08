import { Suspense, lazy } from 'react';
import MoonLoader from "react-spinners/MoonLoader";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
const Login = lazy(() => import("./Pages/Login/Login")); 
const SignUp = lazy(() => import("./Pages/SignUp/SignUp"));
const Home = lazy(() => import("./Pages/Home/Home"));
const ListItem = lazy(() => import("./Pages/ListItem/ListItem"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Feed = lazy(() => import("./Pages/Feed/Feed"));
const EmailVerify = lazy(() => import("./Pages/EmailVerify/EmailVerify"));
const Notifications = lazy(() => import("./Pages/Notifications/Notifications"));

function AllRoutes() {

  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#F3F4F6",
              color: "#5B21B6",
            }}
          >
            <MoonLoader color="#000000" size={80} />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/listItem" element={<ListItem />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/user/:id/verify/:token" element={<EmailVerify />} />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <div className='font-mustica'>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
