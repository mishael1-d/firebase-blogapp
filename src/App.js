import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import './App.css';
import {signOut} from 'firebase/auth'
import {auth} from './firebase-server'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const signUserOut =()=>{
    signOut(auth).then(()=>{
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login"
    })
  }
  return (
    <Router>
     <Navbar isAuth={isAuth} signOut={signUserOut}/>
      <Routes>
        <Route path="/" exact element={<Home isAuth={isAuth}/>} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
      </Routes>
    </Router>
  );
}

export default App;
