import { useIsConnected } from "@/hooks/useIsConnected";
import { useConvictzees } from "@/store/store";
import { useWeb3React } from "@web3-react/core";
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
  const [isFuelConnected] = useIsConnected();
  const {active} = useWeb3React();

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
                  convictzeeState.viewDummySloth(convictzee);
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
                  convictzeeState.viewDummySloth(convictzee);
                  Router.replace({
                    pathname: Router.pathname,
                    query: { state: "redeem" },
                  });
                }}
              >
                Redeem
              </Button>
            </>
          ) : (active || isFuelConnected) && (
            <Button
              className="bg-[#1d1d1d80] text-white backdrop-blur"            
              disabled = {!isFuelConnected && !active}
              onClick={() => {
                  convictzeeState.viewDummySloth(convictzee);
                  convictzeeState.setVertical(true);
                  convictzee.id == '1' ? 
                    convictzeeState.setBounties(convictzee, convictzeeState.sloth_1Ms) :
                  convictzee.id == '2' ? 
                    convictzeeState.setBounties(convictzee, convictzeeState.sloth_10Ks) :
                    convictzeeState.setBounties(convictzee, convictzeeState.sloth_1Ks)
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
