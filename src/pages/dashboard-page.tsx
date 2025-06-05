import { ServicesCard } from "../_components/features-card";
import { ProfileBalanceCard } from "../_components/profile-balance-card";
import { BannerCard } from "../_components/promotional-card";

export default function DashboardPage() {
  return (
    <ProfileBalanceCard>
      <ServicesCard />
      <BannerCard />
    </ProfileBalanceCard>
  );
}
