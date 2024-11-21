// src/types/index.ts
export interface WeatherProps {
    weather: string;
  }
  
export type WeatherDetailType = {
    zipcode: string;
    weather: string;
    temp?: number;
  };
  
export type ResponseItemType = {
    id: string;
    name: string;
  };