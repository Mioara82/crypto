import Image from "next/image";

const Logo = () => {
  return (
    <div className="hidden md:flex md:w-[171px] md:items-center md:gap-2">
      <Image
        src="/logo.svg"
        alt="a symbol of a chain link"
        width={36}
        height={21}
      />
      <div className="hidden font-[Inter] md:text-[21px] md:font-bold md:leading-[1.6rem] lg:block">
        Logoipsm
      </div>
    </div>
  );
};

export default Logo;
