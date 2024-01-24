import React from 'react'

export default function Products() {
    return (
        <div>
            <div className="container mx-auto mt-5">
                <div classname="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-10">
                    <a className="roomLink" href="/roomdetail/61655623dc423b001dd9c05a">
                        <div className="roomSwiper relative">
                            <div className="swiper swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                                <div
                                    className="swiper-wrapper"
                                    style={{ transitionDuration: '0ms', transform: 'translate3d(-346px, 0px, 0px)' }}
                                >
                                    <div
                                        className="swiper-slide swiper-slide-duplicate w-full swiper-slide-prev"
                                        data-swiper-slide-index="2"
                                        style={{ width: '346px' }}
                                    >
                                        <img
                                            src="https://airbnb.cybersoft.edu.vn/public/images/room/1658134435797_put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg"
                                            alt="Room Image 1"
                                        />
                                    </div>
                                </div>  npm i swiper
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-button-next"></div>
                                <div className="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal swiper-pagination-bullets-dynamic" style={{ width: '80px' }}></div>
                                <button className="absolute top-3 right-3 z-30">
                                    <svg
                                        viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        role="presentation"
                                        focusable="false"
                                        style={{
                                            display: 'block',
                                            fill: 'rgba(0, 0, 0, 0.5)',
                                            height: '24px',
                                            width: '24px',
                                            stroke: 'rgb(255, 255, 255)',
                                            strokeWidth: '2',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div>
                            <p className="flex justify-between mt-2">
                                <span className="font-bold">Khách Sạn Hồng Hào</span>
                                <span>
                                    <i className="fa fa-star"></i> 7.96
                                </span>
                            </p>
                            <p className="text-gray-500">4081 km</p>
                            <p className="text-gray-500">Ngày 26 - Ngày 5 tháng 5</p>
                            <p className="mt-1">
                                <span className="font-bold">$544</span> đêm
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
