import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { COLORS, icons } from "../../../constants";
import styles from "./footer.style";

interface Props {
  url: string;
}

const Footer = ({ url }: Props) => {
  const [like, setLike] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          ...styles.likeBtn,
          backgroundColor: like ? COLORS.red : "transparent",
        }}
        onPress={() => setLike((prev) => !prev)}
      >
        <Image
          source={icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
