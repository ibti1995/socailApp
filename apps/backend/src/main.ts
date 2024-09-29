import express from 'express';
import * as mongoose from './db/mongoose';
import userRoute  from './modules/user/userRoute';
import postRoute from './modules/post/postRoute';
import cors from 'cors';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Connect to MongoDB.
 */
mongoose.connect();
app.use('/', userRoute());

app.use('/', postRoute());

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
