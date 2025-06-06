import { useEffect, useState, createContext } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

const AppLoadingContext = createContext();

const fetchFonts = () => {
  return Font.loadAsync({
    customFont: require("../assets/fonts/Simply Rounded.ttf"),
  });
};

export const AppLoadingProvider = ({ children }) => {
  const [fontsLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fetchFonts();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
        await SplashScreen.hideAsync();
      }
    };

    loadFonts();
  }, []);

  return (
    <AppLoadingContext.Provider value={{ fontsLoaded }}>
      {children}
    </AppLoadingContext.Provider>
  );
};

export default AppLoadingContext;
