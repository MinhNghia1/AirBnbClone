import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const Products = () => {
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    // Fetch room data from the API
    const fetchRoomData = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT'); // Replace with your actual API endpoint
        const data = await response.json();

        if (response.ok) {
          setRoomData(data.content);
        } else {
          console.error('Failed to fetch room data');
        }
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <div className="container">
        {roomData.map((room) => (
          <div key={room.id} className="grid-item">
            {/* Your existing room item JSX here */}
            {/* Replace static data with dynamic data from the API */}
            <a href="" className="roomItem">
              {/* ... other JSX ... */}
              <div className="btItem">
                <div className="container-bt">
                  <p className="title">
                    <span className="nameItem">{room.tenPhong}</span>
                    <span>
                      <i className="fa fa-star"></i> {room.giaTien}
                    </span>
                  </p>
                  <p className="text-item">Capacity: {room.khach} guests</p>
                  {/* Add more details from the room object as needed */}
                  {/* ... other JSX ... */}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
