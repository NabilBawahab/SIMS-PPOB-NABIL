import { Link } from "react-router-dom";
import { useGetServicesQuery } from "../store/backend-api";

export function ServicesCard() {
  const { data: services, error, isLoading } = useGetServicesQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <section className="grid grid-cols-3 md:flex md:justify-between px-6 ">
      {services?.data.map((service, index) => (
        <Link
          key={index}
          to={`/dashboard/transaction/${service.service_code}`}
          className="hover:opacity-60 transition-opacity duration-300"
        >
          <div className="flex flex-col items-center w-24">
            <div className="w-16 h-16">
              <img src={service.service_icon} />
            </div>
            <p className="text-center text-sm text-gray-800 max-w-20 mt-2">
              {service.service_name}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
