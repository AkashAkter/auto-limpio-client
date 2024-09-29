import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="my-14">
      {/* Extra Banner starts */}
      <div className="relative h-[360px] md:h-[360px] lg:h-[300px] xl:h-[350px]">
        <img
          src="https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_interior_big1.jpg"
          className="absolute inset-0 w-full h-full object-cover object-left"
          alt=""
        />
        <div className="relative bg-gray-900 bg-opacity-70 h-full">
          <div className="flex flex-col lg:flex-row justify-around items-center gap-8 pt-24 lg:pt-24">
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <p className="text-white xl:text-lg font-medium tracking-widest">
                  -----------------
                </p>
              </div>
              <h1 className="text-white text-2xl md:text-4xl xl:text-5xl font-bold">
                Obtain Superior Auto Repair Services
                <br /> Examine Our Offerings.
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/services">
                <button className="px-4 py-3 md:px-6 md:py-4 text-white bg-primary rounded-lg btn-custom font-bold md:text-lg xl:text-xl">
                  ALL SERVICES
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
