import React from "react";

const Wave = () => {
  return (
    <footer className="fixed bottom-0 w-full max-h-[210px]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="h-fit -z-10">
        <path
          fill="#7D53DE"
          fillOpacity="1"
          d="M0,288L40,288C80,288,160,288,240,256C320,224,400,160,480,138.7C560,117,640,139,720,160C800,181,880,203,960,213.3C1040,224,1120,224,1200,208C1280,192,1360,160,1400,144L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </footer>
  );
};

export default Wave;
