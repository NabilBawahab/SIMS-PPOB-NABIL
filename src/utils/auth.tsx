import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export function useAuth() {
  const token = useSelector((state: RootState) => state.auth.token);

  return token;
}
