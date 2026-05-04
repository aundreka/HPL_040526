import "./App.css";
import logo from "./assets/logo.png";
import title from "./assets/title.png";
import cta from "./assets/cta.png";
import bg from "./assets/bg.png";

// Product card images — adjust imports to match your actual filenames
import image1 from "./assets/IMAGE_1.png";
import image2 from "./assets/IMAGE_2.png";

export default function App() {
  return (
    <div className="page" style={{ backgroundImage: `url(${bg})` }}>
      <div className="content">
        {/* Logo */}
        <div className="logo-wrap">
          <img src={logo} alt="Flutterhabit" className="logo" />
        </div>

        {/* Title */}
        <div className="title-wrap">
          <img src={title} alt="The Glow-Getter Brunette" className="title-img" />
        </div>

        {/* Product Card */}
        <div className="card">
          <div className="card-inner">
            <img src={image1} alt="Product box" className="card-product" />
            <div className="card-comparison">
              <div className="comparison-item">
                <span className="label">Before</span>
                <img src={image2} alt="Before" className="eye-img" />
              </div>
              <div className="comparison-item">
                <span className="label">After</span>
                <img src={image2} alt="After" className="eye-img after" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-wrap">
          <img
            src={cta}
            alt="Shop Now"
            className="cta-btn"
            onClick={() => window.open("https://flutterhabit.com", "_blank")}
          />
        </div>
      </div>
    </div>
  );
}
