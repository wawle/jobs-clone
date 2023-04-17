import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { COLORS, icons, SIZES } from "../../../constants";
import styles from "./welcome.style";
import { useRouter } from "expo-router";

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
}

const Welcome = ({ searchTerm, setSearchTerm, handleClick }: Props) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");
  const cStyles: any = styles;

  const onJobSelect = useCallback((item: string) => {
    setActiveJobType(item);
    router.push(`/search/${item}`);
  }, []);

  return (
    <View>
      <View style={cStyles.container}>
        <Text style={cStyles.userName}>Hello Berkay</Text>
        <Text style={cStyles.userName}>Find your perfect job</Text>
      </View>

      <View style={cStyles.searchContainer}>
        <View style={cStyles.searchWrapper}>
          <TextInput
            style={cStyles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="What are you looking for?"
          />
        </View>

        <TouchableOpacity style={cStyles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={cStyles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={cStyles.tabsContainer}>
        <FlatList
          horizontal
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item}
              style={cStyles.tab(activeJobType, item)}
              onPress={() => onJobSelect(item)}
            >
              <Text style={cStyles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const jobTypes = ["Full-time", "Part-time", "Contractor"];

export default Welcome;
