import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Home = ({newItem, setNewItem, handleSearch, showError}) => {

  return (
    <div>
      <div className="home-container">
      {showError && <p className='home-error'>Enter Your Destination<span></span></p>}
        <div className="input-section">
          <div className="input-wrapper">
            <FontAwesomeIcon icon={faMapMarkerAlt} className='input-icons'/>
            <input type="text" placeholder="FROM" list='from' className="first-input" value={newItem.from} onChange={(e) => setNewItem({...newItem,from: e.target.value})}/>
          </div>
          <div className="input-wrapper">
            <FontAwesomeIcon icon={faMapMarkerAlt} className='input-icons'/>
            <input type="text" placeholder="TO" list='from' value={newItem.to} onChange={(e) => setNewItem({...newItem,to: e.target.value})}/>
          </div>
          <div className="input-wrapper">
            <input type="date" placeholder="DATE" value={newItem.date} onChange={(e) => setNewItem({...newItem,date: e.target.value})}/>
          </div>
          <button type="Submit" className="first-button" onClick={handleSearch}>
            SEARCH BUSES
          </button>
        </div>
      </div>
      <datalist id='from'>
        <option value="Ariyalur"></option>
        <option value="Chennai"></option>
        <option value="Coimbatore"></option>
        <option value="Cuddalore"></option>
        <option value="Dharmapuri"></option>
        <option value="Dindigul"></option>
        <option value="Erode"></option>
        <option value="Kallakurichi"></option>
        <option value="Kanchipuram"></option>
        <option value="Kanyakumari"></option>
        <option value="Karur"></option>
        <option value="Krishnagiri"></option>
        <option value="Madurai"></option>
        <option value="Nagapattinam"></option>
        <option value="Namakkal"></option>
        <option value="Nilgiris"></option>
        <option value="Perambalur"></option>
        <option value="Pudukkottai"></option>
        <option value="Ramanathapuram"></option>
        <option value="Ranipet"></option>
        <option value="Salem"></option>
        <option value="Sivagangai"></option>
        <option value="Tenkasi"></option>
        <option value="Thanjavur"></option>
        <option value="Theni"></option>
        <option value="Thoothukudi"></option>
        <option value="Tiruchirapalli"></option>
        <option value="Tirunelveli"></option>
        <option value="Tirupathur"></option>
        <option value="Tiruppur"></option>
        <option value="Tiruvallur"></option>
        <option value="Thiruvannamali"></option>
        <option value="Tiruvarur"></option>
        <option value="Vellore"></option>
        <option value="Viluppuram"></option>
        <option value="Virudhunagar"></option>
      </datalist>
    </div>
  );
};

export default Home;
