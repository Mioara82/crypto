import Image from "next/image";
import { useVisibility } from "@/lib/hooks/useVisibility";

interface NotificationCardProps {
  text: string;
  isSuccess?: boolean;
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
              <div className="relative h-5 w-5">
                <Image
                  src="/notificationIcons/check.svg"
                  alt="check icon"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <p className="m-auto text-base">{text} </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          {isVisible ? (
            <div className="z-4 border-1 absolute right-5 top-4 flex h-15 w-63 animate-fadeInRight justify-center rounded-md border-b-common-red/5 border-t-common-red bg-[#FE226480] px-4.5 py-3.5">
              <div className="relative h-5 w-5">
                <Image
                  src="/notificationIcons/error.svg"
                  alt="error icon red"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <p className="m-auto text-base">{text}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
