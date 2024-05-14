import LogoIcon from "@/app/icons/logoIcon";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 w-[171px]">
      <LogoIcon />
      <div className="font-[Inter] font-bold leading-[1.6rem] text-[21px]">
        Logoipsm
      </div>
    </div>
  );
};

export default Logo;
