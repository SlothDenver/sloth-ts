import { useConvictzees } from "@/store/store";
import { Button, Popover } from "antd";
import Router from "next/router";
import { useState } from "react";
import { Convictzee } from "./ConvictzeesCarousel";

export const ConvictzeesCard = ({
  convictzee,
  state,
}: {
  convictzee: Convictzee;
  state: string;
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const convictzeeState = useConvictzees();
  return (
    <>
      <div
        className="rounded cursor-pointer w-[33%] flex justify-center relative"
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseOut={() => {
          setHovered(false);
        }}
      >
        <img
          src={`${convictzee.name}.png`}
          className="object-contain w-[90%] rounded"
        />
        <div
          className={`absolute transition bottom-3 right-8 ${
            hovered ? " opacity-100" : " opacity-0"
          }`}
        >
          {state !== "transfer" ? (
            <>
              <Button
                className="bg-[#1d1d1d80] mr-4 text-white backdrop-blur"
                onClick={() => {
                  convictzeeState.viewDummyConvictzee(convictzee);
                  Router.replace({
                    pathname: Router.pathname,
                    query: { state: "transfer" },
                  });
                }}
              >
                Transfer
              </Button>
              <Button
                className="bg-[#1d1d1d80] text-white backdrop-blur"
                onClick={() => {
                  convictzeeState.viewDummyConvictzee(convictzee);
                  Router.replace({
                    pathname: Router.pathname,
                    query: { state: "redeem" },
                  });
                }}
              >
                Redeem
              </Button>
            </>
          ) : (
            <Button
              className="bg-[#1d1d1d80] text-white backdrop-blur"
              onClick={() => {
                convictzeeState.viewDummyConvictzee(convictzee);
                Router.replace({
                  pathname: Router.pathname,
                  query: { state: "mint" },
                });
              }}
            >
              Mint
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
