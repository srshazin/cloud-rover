import "./hero.css";

const Hero = () => {
  return (
    <section className="section-hero">
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      <div className="hero-content">
        <div className="hero-title">Cloud Rover</div>
        <div className="hero-sub-title">
          We take care of the underlying stuffs, Cloudflare takes care of the
          scaling while YOU focus on The product
        </div>
        <div className="hero-logo">
          <img src="img/logo.svg" alt="" />
        </div>

        <div className="hero-start">
          <button className="h-btn-start">Get Started</button>
          <div className="h-start-snippet">
            <code>npx cloud-rover init</code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
