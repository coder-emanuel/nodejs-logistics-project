import express from 'express';
import env from 'dotenv';
import { routes } from './routes/routes.js'

env.config();
const PORT = process.env.PORT || 3001
const app = express();

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server in port http://localhost:${PORT}`);
})