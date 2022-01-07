import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from 'swiper';
import { HotelInterface, LangsType } from '../../ts/hotel';
import { connect } from 'react-redux';
import { getHotels } from '../../redux/actions/hotels';
import { AppDispatch, RootState } from '../../redux/store';

import "swiper/css";
import "swiper/css/navigation"

import diamond from '../../assets/images/diamond.svg';
import calendar from '../../assets/images/calendar.svg';
import gift from '../../assets/images/gift.svg';

SwiperCore.use([Navigation]);

type HotelSliderProps = {
	hotels: HotelInterface[],
	onGetHotels: (lang: LangsType ) => void,
}

const HotelSlider: React.FC<HotelSliderProps> = (props) => {

	const { hotels, onGetHotels } = props
	const [state, setState] = useState({
		index: 0,
		prevIndex: 0,
		nextIndex: 0,
	});
	const gotoHotel = () => {
		window.open(`https://reisetopia.de/hotels/anfrage-details/?numPersons=2&numRooms=1&hotelId=${hotels[index].id}`, '_blank')
	}

	useEffect(() => {
		onGetHotels('de-DE')
	}, []);

	const { index, prevIndex, nextIndex } = state;

	return (
		<div className='sslider'>
			<div className='sslider__background'></div>
			<div className='sslider__content'>
				<h1 className='sslider__title'>Aktuelle Angebote</h1>
				<div className='sslider__diamonds-icon'></div>
				{
					hotels.length && (
						<div className='sslider__item-bg'>
							<div style={{ background: `url(${hotels[prevIndex].firstImage.url})` }}></div>
							<div style={{ background: `url(${hotels[nextIndex].firstImage.url})` }}></div>
						</div>
					)
				}
				<Swiper
					navigation={true}
					spaceBetween={50}
					loop={true}
					onSlideChange={(swiperCore) => {
						const {
						realIndex,
						} = swiperCore;
						setState({
							index: realIndex,
							prevIndex: realIndex === 0 ? (hotels.length - 1) : realIndex-1,
							nextIndex: realIndex === hotels.length - 1 ? 0 : realIndex + 1,
						})
						
					}}
					className="mySwiper">
						{
							hotels.map((hotel:HotelInterface) => {
								return (
									<SwiperSlide key={hotel.id}>
										<div className="sslider__item">
											
											<div className='sslider__item-image'>
												<img src={hotel.firstImage.url} alt='something' />
												<figcaption>{hotel.name}</figcaption>
											</div>
										</div>
									</SwiperSlide>
								)
							})
						}
				</Swiper>
				{
					hotels[index] && (
					<div className='sslider__hotel-details'>
						<h3
							className='sslider__hotel-title'
							style={{ visibility: hotels[index].firstDeal.headline ? 'visible' : 'hidden' }}>
								{hotels[index].firstDeal.headline}
						</h3>
						<div className='sslider__hotel-info'>
							<div className='sslider__hotel-info__item'>
								<img src={gift} alt="Hotel benefits" />
								<div className='sslider__hotel-info__item-description'>
									{
										hotels[index].benefits?.slice(0, 3).map(item => item.text).join('; ')
									}
								</div>
							</div>
							<div className='sslider__hotel-info__item'>
								<img src={diamond} alt="Hotel VIP treatment"/>
								<div className='sslider__hotel-info__item-description'>VIP-Behandlung wahrend des Aufenthalts</div>
							</div>
							<div className='sslider__hotel-info__item'>
								<img src={calendar} alt="Hotel availability"/>
								<div className='sslider__hotel-info__item-description'>Reisezeitraum: </div>
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
	onGetHotels: (lang: LangsType) => dispatch(getHotels(lang))
})

export default connect(mapStateToProps, mapDispatchToProps)(HotelSlider);
