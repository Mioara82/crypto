import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

const ConverterButton = () => {
  const pathname = usePathname();
  const isActive = pathname === "/Converter";
  return (
    <Link href="/Converter" passHref>
      <Button text="Converter" isActive={isActive} feature="large" />
    </Link>
  );
};

export default ConverterButton;
