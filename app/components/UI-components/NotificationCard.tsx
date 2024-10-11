import Image from "next/image";
import { useVisibility } from "@/lib/hooks/useVisibility";

interface NotificationCardProps {
  text: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ text }) => {
  const isVisible = useVisibility();
  return (
    <div>
      {text === "Data loaded" ? (
        <div>
          {isVisible ? (
            <div
              className="absolute z-40 flex justify-center w-[228px] h-[60px] top-[16px] right-[20px] border rounded border-transparent py-3.5 px-4.5 bg-[#00B1A780]"
              style={{
                borderWidth: "1px",
                borderImageSource:
                  "linear-gradient(180deg, #00B4A8 0%, rgba(0, 180, 168, 0) 100%)",
                borderImageSlice: "1",
              }}
            >
              <Image src="/notificationIcons/check.svg" alt="check icon" width={20} height={20} />
              <p className="text-base m-auto">{text} </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div
          className="absolute z-40 box-border text-center w-[228px] h-[60px] top-[16px] right-[20px] rounded-md border py-3.5 px-4.5 bg-[#FE226480]"
          style={{
            borderWidth: "1px",
            borderImageSource:
              "linear-gradient(180deg, #FF0061 0%, rgba(255, 0, 97, 0) 100%)",
            borderImageSlice: "1",
          }}
        >
          <Image
            src="/notificationIcons/error.svg"
            alt="error icon red"
            width={20} height={20}
          />
          <p className="text-base m-auto">Loading data </p>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
