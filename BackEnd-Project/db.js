const myMongoose = require('mongoose');

// Allow overriding Mongo URI via env for tests or deployment
const mongoURL = process.env.MONGO_URI || 'mongodb://localhost:27017/myDBTest';

// Creating a function to connect to MongoDB
const connectToMongo = async () => {
    try {
        await myMongoose.connect(mongoURL, {
            // useNewUrlParser and useUnifiedTopology are defaults in mongoose 6+
        });
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error('Error connecting to MongoDB:', e.message);
        throw e; // rethrow so callers can detect failure
    }
};

module.exports = connectToMongo;