import { useGetServicesQuery } from "@/redux/features/service/service.api";
import { IService } from "@/types/service";
import ServiceCard from "../cards/ServiceCard";

const FeaturedServices = () => {
  const { data } = useGetServicesQuery({});

  // Define the price threshold
  const priceThreshold = 70;

  // Filter services based on price
  const filteredServices = data?.data?.filter(
    (service: IService) => service.price > priceThreshold
  );

  return (
    <div className="w-full bg-black py-[70px] px-[20px]">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-white text-center mb-10">
        Premium Car Wash Services
      </h2>

      {filteredServices?.length && filteredServices.length > 0 ? (
        <div className="griProductResponsive w-full gap-[15px] justify-items-center sm:justify-items-start">
          <>
            {filteredServices.map((service: IService, i: number) => (
              <ServiceCard service={service} key={i + "product"} />
            ))}
          </>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default FeaturedServices;
