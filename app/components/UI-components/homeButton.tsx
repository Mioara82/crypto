import HomeIcon from "@/app/icons/homeIcon";

const HomeButton = () => {
  return (
    <div className="flex items-center w-[110px] gap-2">
      <HomeIcon />
      <div className="leading-[20.42px] text-base hover:cursor-fancy">Home</div>
    </div>
  );
};

export default HomeButton;
