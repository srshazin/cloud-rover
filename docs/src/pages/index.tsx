import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import Hero from "../components/HomepageFeatures/Hero";
import "./style.css";
export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      {/* <HomepageHeader /> */}
      <main>
        <Hero />
        <footer className="footer-main">
          Made with{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 47.5 47.5"
            id="heart"
          >
            <defs>
              <clipPath id="a">
                <path d="M0 38h38V0H0v38Z"></path>
              </clipPath>
            </defs>
            <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
              <path
                fill="#dd2e44"
                d="M3.067 25.68c0 8.799 12.184 12.06 15.933 1.874 3.749 10.186 15.933 6.925 15.933-1.874C34.933 16.12 19 3.999 19 3.999S3.067 16.12 3.067 25.68"
              ></path>
            </g>
          </svg>{" "}
          By <a href="http://shazin.me">Shazin</a>
        </footer>
      </main>
    </Layout>
  );
}
