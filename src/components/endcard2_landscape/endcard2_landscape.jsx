import { useEffect, useRef, useState } from "react";
import "./endcard2_landscape.css";
import logo from "../../assets/images/landscape/logo.png";
import title from "../../assets/images/landscape/title.png";
import cta from "../../assets/images/landscape/cta.png";
import bg from "../../assets/images/landscape/bg.png";

import image1 from "../../assets/images/landscape/IMAGE_1.png";
import image2 from "../../assets/images/landscape/IMAGE_2.png";
import image3 from "../../assets/images/landscape/IMAGE_3.png";
import image4 from "../../assets/images/landscape/IMAGE_4.png";
import image5 from "../../assets/images/landscape/IMAGE_5.png";
import image6 from "../../assets/images/landscape/IMAGE_6.png";

const IMAGES = [image1, image2, image3, image4, image5, image6];
const INTERVAL = 2000;
const TRANSITION_MS = 700;

export default function EC1L() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);

  const showImage = (nextIndex) => {
    setCurrent((prev) => {
      if (prev === nextIndex) return prev;

      setPrevious(prev);
      setIsTransitioning(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setPrevious(null);
        setIsTransitioning(false);
      }, TRANSITION_MS);

      return nextIndex;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      showImage((current + 1) % IMAGES.length);
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [current]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="page" style={{ backgroundImage: `url(${bg})` }}>
      <div className="left-panel">
        <div className="image-stage" onClick={() => showImage((current + 1) % IMAGES.length)}>
          {previous !== null && isTransitioning ? (
            <div className="stage-slide stage-slide-exit">
              <img src={IMAGES[previous]} alt={`Slide ${previous + 1}`} className="slide-img" />
            </div>
          ) : null}

          <div className={`stage-slide ${isTransitioning ? "stage-slide-enter" : "stage-slide-active"}`}>
            <img src={IMAGES[current]} alt={`Slide ${current + 1}`} className="slide-img" />
          </div>
        </div>

        <div className="dots">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? "dot-active" : ""}`}
              onClick={() => showImage(i)}
            />
          ))}
        </div>
      </div>

      <div className="right-panel">
        <img src={logo} alt="Flutterhabit" className="logo" />
        <img src={title} alt="The Glow-Getter Brunette" className="title-img" />
        <img
          src={cta}
          alt="Shop Now"
          className="cta-btn"
          onClick={() => window.open("https://flutterhabit.com", "_blank")}
        />
      </div>
    </div>
  );
}
