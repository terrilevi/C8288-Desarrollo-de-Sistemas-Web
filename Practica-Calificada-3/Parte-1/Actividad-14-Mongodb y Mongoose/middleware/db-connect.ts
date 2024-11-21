// middleware/db-connect.ts
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { storeDocument } from "../mongoose/weather/services";

let mongoServer: MongoMemoryServer | null = null;

async function dbConnect(): Promise<void> {
    try {
        // Check if already connected
        if (mongoose.connection.readyState === 1) {
            return;
        }

        // Create server if it doesn't exist
        if (!mongoServer) {
            mongoServer = await MongoMemoryServer.create();
            const MONGODB_URI = mongoServer.getUri();

            // Connect to database
            await mongoose.connect(MONGODB_URI, {
                dbName: "Weather"
            });

            // Seed initial data only if collection is empty
            const collections = await mongoose.connection.db.listCollections().toArray();
            if (!collections.find(c => c.name === 'weathers')) {
                // Initial data
                await storeDocument({
                    zip: "96815",
                    weather: "sunny",
                    tempC: "25C",
                    tempF: "70F",
                    friends: ["96814", "96826"]
                });
                await storeDocument({
                    zip: "96814",
                    weather: "rainy",
                    tempC: "20C",
                    tempF: "68F",
                    friends: ["96815", "96826"]
                });
                await storeDocument({
                    zip: "96826",
                    weather: "rainy",
                    tempC: "30C",
                    tempF: "86F",
                    friends: ["96815", "96814"]
                });
                console.log("Initial data seeded");
            }
        }
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

// Clean up function
export async function disconnectDB(): Promise<void> {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    if (mongoServer) {
        await mongoServer.stop();
        mongoServer = null;
    }
}

export default dbConnect;