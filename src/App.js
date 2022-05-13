import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Feed from './Pages/Feed/Feed';
import EmailVerify from './Pages/EmailVerify/EmailVerify';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ListItem from './Pages/ListItem/ListItem';

function App() {
  return (
    <div className='font-mustica'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/listItem" element={<ListItem />} />
          <Route path="/user/:id/verify/:token" element={<EmailVerify />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
