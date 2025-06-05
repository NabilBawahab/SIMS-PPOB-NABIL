import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export function Avatar({ imageUrl, userFullName }: any) {
  const avatar = createAvatar(personas, {
    seed: userFullName,
  });
  const svg = avatar.toDataUri();

  return <img src={svg} className="object-contain w-full h-full" />;
}
