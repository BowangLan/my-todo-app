import React from "react";

const useMobile = (mobileMaxWidth) => {
  const [isMobile, setIsMobile] = React.useState(
    window.innerWidth <= mobileMaxWidth
  );
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      console.log("Resizing...");
      if (window.innerWidth <= mobileMaxWidth) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, []);

  return [isMobile, setIsMobile];
};

export default useMobile;
