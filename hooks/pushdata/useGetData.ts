import { List } from "interfaces";
import { useEffect, useState } from "react";
import TodoModel from "models/todo.model";
import googleServices from "services/googleServices";

const useGetData = () => {
  const [data, setData] = useState<List<TodoModel>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const refetch = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await googleServices.putDataToGGSheet();
        resolve(response);
      } catch (error) {
        setError(error);
        reject(error);
      }
    });
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await googleServices.putDataToGGSheet();
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { data, loading, error, refetch };
};

export default useGetData;
