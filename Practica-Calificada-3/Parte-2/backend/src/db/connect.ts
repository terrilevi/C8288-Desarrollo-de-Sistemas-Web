import mongoose from 'mongoose';

const connectDB = async (uri: string) => {
    try {
        const options = {
            dbName: 'ratings' // Especificar la base de datos correcta
        } as mongoose.ConnectOptions;

        await mongoose.connect(uri, options);
        console.log('MongoDB connected successfully');

        const db = mongoose.connection.db;
        if (db) {
            const collections = await db.listCollections().toArray();
            console.log('Colecciones disponibles:', collections.map(c => c.name));
        }

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;