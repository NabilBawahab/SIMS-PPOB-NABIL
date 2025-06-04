export function PromotionalCard() {
  type Promotion = {
    image: string;
  };

  const promotions: Promotion[] = [
    {
      image: "/Banner 1.png",
    },
    {
      image: "/Banner 2.png",
    },
    {
      image: "/Banner 3.png",
    },
    {
      image: "/Banner 4.png",
    },
    {
      image: "/Banner 5.png",
    },
  ];
  return (
    <section className="space-y-7 px-10">
      <p className="font-medium">Temukan promo menarik</p>
      <div className="flex gap-6 overflow-x-auto space-y-4">
        {promotions.map((promotion, index) => (
          <div key={index} className="shrink-0">
            <img
              src={promotion.image}
              className="object-contain"
              alt={`Banner Promo ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
