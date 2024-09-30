// import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";

export const RenderNewLine = ({ text }: { text: string }) => {
  return text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};

const HeroSection = () => {
  const backgroundImage =
    "https://images.unsplash.com/photo-1658351354155-e854d19233e0?q=80&w=1455&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Use the desired background image
  const heading = "Premium Car Care";
  const desc =
    "En Auto Limpio vamos más allá de nuestro deber para brindar uncuidado automotriz excepcional. Utilizando métodos de vanguardia.";

  return (
    <div className="relative w-full h-[550px] overflow-hidden mb-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50 p-5">
        <h4 className="text-center font-bold uppercase text-primaryMat tracking-widest">
          Top Class Cleaning
        </h4>
        <h1 className="text-[20px] sm:text-[30px] lg:text-[90px] font-bold text-white capitalize text-center">
          <RenderNewLine text={heading} />
        </h1>
        <p className="max-w-[550px] text-white text-center text-[12px] sm:text-[14px] lg:text-[16px]">
          {desc}
        </p>
        <div className="mt-5">
          <Link
            to="/services"
            className="flex items-center gap-1 px-4 py-2 bg-primaryMat text-white text-[15px] md:text-[25px]"
          >
            BookNow <MdArrowForwardIos />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
