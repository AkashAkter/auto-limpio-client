import { IService } from "@/types/service";
import { WashingMachineIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";

const ServiceCard = ({ service }: { service: IService }) => {
  return (
    <Card
      style={{
        background:
          "linear-gradient(to bottom right, rgba(30, 30, 30, 0.8), rgba(0, 0, 0, 0.7))", // Dark gradient for black theme
      }}
      className="w-full max-w-sm p-6 grid gap-4 transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-primaryMat"
    >
      <div className="flex items-center gap-4">
        {" "}
        {/* Changed items-start to items-center */}
        <div className="bg-primary rounded-md p-3 flex items-center justify-center">
          <WashingMachineIcon className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-semibold">{service.name}</h3>
      </div>
      <p className="text-slate-300 h-[48px] truncate overflow-hidden whitespace-pre-wrap">
        {service.description}...
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-1">
          <div className="text-sm font-medium">Price</div>
          <div className="text-2xl font-bold">${service.price}</div>
        </div>
        <div className="grid gap-1">
          <div className="text-sm font-medium">Duration</div>
          <div className="text-2xl font-bold text-primaryMat">
            {service.duration} mins
          </div>
        </div>
      </div>
      <Link
        to={`/service/${service._id}`}
        className="w-full text-black bg-primaryMat border-2 border-black hover:bg-black hover:border-2 hover:border-primaryMat hover:text-primaryMat py-[8px] text-center rounded-[8px]"
      >
        Book Now
      </Link>
    </Card>
  );
};

export default ServiceCard;
