import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import logo from "../../../assets/imgs/logo remove.png";
import "./homepage.scss";

const isMobile = () => {
  return window.innerWidth <= 768; // Ajustez cette valeur selon vos besoins
};

const Homepage = () => {
  const [isAnimatedVisible, setIsAnimatedVisible] = useState(true);
  const [mobileView, setMobileView] = useState(isMobile());

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimatedVisible(false);
    }, 8000);

    const handleResize = () => {
      setMobileView(isMobile());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="home">
      {mobileView ? (
        <div className="mobile-message">
          <h1>Cette application n'est pas concu pour les appareil mobile</h1>
          <p>
            Veuillez utiliser une tablette ou un ordinateur pour utiliser
            l'application.
          </p>
          <DotLottieReact
            className="mobile-anim"
            src="https://lottie.host/d1e1c5a7-ba5d-4285-88c4-55bff2e4c153/IzXybpXjnR.lottie"
            loop
            autoplay
          />
        </div>
      ) : (
        <>
          <div
            className={`info-co ${isAnimatedVisible ? "hidden" : "visible"}`}
          >
            <h1>Veuillez vous connecter</h1>
            <img src={logo} alt="Logo" />
          </div>
          <div
            className={`animate-home ${
              isAnimatedVisible ? "visible" : "hidden"
            }`}
          >
            <DotLottieReact
              src="https://lottie.host/64455a88-f92e-4b87-899e-d2623a2f3ea6/PBZkC7iyAU.lottie"
              autoplay
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;
