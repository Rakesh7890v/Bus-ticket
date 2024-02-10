import React,{useEffect, useState} from 'react';
import steering from './images/steering.png';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SeatsMenu = () => {

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [popmessage, setpopmessage] = useState(false);
  const [showmessage, setShowmessage] = useState(false);
  const [orderShow, setOrderShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [bookedSeat, setbookedSeat] = useState([{
    id:'',
    busname:'',
    starttime:'',
    endtime:'',
    totalhour:'',
    bustype:'',
    price:'',
  }]);
  const [bookedTicket, setbookedTicket] = useState([{
    from:'',
    to:'',
    date:''
  }]);

  useEffect(() => {
    const storedBusname = JSON.parse(localStorage.getItem('busname')) || [];
    const storedBustime = JSON.parse(localStorage.getItem('bustime')) || [];
  
    if (storedBusname.length > 0 && storedBustime.length > 0) {
      setbookedSeat([storedBusname[storedBusname.length - 1]]);
      setbookedTicket([storedBustime[storedBustime.length - 1]]);
    }
  
  }, []);
  

  const handleSeatChange = (index) => {
    const isSelected = selectedSeats.includes(index);
    let updatedSeats;

    if (isSelected) {
      updatedSeats = selectedSeats.filter((seatIndex) => seatIndex !== index);
    } else {
      updatedSeats = [...selectedSeats, index];
    }

    setSelectedSeats(updatedSeats);
  };

  const handleBookNow = () => {
    if (selectedSeatsCount === 0) {
      setShowmessage(true);
    } else {
      window.scrollTo(0,0);
      setShowmessage(false);
      setpopmessage(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOrderShow(true);
      },2000);

      const input = document.getElementById('ticket');
      html2canvas(input, {
          scale: window.devicePixelRatio || 1, 
      }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
          pdf.save('Data.pdf');
      });
    }
  }

  const handleConfirm = (e) => {
    e.preventDefault();
    setOrderShow(false);
    setpopmessage(false);
    navigate('/');
  }

  const selectedSeatsCount = selectedSeats.length;
  const bookAmount = bookedSeat.map(book => book.price);
  const totalAmount = selectedSeats.length * bookAmount;

  return (
    <div>
      <div className="bus-seats">
        <div className="bus-vacancy">
          <div className="left-container">
            <div className="front-section">
              <div className="left-seats">
                {Array.from({ length: 24 }).map((_, index) => (
                  <input
                    key={index+1}
                    type="checkbox"
                    checked={selectedSeats.includes(index)}
                    onChange={() => handleSeatChange(index)}
                  />
                ))}
              </div>
              <div className="right-seats">
                {Array.from({ length: 16 }).map((_, index) => (
                  <input
                    key={index + 24}
                    type="checkbox"
                    checked={selectedSeats.includes(index + 24)}
                    onChange={() => handleSeatChange(index + 24)}
                  />
                ))}
              </div>
            </div>
            <div className="back-section">
              <img src={steering} alt='steering' className='driver-handle'/>
            </div>
          </div>

          <div className="seats-notation">
            <div className="booked">
              <div className='checkbox' />
              <p>Booked</p>
            </div>  
            <div className="avail-seat">
              <div className="checkbox" ></div>
              <p>Availbale</p>
            </div>
          </div>

        </div>

        <div className="bill-section" >
          <div id='ticket'>
          <h2>Bus Ticket Details</h2>  
          <hr className='line'/>
          <div className="bus-seats-detail">
            {bookedSeat && bookedSeat.map((bus) => <div className="booked-bus" key={bus.id}>
                <p className='head-ticket'>Bus Details</p>
                <b className='bus-name'><b className='grey'>Bus Name:</b> {bus.busname}</b>
                <p className='timing'><b className='grey'>Bus Time:</b>{bus.starttime} - {bus.endtime}</p>
                <p className='seats-num'><b className='grey'>Total Hours:</b>{bus.totalhour}</p>   
                <p className='bus-type'><b className='grey'>A/C Type:</b>{bus.bustype}</p>
                <p className='price'><b className='grey'>Ticket Cost:</b>₹ {bus.price}</p>
            </div>)}
          
            {bookedTicket.map((ticket,index) => <div className="location" key={index}>
              <p className='head-ticket'>Location</p>
              <p><b className='grey'>From: </b>{ticket.from}</p>
              <p><b className='grey'>To: </b>{ticket.to}</p>
              <p><b className='grey'>Date: </b>{ticket.date}</p>
            </div>)}
          </div>

          <div className="seat-amount">
            <div className="total-seats"><p>Total Seats: </p>{selectedSeatsCount}</div>  
            <div className="total-amount"><p>Total Amount: </p>₹ {totalAmount}</div>
          </div>
          </div> 
          {showmessage && <p style={{color:'red', textAlign:'center'}}>* Select Seats</p>} 
          <button type='submit' onClick={handleBookNow}>Book Now</button>
        </div>

        { popmessage && (<div className="confirm-section">
          <div className="confirm">
          {orderShow && (
            <div className="order-products">
                <div className="tick">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                    <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                  </svg>
                </div>
                <p>Your seat is succesfully booked.</p>
                <button type="submit" onClick={handleConfirm}>
                  Continue
                </button>
          </div>)}
          {loading && (<div className="loading-container">
              <div className="loading-spinner"></div>
            </div>  
          )}
          </div>
        </div>)}

      </div>
    </div>
  )
}

export default SeatsMenu