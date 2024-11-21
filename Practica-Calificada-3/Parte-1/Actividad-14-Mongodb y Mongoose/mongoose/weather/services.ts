import WeatherModel from "./model";
import { WeatherInterface } from "./interface";

export async function findByZip(zip: string): Promise<WeatherInterface | null> {
    try {
        const result = await WeatherModel.findOne({ zip }).lean();
        return result;
    } catch (error) {
        console.error('Error finding weather document:', error);
        return null;
    }
}

export async function storeDocument(doc: WeatherInterface): Promise<boolean> {
    try {
        const newDocument = new WeatherModel(doc);
        await newDocument.save();
        return true;
    } catch (error) {
        console.error('Error storing weather document:', error);
        return false;
    }
}

export async function updateByZip(
    zip: string,
    newData: Partial<WeatherInterface>
): Promise<boolean> {
    try {
        const result = await WeatherModel.updateOne(
            { zip },
            { $set: newData }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error('Error updating weather document:', error);
        return false;
    }
}

export async function deleteByZip(zip: string): Promise<boolean> {
    try {
        const result = await WeatherModel.deleteOne({ zip });
        return result.deletedCount > 0;
    } catch (error) {
        console.error('Error deleting weather document:', error);
        return false;
    }
}