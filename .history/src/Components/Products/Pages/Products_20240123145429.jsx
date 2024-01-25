import React from 'react'
import "./Products.scss"
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
export default function Products() {
    return (
        <div>
            <div className="container">
                <div className="grid-item">
                    <a href="" className='roomItem'>
                        <div className="position-relative topItem">
                            <Swiper
                                className="roomSwiper"
                                spaceBetween={0}
                                slidesPerView={1}
                                navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
                                pagination={{ clickable: true }}
                            >
                                <SwiperSlide>
                                    <img
                                        src="https://airbnb.cybersoft.edu.vn/public/images/room/1658134435797_put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg"
                                        alt="Room Slide"
                                        className="w-full"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img
                                        src="https://airbnb.cybersoft.edu.vn/public/images/room/1634310532625_saigon1979hostel.jpg"
                                        alt="Room Slide"
                                        className="w-full"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img
                                        src="https://airbnb.cybersoft.edu.vn/public/images/room/1658134435797_put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg"
                                        alt="Room Slide"
                                        className="w-full"
                                    />
                                </SwiperSlide>
                            </Swiper>
                            <button className="btn position-absolute top-3 end-3 z-index-3 btn-heart">
                                <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    style={{ display: 'block', fill: 'rgba(0, 0, 0, 0.5)', height: '24px', width: '24px', stroke: 'rgb(255, 255, 255)', strokeWidth: '2', overflow: 'hidden' }}
                                >
                                    <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                                </svg>
                            </button>
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                        </div>
                        {/* <div className="topItem">
                            <img src="https://airbnb.cybersoft.edu.vn/public/images/room/1658134435797_put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg" alt="https://airbnb.cybersoft.edu.vn/public/images/room/1658134435797_put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg" />
                            <button className="btn-heart">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'rgba(0, 0, 0, 0.5)', height: 24, width: 24, stroke: 'rgb(255, 255, 255)', strokeWidth: 2, overflow: 'hidden' }}>
                                    <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" />
                                </svg>
                            </button>
                        </div> */}
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
