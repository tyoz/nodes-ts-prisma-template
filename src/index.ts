import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json( { message: 'test123456' } );
});

const port = Number(process.env.PORT) || 2000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening at http://localhost:${port}`);
});