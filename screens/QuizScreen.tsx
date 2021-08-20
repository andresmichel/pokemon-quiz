import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useSpring, animated } from "@react-spring/native";

import { getRandomInt } from "../utils";
import config from "../constants/Config";
import Button from "../components/Button";
import Image from "../components/Image";
import Loading from "../components/Loading";
import Timer from "../components/Timer";
import Separator from "../components/Separator";

type Data = {
  name: string;
  url: string;
};

type AnswerData = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
};

const { numberOfPokemons, numberOfRounds, numberOfChoices } = config;

export default function QuizScreen({
  navigation,
}: StackScreenProps<any, "Quiz">) {
  const timeoutRef = useRef<any>();
  const [data, setData] = useState<Data[]>([]);
  const [options, setOptions] = useState<Data[]>([]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [answer, setAnswer] = useState<AnswerData>();
  const [score, setScore] = useState<number>(0);
  const [count, setCount] = useState<number>(1);

  const [{ opacity, scale }, springApi] = useSpring(() => ({
    opacity: 1,
    scale: 1,
    from: { opacity: 0, scale: 0.9 },
  }));

  useEffect(() => {
    const getQuizData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemons}`
      );
      const data = await response.json();
      setData(data.results);
    };
    getQuizData();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (data.length) {
      springApi.start({ opacity: 0, scale: 0.9, onRest: nextQuiz });
    }
  }, [data]);

  const handleOnPress = (value: string) => {
    const isCorrect = answer?.name === value;

    setShowAnswer(true);
    setCount(count + 1);
    if (isCorrect) {
      setScore(score + 1);
    }
    timeoutRef.current = setTimeout(() => {
      if (count === numberOfRounds) {
        navigation.navigate("Score", { score: score + 1 });
      } else {
        springApi.start({ opacity: 0, scale: 0.9, onRest: nextQuiz });
      }
    }, 2000);
  };

  const nextQuiz = async () => {
    setIsReady(false);

    const optionsIndex = [];
    for (let i = 0; i < numberOfChoices; i++) {
      optionsIndex.push(getRandomInt(0, data.length));
    }
    const answerIndex = getRandomInt(0, numberOfChoices);
    const options = optionsIndex
      .map((index) => data[index])
      .sort((a, b) => a.name.localeCompare(b.name));

    const response = await fetch(options[answerIndex].url);
    const answerData = await response.json();

    setOptions(options);
    setAnswer(answerData);
    setShowAnswer(false);

    timeoutRef.current = setTimeout(() => {
      springApi.start({
        opacity: 1,
        scale: 1,
        onRest: () => {
          setIsReady(true);
        },
      });
    }, 1000);
  };

  if (!options.length) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Timer active={!showAnswer} onCompleted={() => handleOnPress("")} />
      <Separator />
      <animated.View style={[styles.quiz, { opacity, transform: [{ scale }] }]}>
        <Image
          visible={showAnswer}
          source={{ uri: answer?.sprites.front_default }}
        />
        <Separator />
        {options.map((pokemon: any, index: number) => {
          const isCorrect = pokemon.name === answer?.name;
          const showSuccessButton = showAnswer && isCorrect;
          return (
            <Button
              style={[styles.button, showSuccessButton && styles.buttonSuccess]}
              key={index}
              title={pokemon.name}
              disabled={showAnswer || !isReady}
              onPress={() => handleOnPress(pokemon.name)}
            />
          );
        })}
        <Separator />
        <Text style={styles.score}>
          {`${score} / ${config.numberOfRounds}`}
        </Text>
      </animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  quiz: {
    alignItems: "center",
  },
  button: {
    marginBottom: 15,
  },
  buttonSuccess: {
    backgroundColor: "#57D3AE",
  },
  score: {
    fontWeight: "bold",
    color: "#aaa",
    fontSize: 16,
  },
});
