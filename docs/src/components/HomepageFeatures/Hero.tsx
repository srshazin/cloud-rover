import Link from "@docusaurus/Link";
import "./hero.css";

const Hero = () => {
  return (
    <section className="section-hero">
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      <div className="hero-content">
        <div className="hero-title">Cloud Rover</div>
        <div className="hero-sub-title">
          Redefining backend possibilities on Cloudflare Workers.
        </div>
        <div className="hero-logo">
          <img src="img/logo.svg" alt="" />
        </div>

        <div className="hero-start">
          <Link to={"/docs/intro"}>
            <button className="h-btn-start">Get Started</button>
          </Link>
          <div className="h-start-snippet">
            <code>$ npm i cloud-rover</code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
