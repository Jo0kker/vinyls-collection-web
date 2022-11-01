import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import NavBar from "@components/NavBar";
import Lottie from "lottie-react";
import vinylsAnimation from "@assets/lottieJson/17807-sound-animation.json";
import Banner from "@components/Banner";
import { FooterPerso } from "@components/FooterPerso";

type Props = PropsWithChildren<{}>;

export const Layout: FunctionComponent<Props> = ({ children }) => {
  const tawkTo = () => {
    const tawk = document.createElement("script");
    tawk.type = "text/javascript";
    tawk.async = true;
    tawk.src = "https://embed.tawk.to/624bef4a2abe5b455fc4d655/1fvs9tf84";
    tawk.setAttribute("crossorigin", "*");
    document.body.appendChild(tawk);
  };

  useEffect(() => {
    tawkTo();
  }, []);

  return (
    <div
      className={
        "bg-gradient-to-tr from-fuchsia-900 via-fuchsia-900 to-fuchsia-800 w-auto min-h-screen"
      }
    >
      <NavBar />
      <div className={"flex justify-center mb-28 drop-shadow-2xl"}>
        <h1
          className={
            "leading-relaxed flex flex-col mt-8 items-center text-white font-bold z-10 drop-shadow-2xl shadow-blue-600"
          }
        >
          <Lottie
            animationData={vinylsAnimation}
            className={
              "sm:w-96 w-56 absolute sm:-top-[89px] opacity-50 -top-11 -z-10"
            }
          />
          <span
            className={
              "font-black text-transparent text-5xl pb-5 leading-relaxed sm:text-8xl bg-clip-text bg-gradient-to-l bgr from-red-500 via-yellow-500 to-blue-800"
            }
          >
            Vinyls
          </span>
          <br />
          Collection
        </h1>
      </div>
      <Banner />
      <main className={"flex flex-col items-center"}>
        <div
          className={
            "flex flex-col items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          }
        >
          <div
            className={
              "flex flex-col justify-center bg-black bg-opacity-10 p-3 mb-8 rounded"
            }
          >
            {children}
            <FooterPerso />
          </div>
        </div>
      </main>
    </div>
  );
};
