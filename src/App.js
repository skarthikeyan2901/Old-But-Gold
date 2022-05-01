import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className='font-mustica'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
