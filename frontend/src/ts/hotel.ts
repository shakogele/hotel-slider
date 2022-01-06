export type LangsType = 'en-US' | 'de-DE' | 'fr-FR' | 'es-ES'

type ImageOutType = {
	url: string;
	caption: string | undefined;
}

type DealOutType = {
	headline: string | undefined,
	details: string | undefined,
}

type BenefitOutType = {
	text: string | undefined;
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
