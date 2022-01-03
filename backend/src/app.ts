import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { ResultInterface } from './models/hotel';

import hotelRoutes from './routes/hotels';

const app = express();

app.use(json());

app.use('/v1/recruiting', hotelRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	const result: ResultInterface = {
		success: false,
		error: err.message,
	}
	res.status(500).json(result);
});

app.use((req: Request, res: Response, next: NextFunction) => {
	const result: ResultInterface = {
		success: false,
		error: 'Page not found!',
	}
	res.status(404).send(result)
})

app.listen(3001);