import colors from '../config/colors';
import ColorScheme from '../types/ColorScheme';
import React, {createContext, useEffect, useState } from 'react';

interface ColorsContext{
  colorScheme: ColorScheme,
  handleColorScheme: () => void
}

export const ThemeContext = createContext<ColorsContext | undefined>(undefined);

export const  ThemeProvider = ( { children }: React.ReactNode ) => {

  const [colorScheme, setColorScheme] = useState<ColorScheme>(colors[0]);
  const storedColorScheme = localStorage.getItem("colorScheme");

  const handleColorScheme = () => {
    if (colorScheme === colors[0]) {
      setColorScheme(colors[1]);
    } else {
      setColorScheme(colors[0]);
    }
  }

  useEffect(() => {
    if (storedColorScheme) {
      const parsedColors = JSON.parse(storedColorScheme);
      setColorScheme(parsedColors);
    }
  }, []);

  useEffect(() => {
    const jsonColors = JSON.stringify(colorScheme);
    localStorage.setItem("colorScheme", jsonColors);
  }, [colorScheme])

  return (
      <ThemeContext.Provider value={{ colorScheme, handleColorScheme}}>
          {children}
      </ThemeContext.Provider>
      )

}
