import { useEffect, useState } from "react";
import { getBanners } from "../api/api-client";

type Banner = { banner_name: string; banner_image: string };

export function BannerCard() {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    async function fetchBanners() {
      const data = await getBanners();
      setBanners(data.data || []);
    }
    fetchBanners();
  }, []);

  return (
    <section className="space-y-7 px-10">
      <p className="font-medium">Temukan promo menarik</p>
      <div className="flex gap-6 overflow-x-auto space-y-4">
        {banners.map((banner, index) => (
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
