import { motion, useAnimation } from "framer-motion";
import "./Home.css";
import { ArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const controls = useAnimation();

  const navigation = useNavigate();

  const handleHoverEnd = () => {
    controls.start({ scale: 1 });
  };

  function handleRedirectToLogin(e: React.MouseEvent<HTMLDivElement>): void {
    e.preventDefault();
    navigation("/login");
  }

  function handleRedirectToRegister(e: React.MouseEvent<HTMLDivElement>): void {
    e.preventDefault();
    navigation("/register");
  }

  return (
    <div className="gradient-circle">
      <div className="flex h-screen flex-col">
        <nav className="border-b border-white border-opacity-20">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-6 text-lg text-white">
              <div className="text-xl font-medium text-white">Dev Docket</div>
              {/* <div>Features</div> */}
              <a
                href="https://dev-docket.gitbook.io/product-docs/"
                target="_blank"
                rel="noreferrer"
                className="text-white max-sm:hidden"
              >
                Docs
              </a>
            </div>
            <div className="flex items-center">
              <div
                onClick={handleRedirectToLogin}
                className="mr-4 cursor-pointer text-white"
              >
                Login
              </div>
              <div
                onClick={handleRedirectToRegister}
                className="cursor-pointer rounded-full bg-[#5e6ad2] px-3 py-2 text-white transition duration-300 ease-in-out hover:brightness-110"
              >
                Register
              </div>
            </div>
          </div>
        </nav>
        <div className="flex h-full flex-1 items-center justify-center text-center text-white">
          <div className="w-2/3">
            <motion.h1
              className="gradient-text block text-[80px] font-medium leading-[80px] max-md:text-4xl"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "easeInOut",
                stiffness: 100,
                damping: 30,
                duration: 1,
              }}
            >
              Dev Docket is a better way to build products
            </motion.h1>
            <motion.span
              className="my-10 block text-xl max-md:text-base"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "easeInOut",
                stiffness: 100,
                damping: 30,
                duration: 1,
                delay: 0.5,
              }}
            >
              Meet the new standard for modern software development. Streamline
              issues, sprints, and product roadmaps.
            </motion.span>

            <div className="flex justify-center">
              <motion.div
                onClick={handleRedirectToRegister}
                className="mt-5 w-fit rounded-full bg-[#5e6ad2] px-3 py-2 text-white hover:cursor-pointer"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                onHoverEnd={handleHoverEnd}
                transition={{
                  type: "easeInOut",
                  stiffness: 100,
                  damping: 30,
                  duration: 1,
                  delay: 1,
                }}
              >
                Get started <ArrowRight />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
