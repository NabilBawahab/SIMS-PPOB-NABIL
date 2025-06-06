import { useGetBannersQuery } from "../store/backend-api";

export function BannerCard() {
  const { data: banners, error, isLoading } = useGetBannersQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <section className="space-y-7 px-10">
      <p className="font-medium">Temukan promo menarik</p>
      <div className="flex gap-6 overflow-x-auto space-y-4">
        {banners?.data.map((banner, index) => (
          <div key={index} className="shrink-0">
            <img
              src={banner.banner_image}
              className="object-contain w-96"
              alt={banner.banner_name}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
