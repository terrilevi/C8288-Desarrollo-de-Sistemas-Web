import type { NextApiRequest, NextApiResponse } from "next";
import { findByZip } from "../../../../mongoose/weather/services";
import dbConnect from "../../../../middleware/db-connect";

type ErrorResponse = {
    message: string;
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    try {
        // Connect to database
        await dbConnect();

        // Get and validate zipcode
        const zip = req.query.zipcode as string;
        if (!zip) {
            res.status(400).json({ message: "Missing zipcode parameter" });
            return;
        }

        // Query database
        const data = await findByZip(zip);

        // Return response
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ 
                message: "Weather data not found",
                error: `No weather data found for zipcode: ${zip}` 
            });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ 
            message: "Internal server error",
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}