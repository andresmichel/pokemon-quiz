import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

type ScoreProps = {
  title: string;
};

type ScoreComponentProps = ScoreProps & View["props"];

export default function Score(props: ScoreComponentProps) {
  const { title, style, ...otherProps } = props;
  return (
    <View style={[styles.container, style]} {...otherProps}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: 40,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    color: "#626B82",
    fontSize: 18,
  },
});
