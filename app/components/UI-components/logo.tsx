import Image from "next/image";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

const Logo = () => {
  const isMobile = useIsMobile();
  return (
    <div className="hidden md:flex md:w-[171px] md:items-center">
      <div className={`relative ${isMobile ? "h-3 w-7" : "h-16 w-16"}`}>
        <Image
          src="/crypto-logo.png"
          alt="a symbol of a chain link"
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="hidden font-[Inter] lg:block lg:text-lg lg:font-bold lg:leading-[1.6rem]">
        CryptoLens
      </div>
    </div>
  );
};

export default Logo;
