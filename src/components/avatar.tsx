import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export function Avatar() {
  const avatar = createAvatar(personas, {
    seed: "Test",
  });
  const svg = avatar.toDataUri();

  return <img src={svg} className="object-contain w-full h-full" />;
}
