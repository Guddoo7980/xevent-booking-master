import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Search from './Search/Search';
import MyBookings from './MyBookings/MyBookings';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/"         element={<Home/>} />
        <Route path="/search"   element={<Search/>} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </div>
  );
}

export default App;
