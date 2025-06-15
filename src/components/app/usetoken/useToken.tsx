import { useState, useEffect } from "react";

const useToken = () => {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = () => {
      const token = sessionStorage.getItem("token");
      setUserToken(token);
    };

    const handleStorageChange = () => {
      getToken();
    };

    getToken();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return userToken;
};

export default useToken;
