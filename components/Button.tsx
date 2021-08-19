import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";

type ButtonProps = {
  title: string;
};

type ButtonComponentProps = ButtonProps & TouchableOpacity["props"];

export default function Button(props: ButtonComponentProps) {
  const { title, style, onPress, ...otherProps } = props;
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={(event) => {
        if (onPress) {
          Haptics.impactAsync();
          onPress(event);
        }
      }}
      {...otherProps}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 21,
    height: 42,
    width: 240,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    fontWeight: "600",
    textTransform: "capitalize",
    color: "white",
    fontSize: 16,
  },
});
