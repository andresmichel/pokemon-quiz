import * as React from "react";
import { Image as DefaultImage, StyleSheet } from "react-native";

type ImageProps = {
  visible?: boolean;
};

type ImageComponentProps = ImageProps & DefaultImage["props"];

export default function Image(props: ImageComponentProps) {
  const { visible = true, style, ...otherProps } = props;
  return (
    <DefaultImage
      style={[styles.image, !visible && styles.imageHidden]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 128,
    width: 128,
  },
  imageHidden: {
    tintColor: "#000",
  },
});
