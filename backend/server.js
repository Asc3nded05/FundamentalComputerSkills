import routes from './routes/index.js'; 
import express from 'express';

const app = express();
const PORT = 3000;

//middleware
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Api is running');
});

//Api Routes
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});