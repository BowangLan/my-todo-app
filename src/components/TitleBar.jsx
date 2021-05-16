import React, { useMemo } from "react";
import { useGlobalContext } from "../context";
import SunIcon from "../assets/SunIcon";
import MoonIcon from "../assets/MoonIcon";

const TitleBarInner = ({ isDark, setIsDark }) => {
  console.log("Rendering Title bar...", isDark);
  return (
    <div
      className="title-bar"
      style={{
        color: "#FEFEFF",
      }}
    >
      <span className="title">T O D O</span>
      <span
        className="title-icon"
        onClick={() => setIsDark((preValue) => !preValue)}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
    </div>
  );
};

const TitleBar = () => {
  const { isDark, setIsDark } = useGlobalContext();
  return useMemo(
    () => <TitleBarInner isDark={isDark} setIsDark={setIsDark} />,
    [isDark]
  );
};

export default TitleBar;
