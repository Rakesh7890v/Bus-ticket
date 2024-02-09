import React, { useState } from 'react';

const Seats = ({handleBook, buses, setShowbutton, showbutton}) => {

  const [clickid, setclickid] = useState('');

  const handleConfirm = (id) => {
    setclickid(id);
    setShowbutton(true);
  }

  return (
    <div>
      <div className="seats-container">
        <div className="right-container">
          {buses && buses.map((bus) => <div className="bus-section" key={bus.id} onClick={() => handleConfirm(bus.id)}>
            <div className="left-bus">
              <p className='timing'><b>{bus.starttime}</b> - {bus.endtime}</p>
              <p className='seats-num'>{bus.totalhour} <span> • {bus.totalseats}</span></p>   
              <b className='bus-name'>{bus.busname}</b>
              <p className='bus-type'>{bus.bustype}</p>
            </div>
            <div className="right-bus">
              <p className='price'>From <b>₹ {bus.price}</b></p>
              <p className='ratings'>{bus.rating} ★</p>
            </div>
            {showbutton && clickid === bus.id && <button onClick={() => handleBook(bus.id)}>Confirm</button>}
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default Seats;
