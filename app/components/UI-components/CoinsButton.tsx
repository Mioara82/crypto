import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

const CoinsButton = () => {
  const pathname = usePathname();
  const isActive = pathname === "/";
  return (
    <Link href="/" passHref>
      <Button text="Coins" isActive={isActive} feature="large" />
    </Link>
  );
};

export default CoinsButton;
