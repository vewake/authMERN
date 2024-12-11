import Login from "./page/login";
import Signup from "./page/Signup";
import Home from "./page/home";
import { Route, Routes, Navigate } from 'react-router-dom';
import RefrshHandler from './page/refreshHandler';


function App() {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element = {<Navigate to='/login' />}></Route>
          <Route path='/login' element = {<Login />}></Route>
          <Route path='/signup' element = {<Signup />}></Route>
          <Route path='/home' elecment = {<privateRoute element = {<home />} />}></Route>
        </Routes>

      </div>
    </>
  );
}

export default App;
