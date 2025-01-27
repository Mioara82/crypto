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
            <div className="z-4 border-1 absolute right-5 top-4 flex h-15 w-63 animate-fadeInRight justify-center rounded-md border-b-common-green/5 border-l-common-green border-r-common-green border-t-common-green bg-[#00B1A780] px-4.5 py-3.5">
              <Image
                src="/notificationIcons/check.svg"
                alt="check icon"
                width={20}
                height={20}
                style={{ width: "auto", height: "auto" }}
              />
              <p className="m-auto text-base">{text} </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          {isVisible ? (
            <div className="z-4 border-1 absolute right-5 top-4 flex h-15 w-63 animate-fadeInRight justify-center rounded-md border-b-common-red/5 border-t-common-red bg-[#FE226480] px-4.5 py-3.5">
              <Image
                src="/notificationIcons/error.svg"
                alt="error icon red"
                width={20}
                height={20}
                style={{ width: "auto", height: "auto" }}
              />
              <p className="m-auto text-base">{text}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
