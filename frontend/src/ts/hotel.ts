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

export type DealOutType = {
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
