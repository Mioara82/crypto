import Image from "next/image";
import { useVisibility } from "@/lib/hooks/useVisibility";

interface NotificationCardProps {
  text: string;
  isSuccess: boolean;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  text,
  isSuccess,
}) => {
  const isVisible = useVisibility();
  return (
    <div>
      {isSuccess ? (
        <div>
          {isVisible ? (
            <div
              className="absolute z-4 flex justify-center w-63 h-15 top-4 right-5 border-1 rounded-md 
               border-t-common-green border-l-common-green border-r-common-green border-b-common-green/5 py-3.5 px-4.5 bg-[#00B1A780] animate-fadeInRight"
            >
              <Image
                src="/notificationIcons/check.svg"
                alt="check icon"
                width={20}
                height={20}
              />
              <p className="text-base m-auto">{text} </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="absolute z-4 flex justify-center w-63 h-15 top-4 right-5 rounded-md border-1 py-3.5 px-4.5 bg-[#FE226480] border-t-common-red border-b-common-red/5 animate-fadeInRight">
          <Image
            src="/notificationIcons/error.svg"
            alt="error icon red"
            width={20}
            height={20}
          />
          <p className="text-base m-auto">{text}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
