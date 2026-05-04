import { useEffect, useRef, useState } from "react";
import "./endcard1_portrait.css";
import { useSound } from "../../hooks/useSound";
import clickSfx from "../../assets/sfx/click.wav";
import popSfx from "../../assets/sfx/pop.mp3";
import logo from "../../assets/images/portrait/logo.png";
import title from "../../assets/images/portrait/title.png";
import cta from "../../assets/images/portrait/cta.png";
import bg from "../../assets/images/portrait/bg.png";

import image1 from "../../assets/images/portrait/IMAGE_1.png";
import image2 from "../../assets/images/portrait/IMAGE_2.png";
import image3 from "../../assets/images/portrait/IMAGE_3.png";
import image4 from "../../assets/images/portrait/IMAGE_4.png";
import image5 from "../../assets/images/portrait/IMAGE_5.png";
import image6 from "../../assets/images/portrait/IMAGE_6.png";

const IMAGES = [image1, image2, image3, image4, image5, image6];
const INTERVAL = 2000;
const ANGLE_STEP = 360 / IMAGES.length;
const ROTATION_DURATION = 420;
const SITE_URL = "https://flutterhabit.com";

function getNormalizedIndex(value, total) {
  return ((value % total) + total) % total;
}

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 2.9 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2.7) / 2;
}

function getSlideStyle(index, displayStep) {
  const relativeStep = index - displayStep;
  const relativeAngle = relativeStep * ANGLE_STEP;
  const radians = (relativeAngle * Math.PI) / 180;
  const depth = (Math.cos(radians) + 1) / 2;
  const scale = 0.54 + depth * 0.58;
  const opacity = 0.24 + depth * 0.76;

  return {
    "--slide-angle": `${relativeAngle}deg`,
    "--slide-scale": scale,
    "--slide-opacity": opacity,
    "--slide-depth": Math.round(depth * 1000),
    "--slide-brightness": 0.45 + depth * 0.55,
    "--slide-saturation": 0.16 + depth * 0.84,
    "--slide-grayscale": 1 - depth,
  };
}

export default function Endcard1Portrait() {
  const [targetStep, setTargetStep] = useState(0);
  const [displayStep, setDisplayStep] = useState(0);
  const playClick = useSound(clickSfx, 0.45);
  const playPop = useSound(popSfx, 0.45);
  const hasMountedRef = useRef(false);
  const animationFrameRef = useRef(0);
  const displayStepRef = useRef(0);
  const current = getNormalizedIndex(targetStep, IMAGES.length);

  const openSite = () => {
    playClick();
    window.open(SITE_URL, "_blank");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTargetStep((prev) => prev + 1);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    playPop();
  }, [targetStep, playPop]);

  useEffect(() => {
    const startStep = displayStepRef.current;
    const stepDelta = targetStep - startStep;

    if (Math.abs(stepDelta) < 0.001) {
      return undefined;
    }

    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / ROTATION_DURATION, 1);
      const eased = easeInOutCubic(progress);
      const nextStep = startStep + stepDelta * eased;

      displayStepRef.current = nextStep;
      setDisplayStep(nextStep);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      displayStepRef.current = targetStep;
      setDisplayStep(targetStep);
    };

    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [targetStep]);

  return (
    <div className="page" style={{ backgroundImage: `url(${bg})` }}>
      <div className="content">

        {/* Logo */}
        <img src={logo} alt="Flutterhabit" className="logo" onClick={openSite} />

        {/* Title */}
        <img
          src={title}
          alt="The Glow-Getter Brunette"
          className="title-img"
          onClick={openSite}
        />

        {/* Carousel */}
        <div className="carousel-viewport">
          <div className="carousel-track">
            {IMAGES.map((img, i) => {
              return (
                <div
                  key={i}
                  className={`carousel-slide ${i === current ? "active" : ""}`}
                  style={getSlideStyle(i, displayStep)}
                  onClick={openSite}
                >
                  <div className="slide-face slide-face-front">
                    <img src={img} alt={`Product ${i + 1}`} className="slide-img" />
                  </div>
                  <div className="slide-face slide-face-back" aria-hidden="true">
                    <img src={img} alt="" className="slide-img" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="dots">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? "dot-active" : ""}`}
              onClick={() => setTargetStep((prev) => prev + getNormalizedIndex(i - current, IMAGES.length))}
            />
          ))}
        </div>

        {/* CTA */}
        <img
          src={cta}
          alt="Shop Now"
          className="cta-btn"
          onClick={openSite}
        />
      </div>
    </div>
  );
}
