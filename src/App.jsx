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
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';

import Button from './components/Button';
import Header from './components/Header';


// 1. "/": 모든 토론을 조회하는 Home페이지
// 2. "/newpost": 새로운 토론을 작성하는 New페이지
// 3. "/detailpost": 토론을 상세히 조회하는 Post페이지
// 4. "/updatepost": 기존 토론을 수정하는 Edit페이지
function App() { 
  return (
    <>
      <Header 
        title={"Header"}
        leftChild={<Button text={"Left"} />}
        rightChild={<Button text={"Right"} />}
      />
       
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/newpost" element={<New />}/>
        <Route path="/detailpost/:id" element={<Post />}/>
        <Route path="/updatepost/:id" element={<Edit />}/>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
    
  )
}

export default App
