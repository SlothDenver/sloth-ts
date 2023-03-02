import { ReactNode } from "react";
import { Convictzee } from "./ConvictzeesCarousel";
import Image from "next/image";
import { Button } from "antd";

export const TransferModal = ({
  title,
  children,
  convictzee,
  imageSize = 200,
}: {
  title: string;
  children: ReactNode;
  convictzee: Convictzee;
  imageSize?: number;
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="py-10 text-2xl font-semibold">{title}</div>
      <Image
        src={`/${convictzee?.name}.png`}
        alt="convictzee"
        width={imageSize}
        height={imageSize}
      />
      <div className="text-lg font-medium py-6">{convictzee?.name}</div>
      {children}
    </div>
  );
};
