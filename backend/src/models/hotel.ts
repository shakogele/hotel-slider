import { getDistanceFromBerln } from '../utils/helpers';

export type LangsType = 'en-US' | 'de-DE' | 'fr-FR' | 'es-ES'

type PropOneOfLangType = {
	[Property in LangsType]?: string | undefined
}
type ImageType = {
	url: string;
	caption: PropOneOfLangType;
}

type ImageOutType = {
	url: string;
	caption: string | undefined;
}

type DealType = {
	expireTime: string;
	headline: PropOneOfLangType;
	details: PropOneOfLangType;
}

type DealOutType = {
	headline: string | undefined,
	details: string | undefined,
}

type BenefitOutType = {
	text: string | undefined;
}

type BenefitInType = {
	text: PropOneOfLangType
}

export type HotelType = {
	id: number;
	minPrice: number | null;
	currencyCode: string;
	countryCode: string;
	name: PropOneOfLangType;
	address: PropOneOfLangType;
	city: PropOneOfLangType;
	description: PropOneOfLangType;
	benefits: BenefitInType[];
	deals: DealType[] | [];
	images: ImageType[];
	lat: number;
	lng: number;
}

export interface HotelInterface {
	id: number,
	name: string | undefined,
	address: string | undefined,
	city: string | undefined,
	description: string | undefined,
	minPrice: number | null,
	currencyCode: string,
	distanceToCenterKm: number,
	firstDeal: DealOutType,
	firstImage: ImageOutType,
	benefits: BenefitOutType[],
}

export interface ResultInterface {
	success: boolean,
	error?: string,
	result?: HotelInterface[]
}

export class Hotel implements HotelInterface {
	id: number;
	name: string | undefined;
	address: string | undefined;
	city: string | undefined;
	description: string | undefined;
	minPrice: number | null;
	currencyCode: string;
	distanceToCenterKm: number;
	firstDeal: DealOutType;
	firstImage: ImageOutType;
	benefits: BenefitOutType[];
    constructor(hotel: HotelType, lang: LangsType) {
		this.id = hotel.id;
		this.name = hotel.name[lang];
		this.address = hotel.address[lang];
		this.city = hotel.city[lang];
		this.description = hotel.description[lang];
		this.minPrice = hotel.minPrice;
		this.currencyCode = hotel.currencyCode;
		this.distanceToCenterKm = getDistanceFromBerln(hotel.lat, hotel.lng);
		this.firstDeal = this.generateFirstDeal(hotel.deals, lang);
		this.firstImage = this.generateFirstImage(hotel.images, lang);
		this.benefits = this.generateBenefits(hotel.benefits, lang);
	}

	generateBenefits: (benefits: BenefitInType[], lang: LangsType) => BenefitOutType[] = (benefits, lang) => {
		let benefitsArr: BenefitOutType[] = [];
		benefits.forEach((benefit: BenefitInType) => {
			benefitsArr.push({
				text: benefit.text[lang]
			})
		});
		return benefitsArr;
	}

	generateFirstDeal: (deals: DealType[], lang: LangsType) => DealOutType = (deals, lang) => {
		let firstDeal: DealOutType = {
			headline: '',
			details: '',
		};
		firstDeal.headline = deals[0]?.headline[lang];
		firstDeal.details = deals[0]?.details[lang];
	
		return firstDeal;
	}

	generateFirstImage: (images: ImageType[], lang: LangsType) => ImageOutType = (images, lang) => {
		let firstImage: ImageOutType = {
			url: '',
			caption: '',
		};
		firstImage.url = images[0].url;
		firstImage.caption = images[0].caption[lang];
	
		return firstImage;
	}

}
