import Meta from "./Meta";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect } from "react";

/**
 * Layout
 *
 * @param {JSX.Element} children
 */
export default function Layout({ children }) {
  const router = useRouter();
  const variants = {
    hidden: { opacity: 0, x: -100, y: 0, duration: 2 },
    enter: { opacity: 1, x: 0, y: 0, duration: 2 },
    exit: { opacity: 0, x: 100, y: 0, duration: 2 },
  };
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-5RFDBR98MZ", {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: window.document.title,
    });
  }, []);
  return (
    <>
      <div style={{ background: "var(--mid-sec)" }}>
        <Meta />
        <Header />
        <Navbar />
      </div>
      <AnimateSharedLayout>
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <PageContent
            as={motion.main}
            key={router.route}
            className="page-content"
            variants={variants} // Pass the variant object into Framer Motion
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit" // Exit state (used later) to variants.exit
            transition={{ type: "linear" }} // Set the transition to linear
          >
            {children}
          </PageContent>
        </AnimatePresence>
      </AnimateSharedLayout>
      <Footer />
    </>
  );
}

const PageContent = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  max-width: 90%;
  padding: 0 20px;

  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  min-height: inherit;
  --text-ratio: 1;
  @media only screen and (max-width: 480px) {
    --text-ratio: 0.9;
    max-width: 100%;
    padding: 0 5px;
  }
  font-size: calc(21px * var(--text-ratio));
`;
