import express from 'express';
import path from 'path'
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';

const app = express();


const __dirname = path.resolve();




app.get('/health', (req, res) => {
  res.send('Server is running very well!');
});

app.get('/api', (req, res) => {
  res.json({ message: 'This is some protected data from the backend!' });
});

// make the app ready for deployment
if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist'))); 

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
  });

};


const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
    
});
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();