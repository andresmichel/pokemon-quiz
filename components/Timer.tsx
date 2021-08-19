import React, { useEffect, useRef, useState } from "react";
import { Circle } from "react-native-progress";

import config from "../constants/Config";

const { limitTimeInSeconds } = config;

export default function Timer(props: any) {
  const intervalRef = useRef<any>(null);
  const [count, setCount] = useState(limitTimeInSeconds);

  useEffect(() => {
    if (count === 0) {
      props.onCompleted();
    } else {
      intervalRef.current = setInterval(() => {
        setCount(count - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [count]);

  useEffect(() => {
    if (props.active) {
      setCount(limitTimeInSeconds);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [props.active]);

  return (
    <Circle
      size={50}
      color="#000"
      progress={count / limitTimeInSeconds}
      showsText={true}
      formatText={() => count}
      thickness={4}
      direction="counter-clockwise"
      strokeCap="round"
      borderWidth={0}
      unfilledColor="#F3F4FF"
      textStyle={{ fontSize: 16, fontWeight: "600" }}
    />
  );
}
