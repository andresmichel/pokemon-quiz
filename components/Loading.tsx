import * as React from "react";
import { Circle } from "react-native-progress";

export default function Loading() {
  return (
    <Circle
      size={50}
      color="#000"
      indeterminate
      strokeCap="round"
      borderWidth={4}
    />
  );
}
