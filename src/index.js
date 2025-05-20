import express from 'express';
import routes from "./routes/main.routes.js";
import morgan from 'morgan';

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log('Server started on port', process.env.PORT);
});