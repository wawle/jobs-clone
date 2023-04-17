import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

import styles from "./nearbyjobs.style";
import { useRouter } from "expo-router";
import useFetch from "../../../hooks/useFetch";
import { COLORS, SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const Nearbyjobs = () => {
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
        <Text style={styles.headerTitle}>Nearby jobs</Text>
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
          data.map((item) => (
            <NearbyJobCard
              key={`nearby-job-${item?.job_id}`}
              item={item}
              handlePress={() => router.push(`/job-details/${item?.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
