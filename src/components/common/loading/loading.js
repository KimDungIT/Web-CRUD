import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import LoadingOverlay from "react-loading-overlay";
import BeatLoader from "react-spinners/BeatLoader";

const LoadingSpinerComponent = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <LoadingOverlay
      active={promiseInProgress}
      spinner={<BeatLoader size={14} margin={2} color={'#25C6DA'} />}
    ></LoadingOverlay>
  );
};

export default LoadingSpinerComponent;
