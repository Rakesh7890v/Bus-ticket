import React, { useEffect } from 'react'

const Form = ({newItem, setNewItem, handleSubmit, showError, editData}) => {

  useEffect(() => {
    if (editData) {
       setNewItem({
          name: editData.name || '',
          mobile: editData.mobile || '',
          address: editData.address || ''
       });
    }
 }, [editData, setNewItem]);

  return (
    <div>
      <div className="form-error">
      {showError && <p className='home-error form'>Enter Your Details<span></span></p>}
      </div>
      <div className="input-form">
        <div className="user-detail-form">
            <input type="text" placeholder='Name' value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})}/>
            <input type="text" placeholder='Mobile No' value={newItem.mobile} onChange={(e) => setNewItem({...newItem, mobile: e.target.value})}/>
            <input type="text" placeholder='Email Address' value={newItem.address} onChange={(e) => setNewItem({...newItem, address: e.target.value})}/>
            <div className="buttons">
              <button type='submit' className='confirm-button' onClick={handleSubmit}>Confirm</button>
            </div>
        </div>
      </div>  
    </div>
  )
}

export default Form