import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export function Avatar({ userFullName, imageUrl }: any) {
  const avatar = createAvatar(personas, {
    seed: userFullName,
  });
  const svg = avatar.toDataUri();

  return (
    <img
      src={
        imageUrl === "https://minio.nutech-integrasi.com/take-home-test/null"
          ? svg
          : imageUrl
      }
      className="object-contain w-full h-full"
    />
  );
}
