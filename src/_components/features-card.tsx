import { useEffect, useState } from "react";
import { getServices } from "../api/api-client";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useAuth } from "../utils/auth";
import { useGetServicesQuery } from "../store/backend-api";

type Service = {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
};

export function ServicesCard() {
  // const [services, setServices] = useState<Service[]>([]);

  // const token = useAuth();

  // useEffect(() => {
  //   async function fetchServices() {
  //     const data = await getServices(token);
  //     setServices(data.data || []);
  //   }
  //   fetchServices();
  // }, [token]);

  const { data: services, error, isLoading } = useGetServicesQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <section className="flex justify-between px-6">
      {services?.data.map((service, index) => (
        <div key={index} className="flex flex-col items-center w-24">
          <div className="w-16 h-16">
            <img src={service.service_icon} />
          </div>
          <p className="text-center text-sm text-gray-800 max-w-20 mt-2">
            {service.service_name}
          </p>
        </div>
      ))}
    </section>
  );
}
