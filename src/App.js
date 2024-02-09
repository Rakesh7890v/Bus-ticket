import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import Seats from './Seats';
import { useState} from 'react';
import SeatsMenu from './SeatsMenu';

function App() {
  
  const [tickets, setTickets] = useState([]);
  const [bookSeat, setBookSeat] = useState([]);
  const [showbutton, setShowbutton] = useState(false);
  const [showError, setShowError] = useState(false);
  const [newItem, setNewItem] = useState({
    id: 1,
    from: '',
    to: '',
    date: ''
  });
  const navigate = useNavigate();
  
  const addItem = (from, to, date) => {
    const addNewItem = { from, to, date };
    const updatedTasks = [...tickets, addNewItem];
    setTickets(updatedTasks);
  }
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (newItem.from.trim() === '' || newItem.to.trim() === '' || newItem.date.trim() === '') {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    } else {
      addItem(newItem.from, newItem.to, newItem.date);
      setNewItem({
      from: '',
      to: '',
      date: ''
      });
      navigate('/seats');
    }
  };

  const handleBook = (id) => {
    const book = buses.filter(bus => bus.id === id);
    setBookSeat(book);
    navigate('/booking');    
    setShowbutton(false);
    const newBusname = [...bookSeat,...book];
    const newBustime = [...tickets];
    localStorage.setItem('busname', JSON.stringify(newBusname));
    localStorage.setItem('bustime', JSON.stringify(newBustime));
  }

  const [buses] = useState([
    {
      id: 1,
      starttime: '23:00',
      endtime: '3:00',
      totalhour: '5h 05m',
      totalseats: '12 Seats (1 single)',
      busname: 'S R T',
      bustype: 'NON A/C Sleeper (2+1)',
      price: 590,
      rating: 4.2
    }, {
      id: 2,
      starttime: '15:00',
      endtime: '18:00',
      totalhour: '3h 00m',
      totalseats: '19 Seats (2 single)',
      busname: 'Valimalai',
      bustype: 'A/C Sleeper (2+1)',
      price: 1200,
      rating: 4.7
    }, {
      id: 3,
      starttime: '05:00',
      endtime: '12:00',
      totalhour: '7h 00m',
      totalseats: '5 Seats',
      busname: 'JK Travels',
      bustype: 'NON A/C Sleeper (2+1)',
      price: 800,
      rating: 4.4
    }, {
      id: 4,
      starttime: '23:30',
      endtime: '3:25',
      totalhour: '3h 55m',
      totalseats: '18 Seats (2 single)',
      busname: 'BSP Bus',
      bustype: 'A/C Sleeper (1+1)',
      price: 700,
      rating: 4.2
    }, {
      id: 5,
      starttime: '18:15',
      endtime: '02:15',
      totalhour: '8h 00m',
      totalseats: '3 Seats',
      busname: 'YAS Tours',
      bustype: 'Multi Axle A/C Sleeper (2+1)',
      price: 1100,
      rating: '4.0'
    }, {
      id: 6,
      starttime: '23:35',
      endtime: '03:10',
      totalhour: '3h 35m',
      totalseats: '11 Seats (2 single)',
      busname: 'IntrCity SmartBus',
      bustype: 'A/C Sleeper (2+1)',
      price: 753,
      rating: 4.4
    }, {
      id: 7,
      starttime: '23:55',
      endtime: '3:45',
      totalhour: '3h 50m',
      totalseats: '8 Seats (3 single)',
      busname: 'Puthiyavan',
      bustype: 'A/C Sleeper (2+1)',
      price: 1099,
      rating: 4.6
    }, {
      id: 8,
      starttime: '21:00',
      endtime: '03:55',
      totalhour: '3h 56m',
      totalseats: '15 Seats',
      busname: 'ANA Travels',
      bustype: 'A/C Sleeper (2+1)',
      price: 449,
      rating: 4.1
    }, {
      id: 9,
      starttime: '22:30',
      endtime: '02:00',
      totalhour: '3h 30m',
      totalseats: '2 Seats',
      busname: 'Kallada Travels',
      bustype: 'A/C Sleeper (2+1)',
      price: 1000,
      rating: '4.0'
    }, {
      id: 10,
      starttime: '23:00',
      endtime: '3:00',
      totalhour: '5h 05m',
      totalseats: '12 Seats',
      busname: 'Arasan Arassi',
      bustype: 'A/C Sleeper (2+1)',
      price: 1099,
      rating: 4.2
    }, {
      id: 11,
      starttime: '16:00',
      endtime: '19:30',
      totalhour: '3h 30m',
      totalseats: '10 Seats (2 single)',
      busname: 'KS Travels',
      bustype: 'NON A/C Sleeper (2+1)',
      price: 480,
      rating: 4.4
    }, {
      id: 12,
      starttime: '23:55',
      endtime: '3:00',
      totalhour: '3h 05m',
      totalseats: '17 Seats (3 single)',
      busname: 'Jaipur Travels',
      bustype: 'A/C Sleeper (2+1)',
      price: 1200,
      rating: 4.5
    }
  ]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home newItem={newItem} setNewItem={setNewItem} handleSearch={handleSearch} showError={showError}/>} />
        <Route path='/seats' element={<Seats handleBook={handleBook} buses={buses} setShowbutton={setShowbutton} showbutton={showbutton}/>} />
        <Route path='/booking' element={<SeatsMenu />} />
      </Routes>
    </div>
  );
}

export default App;
