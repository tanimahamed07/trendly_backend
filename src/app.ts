import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './routes/user.routes';
import { ProductRoutes } from './routes/product.routes';
import { bookingRoutes } from './routes/booking.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', UserRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/bookings', bookingRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Trendly Server is running!');
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;