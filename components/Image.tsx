import * as React from "react";
import { View, Image as DefaultImage, StyleSheet } from "react-native";

type ImageProps = {
  visible?: boolean;
};

type ImageComponentProps = ImageProps & DefaultImage["props"];

export default function Image(props: ImageComponentProps) {
  const { visible = true, style, ...otherProps } = props;
  return (
    <View style={styles.container}>
      <DefaultImage
        style={[styles.image, style, styles.imageTint]}
        {...otherProps}
      />
      <DefaultImage
        style={[styles.image, style, { opacity: visible ? 1 : 0 }]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 128,
    width: 128,
  },
  image: {
    position: "absolute",
    height: 128,
    width: 128,
  },
  imageTint: {
    tintColor: "#000",
  },
});
