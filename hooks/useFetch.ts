import { useState, useEffect } from "react";
import axios from "axios";

const rapidApiKey = "41631314cbmsh240adb13f35f306p1aeca7jsncb131c4b59fb";

const useFetch = (
  endpoint: string,
  query: any,
  actions: any = { skip: false }
) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { skip } = actions;

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      const data = response?.data?.data || [];
      setData(data);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
