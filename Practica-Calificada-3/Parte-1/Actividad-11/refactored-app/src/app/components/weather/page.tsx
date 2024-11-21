'use client';

import React, { useState, useEffect } from 'react';
import type { WeatherProps } from '@/types';
import styles from './weather.module.css';

const WeatherComponent = (props: WeatherProps) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(1);
  }, []);

  return (
    <h1 className={styles.heading} onClick={() => setCount(count + 1)}>
      El clima es {props.weather}, y el contador muestra {count}
    </h1>
  );
};

export default function Page() {
  return <WeatherComponent weather="sunny" />;
}