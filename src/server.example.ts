import 'dotenv/config';
import app from './app';
import connectToDatabase from './Models/Connection';

const PORT = process.env.PORT || 3001;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
  })
  .catch((error) => {
    console.log('Error when connecting to database:\r\n');
    console.error(error);
    console.log('\r\nInitialization cancelled');
    process.exit(0);
  });
