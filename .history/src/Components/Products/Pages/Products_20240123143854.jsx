import React from 'react'
import "./Products.scss"
export default function Products() {
    return (
        <div>
            <div className="container">
                <div className="grid-item">
                    <a href="" className='roomItem'>
                        <div className="topItem">
                            <img src="https://airbnb.cybersoft.edu.vn/public/images/room/1658134435797_put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg" alt="https://airbnb.cybersoft.edu.vn/public/images/room/1658134435797_put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg" />
                        </div>
                        <div className="btItem">
                            <div className='container-bt'>
                                <p class="title">
                                    <span class="nameItem">Khách Sạn Hồng Hào</span>
                                    <span><i class="fa fa-star"></i> 8.31</span>
                                </p>
                                <p class="text-item">5867 km</p>
                                <p class="text-item">Ngày 11 - Ngày 27 tháng 11</p>
                                <p class="price"><span class="number-price">$261</span> đêm</p>
                            </div>
                        </div>
                    </a>
                    
                </div>
            </div>
        </div>
    )
}
