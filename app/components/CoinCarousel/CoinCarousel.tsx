import React from "react";
import Slider from "react-slick";
import CoinDetail from "./CoinDetailsCarousel";
import { CoinProps } from "./CoinDetailsCarousel";
import { Currency } from "@/lib/features/appSettingsSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick: () => void;
  children: React.ReactNode;
}

const Arrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick, children } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#6161D680",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        textAlign: "center",
        zIndex: 99,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const SampleNextArrow = (props: any) => <Arrow {...props}></Arrow>;

const SamplePrevArrow = (props: any) => <Arrow {...props}></Arrow>;

interface CoinCarouselProps {
  list: CoinProps[];
  currency: Currency;
  isActive: number | null;
  //type any as I have an error in deployment "type defined but never used"
  onSelectCoin:any;
}

const CoinCarousel: React.FC<CoinCarouselProps> = ({
  list,
  currency,
  isActive,
  onSelectCoin
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {list.map((coin: CoinProps, index: number) => {
          return (
            <CoinDetail
              key={coin.id}
              onSelectCoin={()=>onSelectCoin(coin.id)}
              coin={coin}
              currency={currency}
              isActive={isActive === index}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default CoinCarousel;
