import React, { useState } from 'react';
import { FaCarSide, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import "./Booking.css";
import Loading from '../Loading/Loading';  // Import the loading spinner

const Booking = () => {
  const [isLoading, setIsLoading] = useState(false); // Add a loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted

    // Simulate a delay (e.g., API call)
    setTimeout(() => {
      setIsLoading(false); // Reset loading after the operation
      alert('Booking submitted successfully!');
    }, 2000); // Example delay, you can replace this with actual API call
  };

  return (
    <div className='container'>
      <div className="text-container">
        <p>Book a car</p>
      </div>
      
      {isLoading ? (  // Show loading spinner if isLoading is true
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='form-box'>
            <label htmlFor="car"> <FaCarSide />&nbsp;Select Your Car Type</label>
            <select name="car" id="car" className='sl'>
              <option>Select Your Car Type</option>
              <option value="Maruti Suzuki Celerio">Maruti Suzuki Celerio</option>
              <option value="Maruti Suzuki WagonR">Maruti Suzuki WagonR</option>
              <option value="Tata Tiago">Tata Tiago</option>
              <option value="Hyundai Aura">Hyundai Aura</option>
            </select>
          </div>
          <div className='form-box'>
            <label htmlFor="pick-up"><FaMapMarkerAlt />&nbsp;Pick up</label>
            <select name="pick-up" id="pick-up" className='sl'>
              <option>Select Pick up location</option>
              <option value="Ayodhya">Ayodhya</option>
              <option value="varanasi">varanasi</option>
              <option value="mirzapur">mirzapur</option>
              <option value="lucknow">lucknow</option>
              <option value="agra">agra</option>
            </select>
          </div>
          <div className='form-box'>
            <label htmlFor="drop-of"><FaMapMarkerAlt />&nbsp;Drop off</label>
            <select name="drop-of" id="drop-of" className='sl'>
              <option>Select drop off location</option>
              <option value="Ayodhya">Ayodhya</option>
              <option value="varanasi">varanasi</option>
              <option value="mirzapur">mirzapur</option>
              <option value="lucknow">lucknow</option>
              <option value="agra">agra</option>
            </select>
          </div>
          <div className='form-box'>
            <label htmlFor="pick-up-date"> <FaRegCalendarAlt />&nbsp;Pick-up Date</label>
            <input type="date" id="pick-up-date" className='sl'/>
          </div>
          <div className='form-box'>
            <label htmlFor="drop-of-date"> <FaRegCalendarAlt />&nbsp;Drop-off Date</label>
            <input type="date" id="drop-of-date" className='sl'/>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Booking;
