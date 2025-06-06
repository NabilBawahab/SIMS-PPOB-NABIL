import { useGetServicesQuery } from "../store/backend-api";

export function ServicesCard() {
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
