import Login from "./page/login";
import Signup from "./page/Signup";
import { Home } from "./page/home";
// import Home from "./page/home";
import { Route, Routes, } from 'react-router-dom';
import PrivateRoute from './page/refreshHandler';


function App() {
  return (
    <>
      <div className='App'>
        <Routes>
          {/* <Route path='/' element={<Navigate to='/login' />}></Route> */}
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/' element={<PrivateRoute>
            <Home />
          </PrivateRoute>}>
          </Route>
          <Route path='/home' element={<PrivateRoute>
            <Home />
          </PrivateRoute>}>
          </Route>

        </Routes>

      </div>
    </>
  );
}

export default App;
