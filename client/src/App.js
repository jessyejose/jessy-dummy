import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Admin from './Admin';
import User from './User';
import Userinvoice from './Userinvoice';


function App() {
  return (
    <>
	<BrowserRouter>
	<Routes>
	<Route path='/' element={<Login/>}/>
	<Route path='/register' element={<Register/>}/>
	<Route path='/admin' element={<Admin/>}/>
	<Route path='/user' element={<User/>}/>
	<Route path='/userinvoice' element={<Userinvoice/>}/>
	</Routes>
	</BrowserRouter>
	
	</>
  );
}

export default App;
