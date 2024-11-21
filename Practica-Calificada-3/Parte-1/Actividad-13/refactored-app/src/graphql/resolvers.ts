import { db } from './data';

interface WeatherInterface {
  zip: string;
  weather: string;
  tempC: string;
  tempF: string;
  friends: string[];
}

export const resolvers = {
  Query: {
    weather: async (
      _: unknown,
      { zip }: { zip: string }
    ): Promise<WeatherInterface[]> => {
      const result = db.find((item) => item.zip === zip);
      return result ? [result] : [];
    },
  },
  Mutation: {
    weather: async (
      _: unknown,
      { data }: { data: WeatherInterface }
    ): Promise<WeatherInterface[]> => {
      const result = db.find((item) => item.zip === data.zip);
      return result ? [result] : [];
    },
  },
};
