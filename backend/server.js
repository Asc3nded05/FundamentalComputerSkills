import routes from './routes/index.js'; 
import express from 'express';

const app = express();
const port = process.env.PORT || 80; 

//middleware
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Api is running');
});

//Api Routes
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});