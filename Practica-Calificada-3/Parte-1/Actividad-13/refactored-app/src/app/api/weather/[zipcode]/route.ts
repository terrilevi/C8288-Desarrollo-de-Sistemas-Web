import { NextRequest, NextResponse } from 'next/server';
import type { WeatherDetailType } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { zipcode: string } }
) {
  try {
    // Simulamos una llamada a API del clima
    const weatherData: WeatherDetailType = {
      zipcode: params.zipcode,
      weather: 'sunny',
      temp: Math.floor(Math.random() * 30) + 10 // Temperatura entre 10 y 40
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}