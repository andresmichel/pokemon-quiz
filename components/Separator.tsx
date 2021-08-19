import * as React from "react";
import { View } from "react-native";

type SeparatorProps = {
  size?: number;
};

type SeparatorComponentProps = SeparatorProps & View["props"];

export default function Separator(props: SeparatorComponentProps) {
  const { size = 30, style, ...otherProps } = props;
  return <View style={{ height: size }} {...otherProps} />;
}
