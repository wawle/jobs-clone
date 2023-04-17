import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SIZES } from "../../../constants";
import styles from "./tabs.style";
import { FlatList } from "react-native-gesture-handler";

interface Props {
  tabs: string[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs = ({ tabs, activeTab, setActiveTab }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        keyExtractor={(item) => item}
        horizontal
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.small }}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
      />
    </View>
  );
};

interface ButtonProps {
  name: string;
  activeTab: string;
  onHandleSearchType: () => void;
}

const TabButton = ({ name, activeTab, onHandleSearchType }: ButtonProps) => {
  const cStyles: any = styles;
  return (
    <TouchableOpacity
      style={cStyles.btn(name, activeTab)}
      onPress={onHandleSearchType}
    >
      <Text style={cStyles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Tabs;
