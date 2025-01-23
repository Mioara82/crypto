import React from "react";
import Slider from "react-slick";
import { Suspense } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import CoinDetail from "./CoinDetailsCarousel";
import { CoinProps } from "./CoinDetailsCarousel";
import { Currency } from "@/lib/features/currencySlice";
import CarouselSkeleton from "../../UI-components/Skeleton/CarouselSkeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RootState } from "@/lib/store";
import { handleChartCoin } from "@/lib/features/coinSlice";

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
}

const CoinCarousel: React.FC<CoinCarouselProps> = ({ list, currency }) => {
  const selectedCoins = useAppSelector(
    (state: RootState) => state.chartCoins.chartCoins
  );

  const dispatch = useAppDispatch();
  const handleSelected = (
    name: string,
    id: string,
    symbol: string,
    current_price: number
  ) => {
    dispatch(handleChartCoin({ name, id, symbol, current_price }));
  };

  const settings = {
    dots: false,
    infinite: list.length > 5,
    speed: 500,
    slidesToShow: Math.min(list.length, 6),
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: Math.min(list.length,5),
          slidesToScroll: 2,
          infinite: list.length > 5,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(list.length,4),
          slidesToScroll: 3,
          infinite: list.length > 4,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(list.length,2),
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(list.length,2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: Math.min(list.length,1),
          slidesToScroll: 1,
        },
      },
    ],
  };

  const hasSingleSlide = list.length === 1;

  return (
    <div className={`w-full relative z-99 ${hasSingleSlide ? "single-slide-wrapper" : ""}`}>
      <Suspense fallback={<CarouselSkeleton />}>
        <div className="z-0 relative">
        <Slider className={`${hasSingleSlide ? "single-slide" : ""}`} {...settings}>
          {list.map((coin: CoinProps) => {
            return (
              <CoinDetail
                key={coin.id}
                handleSelectedCoin={() =>
                  handleSelected(
                    coin.name,
                    coin.id,
                    coin.symbol,
                    coin.current_price
                  )
                }
                coin={coin}
                currency={currency}
                isActive={!!selectedCoins[coin.name.toLowerCase()]}
              />
            );
          })}
        </Slider>
        </div>
      </Suspense>
    </div>
  );
};

export default CoinCarousel;
