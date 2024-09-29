import mongoose from 'mongoose';
import logger from '../config/logger';
import envConfig from '../config/envConfig';

// Ensure mongoose uses native promises
mongoose.Promise = Promise;

// Handle connection error
mongoose.connection.on('error', (error: Error) => {
  logger.error(`MongoDB connection error: ${error.message}`);
  process.exit(-1);
});

// Create a connection function with improved type definitions
const connect = async (): Promise<mongoose.Connection> => {
  try {
    await mongoose.connect(envConfig.mongoUri, {
      dbName: 'LinkUp',
    });
    logger.info('Database connected successfully!');
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error}`);
    process.exit(-1);
  }

  return mongoose.connection;
};

export { connect };
