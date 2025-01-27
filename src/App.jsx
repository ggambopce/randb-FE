import { Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Post from './pages/Post';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';
import LoginPage from './pages/LoginPage';
import Join from './pages/Join';
import useLoginInfo from './hooks/useLoginInfo';
import ProfileNew from './pages/ProfileNew';
import Profile from './pages/Profile';

function App() { 
  useLoginInfo(); // 로그인 상태 복원

  return (  
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/newpost" element={<New />}/>
      <Route path="/detailpost/:id" element={<Post />}/>
      <Route path="/updatepost/:id" element={<Edit />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/join" element={<Join />}/>
      <Route path="/newprofile" element={<ProfileNew />}/>
      <Route path="/detailprofile/:id" element={<Profile />}/>
      <Route path="*" element={<Notfound />} />
    </Routes>
  )
}

export default App
