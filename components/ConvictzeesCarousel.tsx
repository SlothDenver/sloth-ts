import { Button, Carousel, ConfigProvider, Select } from "antd";
import { useRef } from "react";
import { ConvictzeesCard } from "./ConvictzeesCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export type Convictzee = {
  name: string;
  id: string;
  prisoned: boolean;
};
export type ConvictzeesCarouselProps = {
  convictzees: Convictzee[];
  title: string;
  state?: string;
};

export function spliceIntoChunks(arr: any[], chunkSize: number) {
  const buf = [...arr];
  const res: any[][] = [];
  while (buf.length > 0) {
    const chunk = buf.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
}

export const ConvictzeesCarousel = ({
  convictzees,
  title,
  state = "transfer",
}: ConvictzeesCarouselProps) => {
  const slider = useRef<any>(null);

  return (
    <>
      <div className=" flex justify-between my-8">
        <div className=" text-2xl font-bold">{title}</div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "rgba(0, 0, 0, 0.6)",
            },
          }}
        >
          <Button type="primary" className=" border-gray-300">
            filter
          </Button>
        </ConfigProvider>
      </div>
      <div className="w-full flex items-center">
        <Button
          className="-mr-10 z-10 text-white w-4 bg-inherit border-0 flex flex-col items-center"
          onClick={() => slider.current.prev()}
        >
          <LeftOutlined className=" text-lg" />
        </Button>
        <div className="w-full">
          <Carousel
            ref={slider}
            autoplay={true}
            autoplaySpeed={3000}
            dots={false}
          >
            {spliceIntoChunks(convictzees, 3).map((chunk, i) => (
              <div key={i}>
                <div className="flex w-full justify-between">
                  {chunk.map((convictzee, idx) => (
                    <ConvictzeesCard
                      convictzee={convictzee}
                      state={state}
                      key={idx}
                    />
                  ))}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <Button
          className="-ml-10 z-10 text-white w-4 bg-inherit border-0 flex flex-col items-center"
          onClick={() => slider.current.next()}
        >
          <RightOutlined className="text-lg " />
        </Button>
      </div>
    </>
  );
};
