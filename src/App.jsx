import { Routes, Route} from 'react-router-dom';
import { useReducer, useRef, createContext } from 'react';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Post from './pages/Post';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';

import Button from './components/Button';
import Header from './components/Header';

// 토론 임시 데이터
const mockData = [
  {
    id: 1,
    postTitle: "토론 주제 1",
    postContent: "토론 내용 1",
  },
  {
    id: 2,
    postTitle: "토론 주제 2",
    postContent: "토론 내용 2",
  },
  {
    id: 3,
    postTitle: "토론 주제 3",
    postContent: "토론 내용 3",
  },

]

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item)=> String(item.id) === String(action.data.id) ? action.data : item);  
    case "DELETE":
      return state.filter((item)=> String(item.id) !== String(action.id));
    default:
      return state;   
  }
}

const PostStateContext = createContext();
const PostDispatchContext = createContext();
// 1. "/": 모든 토론을 조회하는 Home페이지
// 2. "/newpost": 새로운 토론을 작성하는 New페이지
// 3. "/detailpost": 토론을 상세히 조회하는 Post페이지
// 4. "/updatepost": 기존 토론을 수정하는 Edit페이지
function App() { 
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4);
  // 새로운 토론 추가
  const onCreate = (postTitle, postContent) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        postTitle,
        postContent,
      }
    })
  }
  
  // 기존 토론 수정
  const onUpdate = (id, postTitle, postContent) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        postTitle,
        postContent,
      }
    })
  }
 
  // 기존 토론 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    })
  }

  return (
    <>
      <PostStateContext.Provider value={data}>
        <PostDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/newpost" element={<New />}/>
            <Route path="/detailpost/:id" element={<Post />}/>
            <Route path="/updatepost/:id" element={<Edit />}/>
            <Route path="*" element={<Notfound />} />
          </Routes>
        </PostDispatchContext.Provider>
      </PostStateContext.Provider>
  
    </>
    
  )
}

export default App
