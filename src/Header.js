import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPhoneAlt, faTimes, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import logo from './images/logo.png';
import background from './images/background.png';
import Form from './Form';

const Header = () => {
   const [account, setAccount] = useState(false);
   const [user, setUser] = useState(false);
   const [help, setHelp] = useState(false);
   const [showError, setShowError] = useState(false);
   const [showForm, setShowForm] = useState(false);
   const [userData, setUserData] = useState([]);
   const [editData, setEditData] = useState(null);
   const [newItem, setNewItem] = useState({
      name:'',
      mobile:'',
      address:''
    });

   useEffect(() => {
      const userDatas = JSON.parse(localStorage.getItem('userData')) || [];
      setUserData(userDatas);
   }, []) 

   const handleAccount = () => {
      if (userData.length === 0) {
         setAccount(true);
         setUser(false);
      } else {
         setUser(true);
         setAccount(false);
      }
   }

   const handleForm = () => {
      setShowForm(true);
   }

   const addItem = (name, mobile, address) => {
      const addNewItem = { name, mobile, address };
      const updatedTasks = [...userData, addNewItem];
      setUserData(updatedTasks);
      localStorage.removeItem('userData');
      localStorage.setItem('userData', JSON.stringify(updatedTasks));
   }
    
   const handleSubmit = (e) => {
      e.preventDefault();
      if (newItem.name.trim() === '' || newItem.mobile.trim() === '' || newItem.address.trim() === '') {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 2000);
      } else {
        addItem(newItem.name, newItem.mobile, newItem.address);
        setNewItem({
        name: '',
        mobile: '',
        address: ''
        });
        setShowForm(false);
        setAccount(false);
        setUser(false);
        setShowMenu(false);
      }
   };

   const handleEdit = (index) => {
      setShowForm(true);
      setEditData(userData[index]);
   };

   const handleTimes = () => {
      setUser(false);
      setHelp(false);
   }

   const handleHelp = () => {
      setHelp(true);
   }
   const [showMenu, setShowMenu] = useState(false);
 
   const toggleMenu = () => {
     setShowMenu(!showMenu);
   };

   const handleTime = () => {
      setShowMenu(false);
   }

  return (
    <div>
        <div className="header-container">
         <div className="left-section">
            <img src={logo} alt="logo" />
            </div>
            <FontAwesomeIcon icon={faBars} onClick={toggleMenu} className="burger-icon" />
            {showMenu && (
            <div className="right-section">
               <FontAwesomeIcon icon={faTimes} className='fatime' onClick={handleTime}/>
               <div className="account-container" onClick={handleAccount}>
                  <FontAwesomeIcon icon={faUser} className="icons" />
                  <h5>Account</h5>
                  <FontAwesomeIcon icon={faChevronDown} className="drop-down" />
               </div>
               <div className="help-container" onClick={handleHelp}>
                  <FontAwesomeIcon icon={faPhoneAlt} className="icons" />
                  <h5>Help</h5>
               </div>
            </div>
            )}

            {help && <div className='help-line'>
               <FontAwesomeIcon icon={faTimes} className='faTime' onClick={handleTimes} />
               +91 9798789746</div>}
            {account && <div onClick={handleForm} className='profile'>
               Add Profile</div>} 
            {user && userData.map((data, index) => <div className='user-profile' key={index}>
                  <FontAwesomeIcon icon={faTimes} className='faTime' onClick={handleTimes}/>
                  <p>Name: {data.name}</p>
                  <p>Phone: {data.mobile}</p>
                  <p>Email: {data.address}</p>
                  <button onClick={() => handleEdit(index)}>Edit</button>
               </div>
            )}
        </div>
        {showForm && <Form newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} showError={showError} editData={editData}/>}
        <div className="background-image">
         <img src={background} alt='background'/>
        </div>
    </div>
  )
}

export default Header