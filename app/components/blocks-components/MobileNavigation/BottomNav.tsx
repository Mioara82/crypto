import Search from "../search";
import CurrencySelector from "../currencySelector";
import AuthHeader from "@/app/auth/authHeader";

export const BottomNav = () => {
  return (
    <div className="background-blur-sm flex w-full items-center justify-around py-2 gap-2">
      <Search />
      <div className="flex items-center justify-center gap-2 ml-auto">
        <CurrencySelector />
        <AuthHeader />
      </div>
    </div>
  );
};
