import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import ContactsRouter from './src/presentation/routes/ContactsRouter';

const app: Express = express();
const port: number = 3000;

app.use(express.json());
export default app