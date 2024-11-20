import { 
  Routes, 
  Route, 
  Link, 
  useNavigate 
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Post from './pages/Post';
import Notfound from './pages/Notfound';


// 1. "/": 모든 토론을 조회하는 Home페이지
// 2. "/newpost": 새로운 토론을 작성하는 New페이지
// 3. "/detailpost": 토론을 상세히 조회하는 Post페이지
function App() { 
  return (
    <>
      <div>
        <Link to={"/"}>Home</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/newpost" element={<New />}/>
        <Route path="/detailpost/:id" element={<Post />}/>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
    
  )
}

export default App
