import React from "react";
import { View, Text } from "react-native";

import styles from "./specifics.style";

interface Props {
  title: String;
  points: any[];
}

const Specifics = ({ title, points }: Props) => {
  return (
    <View>
      <Text style={styles.title}>{title}:</Text>

      <View style={styles.pointsContainer}>
        {points.map((item, index) => (
          <View key={item + index} style={styles.pointWrapper}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Specifics;
