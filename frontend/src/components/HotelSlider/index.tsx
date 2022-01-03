import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from 'swiper';
import { HotelInterface } from '../../ts/hotel';
import { connect } from 'react-redux';
import { getHotels } from '../../redux/actions/hotels';
import { AppDispatch, RootState } from '../../redux/store';

import "swiper/css";
import "swiper/css/navigation"

import "./styles.scss";
import diamond from '../../assets/images/diamond.svg';

SwiperCore.use([Navigation]);

type HotelSliderProps = {
	hotels: HotelInterface[],
	onGetHotels: () => void,
}

const HotelSlider: React.FC<HotelSliderProps> = (props) => {

	const { hotels, onGetHotels } = props
	const [index, setIndex] = useState(0);
	const gotoHotel = () => {
		window.open(`https://reisetopia.de/hotels/anfrage-details/?numPersons=2&numRooms=1&hotelId=${hotels[index].id}`, '_blank')
	}

	useEffect(() => {
		onGetHotels()
	}, []);

	return (
		<div className='sslider'>
			<div className='sslider__background'></div>
			<div className='sslider__content'>
				<h1 className='sslider__title'>Aktuelle Angebote</h1>
				<Swiper
					navigation={true}
					spaceBetween={50}
					loop={true}
					onSlideChange={(swiperCore) => {
						const {
						realIndex,
						} = swiperCore;
						setIndex(realIndex)
						
					}}
					className="mySwiper">
						{
							hotels.map((hotel:HotelInterface) => {
								return (
									<SwiperSlide key={hotel.id}>
										<img src={hotel.firstImage.url} alt='something' />
										<figcaption>{hotel.name}</figcaption>
									</SwiperSlide>
								)
							})
						}
				</Swiper>
				{
					hotels[index] && (
					<div className='sslider__hotel-details'>
					<h3 className='sslider__hotel-title'>{hotels[index].firstDeal.headline }</h3>
					<div className='sslider__hotel-info'>
						<div className='sslider__hotel-info__item'>
							<img src={diamond} alt="Hotel benefits" />
							<div>
								{
									hotels[index].benefits?.map((benefit, index) => {
										if(index > 2){
											return
										}else{
											return <div key={index}>{benefit.text}</div>
										}
									})
								}
							</div>
						</div>
						<div className='sslider__hotel-info__item'>
							<img src={diamond} alt="Hotel VIP treatment"/>
							<p>VIP-Behandlung wahrend des Aufenthalts</p>
						</div>
						<div className='sslider__hotel-info__item'>
							<img src={diamond} alt="Hotel availability"/>
							<p>Reisezeitraum: </p>
						</div>
					</div>
					<div
						className='sslider__hotel-button'
						role='button'
						onClick={gotoHotel}>
							Direct Anfragen
					</div>
				</div>
					)
				}
			</div>
		</div>
	)
}

const mapStateToProps = (state: RootState) => {
	return {
		hotels: state.hotels.list.splice(0, 5)
	}
}
const mapDispatchToProps = (dispatch: AppDispatch) => ({
	onGetHotels: () => dispatch(getHotels())
})

export default connect(mapStateToProps, mapDispatchToProps)(HotelSlider);
