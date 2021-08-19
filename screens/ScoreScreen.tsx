import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import config from "../constants/Config";
import Button from "../components/Button";
import Score from "../components/Score";
import Separator from "../components/Separator";

const { numberOfRounds } = config;

export default function ScoreScreen({
  navigation,
  route,
}: StackScreenProps<any, "Score">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You scored</Text>
      <Separator />
      <Score title={`${route.params?.score} / ${numberOfRounds}`} />
      <Separator size={40} />
      <Button title="Play again?" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
