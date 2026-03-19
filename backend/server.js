import routes from './routes/index.js'; 
import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000; 


app.use(cors({
  origin: 'https://asc3nded05.github.io'
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