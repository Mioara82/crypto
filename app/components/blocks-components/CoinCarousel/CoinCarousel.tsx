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
      <Suspense fallback={<CarouselSkeleton />}>
        <Slider {...settings}>
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
      </Suspense>
    </div>
  );
};

export default CoinCarousel;
