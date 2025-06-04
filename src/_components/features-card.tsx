import { href, Link } from "react-router-dom";

export function FeaturesCard() {
  type Feature = {
    image: string;
    detail: string;
    href: string;
  };

  const features: Feature[] = [
    {
      image: "/PBB.png",
      detail: "PBB",
      href: "/",
    },
    {
      image: "/Listrik.png",
      detail: "Listrik",
      href: "/",
    },
    {
      image: "/Pulsa.png",
      detail: "Pulsa",
      href: "/",
    },
    {
      image: "/PDAM.png",
      detail: "PDAM",
      href: "/",
    },
    {
      image: "/PGN.png",
      detail: "PGN",
      href: "/",
    },
    {
      image: "/Televisi.png",
      detail: "TV Langganan",
      href: "/",
    },
    {
      image: "/Musik.png",
      detail: "Musik",
      href: "/",
    },
    {
      image: "/Game.png",
      detail: "Voucher Game",
      href: "/",
    },
    {
      image: "/Voucher Makanan.png",
      detail: "Voucher Makanan",
      href: "/",
    },
    {
      image: "/Kurban.png",
      detail: "Kurban",
      href: "/",
    },
    {
      image: "/Zakat.png",
      detail: "Zakat",
      href: "/",
    },
    {
      image: "/Paket Data.png",
      detail: "Paket Data",
      href: "/",
    },
  ];
  return (
    <section className="flex justify-between px-6">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center w-24">
          <Link to={feature.href}>
            <div className="w-16 h-16">
              <img src={feature.image} />
            </div>
          </Link>
          <p className="text-center text-sm text-gray-800 max-w-20 mt-2">
            {feature.detail}
          </p>
        </div>
      ))}
    </section>
  );
}
