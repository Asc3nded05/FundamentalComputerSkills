import routes from './routes/index.js'; 
import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000; 

const allowedOrigins = [
  'https://asc3nded05.github.io',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

//middleware
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Api is running');
});

//Api Routes
app.use('/api', routes)

app.listen(port, '0.0.0.0', () => {
  console.log(`Express server listening on port ${port}`);
});