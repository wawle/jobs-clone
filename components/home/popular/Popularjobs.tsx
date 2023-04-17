import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SIZES, COLORS } from "../../../constants";
import styles from "./popularjobs.style";
import { useRouter } from "expo-router";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hooks/useFetch";

const Popularjobs = () => {
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch(
    "search",
    {
      query: "React developer",
      num_pages: 1,
    },
    { skip: true }
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            horizontal
            keyExtractor={(item) => item?.job_id}
            data={data}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            renderItem={({ item }) => (
              <PopularJobCard
                key={item}
                item={item}
                selectedJob=""
                handlePress={() => {}}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
