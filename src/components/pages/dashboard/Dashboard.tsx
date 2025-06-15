import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import Loading from "../../app/loading/Loading";
import DashboardPreview from "./dashboard-preview/DashboardPreview";
import Profile from "../../app/profile/Profile";

interface EnterpriseData {
  id: number;
  name: string;
  logourl: string;
  phone: string;
  instagram: string;
  twitter: string;
  facebook: string;
  tictoc: string;
}

const Dashboard: React.FC = () => {
  const [enterpriseData, setEnterpriseData] = useState<EnterpriseData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const decodeToken = (token: string) => {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchEnterpriseData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const decodedToken = decodeToken(token);
        if (!decodedToken || !decodedToken.id) {
          throw new Error("Invalid token or missing enterprise ID");
        }

        const enterpriseId = decodedToken.id;

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/enterprise/${enterpriseId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch enterprise data");
        }

        const data = await response.json();
        setEnterpriseData(data);
      } catch (error) {
        console.error("Error fetching enterprise data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchEnterpriseData();
  }, []);

  if (loading || !enterpriseData) {
    return <Loading />;
  }

  return (
    <div className="dashboard">
      <div className="info">
        <Profile enterpriseData={enterpriseData} />
      </div>
      <DashboardPreview />
    </div>
  );
};

export default Dashboard;
