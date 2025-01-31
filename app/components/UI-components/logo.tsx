import Image from "next/image";

const Logo = () => {
  return (
    <div className="hidden md:flex md:w-[171px] md:items-center md:gap-2">
      <div className="relative h-5 w-9">
        <Image
          src="/logo.svg"
          alt="a symbol of a chain link"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="hidden font-[Inter] xl:block xl:text-base xl:font-bold xl:leading-[1.6rem]">
        Logoipsm
      </div>
    </div>
  );
};

export default Logo;
