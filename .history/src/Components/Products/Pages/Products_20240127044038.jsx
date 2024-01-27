import React from 'react'
import "./Products.scss"
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getRooms } from '../../../Apis/room';
import LoadingPage from '../../LoadingPage';
import { useNavigate } from 'react-router-dom';
export default function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const getRooms = async () => {
          try {
            setIsLoading(true);
            const dataRooms = await getRooms();
            setRooms(dataRooms);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        };
        getRooms();
      }, []);
      const navigate = useNavigate();
      if (isLoading) {
        return <LoadingPage />;
      }
    return (
        <div>
            <div className="container">
                <div className="grid-item">
                    {rooms.map((room) =>{
                        return(
                            
                            );
                    })};
                </div>
            </div>
        </div>
    )
}
