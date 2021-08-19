import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useSpring, animated } from "@react-spring/native";

import Button from "../components/Button";
import Separator from "../components/Separator";
import logo from "../assets/images/logo.png";

export default function HomeScreen({
  navigation,
}: StackScreenProps<any, "Home">) {
  const [animatedScale, api] = useSpring(() => ({
    scale: 1,
    from: { scale: 0.8 },
    config: { tension: 500, friction: 5 },
  }));

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={() => api.start({ scale: 0.8 })}
        onPressOut={() => api.start({ scale: 1 })}
      >
        <animated.Image
          style={[styles.logo, { transform: [animatedScale] }]}
          source={logo}
        />
      </Pressable>
      <Separator />
      <Text style={styles.title}>{"Welcome to the\nPokemon Quiz"}</Text>
      <Separator />
      <Text style={styles.label}>You will be presented with 10 quizzes</Text>
      <Text style={styles.label}>Can you score 100%?</Text>
      <Separator />
      <Button title="Start" onPress={() => navigation.navigate("Quiz")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 128,
    width: 128,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});
