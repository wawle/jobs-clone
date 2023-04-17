import React from "react";
import { TouchableOpacity, Image } from "react-native";
import styles from "./screenheader.style";

interface Props {
  iconUrl: any;
  dimension: string;
  handlePress?: () => void;
}

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }: Props) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.btnContainer}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={(styles as any).btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
