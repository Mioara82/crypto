import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 w-[171px]">
      <Image src="/logo.svg" alt="a symbol of a chain link" width={36} height={21}/>
      <div className="font-[Inter] font-bold leading-[1.6rem] text-[21px]">
        Logoipsm
      </div>
    </div>
  );
};

export default Logo;
