import { askFunk } from "@/api";
import { useEffect, useState } from "react";

const Charities = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await askFunk();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  console.log(result);
  return result;
};

export default Charities;
