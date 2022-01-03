import { RequestHandler } from 'express';
import { Hotel, HotelType, LangsType, ResultInterface } from '../models/hotel';
import hotels from '../store/hotels.json';

const HOTELS: HotelType[] = hotels;

export const getHotels: RequestHandler = (req, res, next) => {
	let lang: LangsType;
	const langsArray = ['en-US', 'de-DE', 'fr-FR', 'es-ES'];

	if(req.query.lang){
		if(langsArray.indexOf(req.query.lang as LangsType) === -1) {
			throw new Error('Please provide valid language code!')
		}
		lang = req.query.lang as LangsType;
	}

	const hotelsToReturn = HOTELS.map((hotel) => {
		const modifiedHotel = new Hotel(hotel, lang);
		return modifiedHotel;
	});

	const result: ResultInterface = {
		success: true,
		result: hotelsToReturn
	};

    res.status(200).json(result)
};
