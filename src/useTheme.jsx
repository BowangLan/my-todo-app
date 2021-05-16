import { useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

const useTheme = () => {
  console.log("useTheme");
  const [isDark, setIsDark] = useLocalStorage("isDark", false);

  const classes = useMemo(
    () => ({
      bgImg: isDark
        ? { mobile: "bg-img-mobile-dark", desktop: "bg-img-desktop-dark" }
        : { mobile: "bg-img-mobile-light", desktop: "bg-img-desktop-light" },
      bg: isDark ? "bg-dark" : "bg-light",
      bg2: isDark ? "bg2-dark" : "bg2-light",
      colorPrimary: isDark ? "color-primary-dark" : "color-primary-light",
      colorSecondary: isDark ? "color-secondary-dark" : "color-secondary-light",
      colorHover: isDark ? "color-hover-dark" : "color-hover-light",
      shadow: isDark ? "dark-shadow" : "light-shadow",
    }),
    [isDark]
  );
  return [classes, isDark, setIsDark];
};

export default useTheme;
