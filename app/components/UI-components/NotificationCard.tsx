import { useMessageBox } from "@/lib/hooks/useMessageBox";
import CheckIcon from "@/app/icons/checkIcon";

interface NotificationCardProps {
  text: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  text,
}) => {
  const isVisible = useMessageBox();
  return (
    <div>
      {isVisible ? (
        <div
          className="absolute flex justify-center w-[228px] h-[60px] top-[16px] right-[20px] rounded-md border-2 py-3.5 px-4.5 bg-common-green border-t-[#00B1A7] border-r-[#00B1A7]
                      border-l-[#00B1A7] border-b-[#00B1A700]"
        >
          <CheckIcon />
          <p className="text-base m-auto">{text} </p>
        </div>
      ) : null}
    </div>
  );
};

export default NotificationCard;
