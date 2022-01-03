export const getDistanceFromLatLonInKm = (lat1: number,lon1: number,lat2: number,lon2: number): number => {
	let R = 6371;
	let dLat = deg2rad(lat2-lat1);
	let dLon = deg2rad(lon2-lon1); 
	let a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2); 
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	return R * c;
}

export const getDistanceFromBerln = (lat: number, lng: number): number => {
	return getDistanceFromLatLonInKm(52.520008, 13.404954, lat, lng);
}
  
export const deg2rad = (deg: number): number => {
	return deg * (Math.PI/180)
}

export const generateError = (message: string, code: number): object => {
	return {
		message,
		code
	}
}