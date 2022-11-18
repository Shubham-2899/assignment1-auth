import axios from "axios";
import { useEffect, useState } from "react";
import { IProduct } from "../Interfaces";

const useFetch = (url: string) => {
  const [content, setContent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: useFetch.tsx ~ line 24 ~ useEffect ~ error",
          error
        );
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [url]);

  return { content: content, isLoading, error };
};

export default useFetch;
