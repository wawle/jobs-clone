import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { Fragment, useCallback, useMemo, useState } from "react";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hooks/useFetch";

const JobDetailScreen = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("About");

  const { data, isLoading, error, refetch } = useFetch(
    "job-details",
    {
      job_id: params.id,
    },
    { skip: false }
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const {
    companyLogo,
    jobTitle,
    jobDescription,
    companyName,
    location,
    qualifications,
    responsibilities,
    url,
  } = useMemo(() => {
    if (data && data.length > 0) {
      const item = data[0];
      return {
        companyLogo: item.employer_logo,
        jobTitle: item.job_title,
        jobDescription: item.job_description ?? "No data provided",
        companyName: item.employer_name,
        location: item.job_country,
        qualifications: item.job_highlights?.Qualifications ?? ["N/A"],
        responsibilities: item.job_highlights?.Responsibilities ?? ["N/A"],
        url: item?.job_google_link ?? "https://careers.google.com/jobs/results",
      };
    }
    return {
      companyLogo: "",
      jobTitle: "",
      jobDescription: "No data provided",
      companyName: "",
      location: "",
      qualifications: ["N/A"],
      responsibilities: ["N/A"],
      url: "https://careers.google.com/jobs/results",
    };
  }, [data]);

  const displayTabContent = useCallback(() => {
    switch (activeTab) {
      case "Qualifications":
        return <Specifics title="Qualifications" points={qualifications} />;
      case "About":
        return <JobAbout info={jobDescription} />;
      case "Responsibilities":
        return <Specifics title="Responsibilities" points={responsibilities} />;
      default:
        break;
    }
  }, [activeTab, qualifications, jobDescription, responsibilities]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <Fragment>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data found</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyName={companyName}
                companyLogo={companyLogo}
                jobTitle={jobTitle}
                location={location}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter url={url} />
      </Fragment>
    </SafeAreaView>
  );
};

const tabs = ["About", "Qualifications", "Responsibilities"];

export default JobDetailScreen;
