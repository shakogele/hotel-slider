import { SET_HOTELS } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui'
import { AppDispatch } from '../store';
import { HotelInterface } from '../../ts/hotel';

import { LangsType } from '../../ts/hotel';

export const getHotels = (lang: LangsType) => (dispatch: AppDispatch) => {
	dispatch(uiStartLoading());

	let myHeaders = new Headers();

	myHeaders.append("Accept", "application/json");
	myHeaders.append("Content-Type", "application/json");

	let requestOptions = {
		method: 'GET',
		headers: myHeaders,
	};

	fetch(`http://localhost:3001/v1/recruiting/hotels?lang=${lang}`, requestOptions)
		.then(response => response.json())
		.then(res => {
			dispatch(setHotels(res.result))
			dispatch(uiStopLoading());
		})
		.catch(error => {
			dispatch(uiStopLoading());
			console.log('error', error)
		});
}

export const setHotels = (hotels: HotelInterface) => {
    return {
        type: SET_HOTELS,
		payload: hotels
    };
};