import { useState, useEffect } from "react";
import styles from "../styles/loading-dots.module.css";

type Props = {
  color?: string;
  style?: string;
  time: number; // time in seconds
};

const LoadingDots = ({ color = "#000", style = "small", time }: Props) => {
  const [secondsRemaining, setSecondsRemaining] = useState(time);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {secondsRemaining <= 0 ? (
        <span>Request delivered!</span>
      ) : (
        <span className={style == "small" ? styles.loading2 : styles.loading}>
          <span style={{ backgroundColor: color }} />
          <span style={{ backgroundColor: color }} />
          <span style={{ backgroundColor: color }} />
        </span>
      )}
      {secondsRemaining > 0 && <span>{` ${secondsRemaining} seconds`}</span>}
    </>
  );
};

export default LoadingDots;

LoadingDots.defaultProps = {
  style: "small",
};
