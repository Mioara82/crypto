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
import { useIsMobile } from "@/lib/hooks/useIsMobile";

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
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        textAlign: "center",
        zIndex: 99,
        cursor: "pointer",
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
    (state: RootState) => state.chartCoins.chartCoins,
  );
  const isMobile = useIsMobile();

  const dispatch = useAppDispatch();
  const handleSelected = (
    name: string,
    id: string,
    symbol: string,
    current_price: number,
  ) => {
    dispatch(handleChartCoin({ name, id, symbol, current_price }));
  };

  const settings = {
    dots: false,
    infinite: list.length > 5,
    speed: 500,
    slidesToShow: Math.min(list.length, 6),
    slidesToScroll: 1,
    nextArrow: isMobile ? <></> : <SampleNextArrow />,
    prevArrow: isMobile ? <></> : <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: Math.min(list.length, 5),
          slidesToScroll: 2,
          infinite: list.length > 5,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(list.length, 3),
          slidesToScroll: 1,
          infinite: list.length > 4,
          dots: false,
        },
      },
      {breakpoint:768, 
        settings: { 
          slidesToShow: Math.min(list.length, 3),
          slidesToScroll: 1,
          infinite: list.length > 4,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(list.length, 3),
          slidesToScroll: 1,
          initialSlide: 1,
          nextArrow: <></>,
          prevArrow: <></>,
        },
      },
         {
        breakpoint: 475,
        settings: {
          slidesToShow: Math.min(list.length, 4),
          slidesToScroll: 1,
          nextArrow: <></>,
          prevArrow: <></>,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: Math.min(list.length, 3),
          slidesToScroll: 1,
          nextArrow: <></>,
          prevArrow: <></>,
        },
      },
    ],
  };

  const [sliderRef, setSliderRef] = React.useState<Slider | null>(null);

  return (
    <div
      className={"z-99 relative w-full"}
    >
      <Suspense fallback={<CarouselSkeleton />}>
        <div className="relative z-0 ">
          <Slider
            ref={setSliderRef}
            {...settings}
          >
            {list.map((coin: CoinProps) => {
              return (
                <CoinDetail
                  key={coin.id}
                  handleSelectedCoin={() =>
                    handleSelected(
                      coin.name,
                      coin.id,
                      coin.symbol,
                      coin.current_price,
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
        
        {/* Mobile Navigation Arrows */}
        {isMobile && list.length > 3 && (
          <div className="flex justify-center gap-4 mt-4">
            <Arrow onClick={() => sliderRef?.slickPrev()}>
              ←
            </Arrow>
            <Arrow onClick={() => sliderRef?.slickNext()}>
              →
            </Arrow>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default CoinCarousel;
