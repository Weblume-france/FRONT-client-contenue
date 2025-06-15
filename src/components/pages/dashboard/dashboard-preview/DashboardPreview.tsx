import { useEffect, useState } from "react";

const DashboardPreview = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");

  const decodeToken = (token: string) => {
    try {
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));
      // console.log(decodedPayload);

      return decodedPayload.website; // Assurez-vous que le token contient bien l'URL sous cette clé
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token"); // Récupérer le token depuis le stockage de session
    if (token) {
      const url = decodeToken(token);
      if (url) {
        setWebsiteUrl(url);
      } else {
        console.error("No URL found in token");
      }
    } else {
      console.error("No token found");
    }
  }, []);

  return (
    <div style={{ width: "25%", height: "80vh", borderRadius: "50px" }}>
      {websiteUrl ? (
        <iframe
          src={websiteUrl}
          title="site de client"
          width="100%"
          height="100%"
          style={{ border: "none", borderRadius: "50px" }}
        />
      ) : (
        <p>Loading website...</p>
      )}
    </div>
  );
};

export default DashboardPreview;
