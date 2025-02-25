import React from "react";

type IProps = {};

const LoadingPage: React.FC<IProps> = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="text-[3rem]">Loading....</h1>
    </div>
  );
};

export default LoadingPage;
