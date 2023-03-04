import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Button, Input, Modal } from "antd";
import Image from "next/image";
import { ConvictzeesCarousel } from "@/components";
import { useConvictzees } from "@/store/store";
import Router, { useRouter } from "next/router";
import { TransferModal } from "@/components/TransferModal";
import {
  CheckCircleOutlined,
  CloseOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import ConnectButton from "@/components/ConnectButton";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const convictState = useConvictzees();
  const router = useRouter();
  return (
    <div className="w-full bg-black -z-50 text-white">
      <div className="container relative px-4 py-24 z-20">
        <Modal
          footer
          width={400}
          className="text-white"
          open={convictState.modal}
          onCancel={() => {
            convictState.resetModal();
            Router.replace({ pathname: Router.pathname });
          }}
          onOk={() => {
            convictState.resetModal();
            Router.replace({ pathname: Router.pathname });
          }}
          closeIcon={<CloseOutlined className="text-gray-400" />}
        >
          <Button
            type="ghost"
            className=" text-gray-400"
            onClick={() => Router.back()}
          >
            <LeftOutlined />
          </Button>
          {router.query.state === "transfer" ? (
            convictState.convictzee && (
              <TransferModal
                title={"Transfer"}
                convictzee={convictState.convictzee}
              >
                <div className=" font-medium py-6">
                  Would you like to transfer with token?
                </div>
                <div className="flex">
                  <Button
                    className="w-24 text-sm bg-black h-8  mr-2 text-white"
                    onClick={() =>
                      router.replace({
                        pathname: router.pathname,
                        query: { state: "transferWithoutToken" },
                      })
                    }
                  >
                    NO
                  </Button>
                  <Button
                    className="w-24 text-sm bg-black h-8 text-white"
                    onClick={() =>
                      router.replace({
                        pathname: router.pathname,
                        query: { state: "transferWithToken" },
                      })
                    }
                  >
                    YES
                  </Button>
                </div>
              </TransferModal>
            )
          ) : router.query.state === "transferWithToken" ? (
            convictState.convictzee && (
              <TransferModal
                imageSize={120}
                title={"Transfer with Token"}
                convictzee={convictState.convictzee}
              >
                <div className="self-start py-4 font-semibold">Amount</div>
                <Input
                  type="number"
                  placeholder={"Enter the token amount"}
                  className=" bg-gray-800 text-white border-none placeholder:text-gray-400"
                  onChange={(e) =>
                    convictState.setTransferAmount(e.target.valueAsNumber)
                  }
                ></Input>
                <div className="self-start py-4 font-semibold">
                  Receiver Address
                </div>
                <Input
                  placeholder="Enter receiver's address"
                  className=" bg-gray-800 text-white border-none placeholder:text-gray-400"
                  onChange={(e) =>
                    convictState.setReceiverAddress(e.target.value)
                  }
                ></Input>
                <Button
                  className="w-max text-sm bg-black h-8 my-4 text-white"
                  onClick={() =>
                    router.replace({
                      pathname: router.pathname,
                      query: { state: "transferConfirm" },
                    })
                  }
                >
                  TRANSFER
                </Button>
              </TransferModal>
            )
          ) : router.query.state === "transferConfirm" ? (
            convictState.convictzee && (
              <TransferModal
                imageSize={120}
                title={"Transfer"}
                convictzee={convictState.convictzee}
              >
                <div className="-mt-6">
                  {convictState.transferAmount && (
                    <>
                      <div className="text-lg font-medium">&</div>
                      <div className="text-lg font-medium pb-6">
                        {convictState.transferAmount}
                      </div>
                    </>
                  )}
                  <div className="text-lg flex font-medium py-6">
                    Receiver
                    <div className="text-lg flex font-medium text-[#F1FF00] ml-4">
                      {convictState.receiverAddress}
                    </div>
                  </div>
                </div>
                <Button
                  className="w-24 min-w-max text-sm bg-black h-8 my-4 text-white"
                  onClick={() =>
                    router.replace({
                      pathname: router.pathname,
                      query: { state: "transactionSent" },
                    })
                  }
                >
                  CONFIRM
                </Button>
              </TransferModal>
            )
          ) : router.query.state === "transactionSent" ? (
            <div className="w-full flex flex-col items-center">
              <div className="py-10 text-7xl text-[#F1FF00]">
                <CheckCircleOutlined />
              </div>
              <div className="text-2xl">Transcation sent</div>

              <div className=" font-medium py-6">
                Item will be transfered once transaction confirms.
              </div>

              <Button
                className="w-24 min-w-max text-sm bg-black h-8 my-4 text-white"
                onClick={() => {
                  convictState.resetModal();
                  router.replace({ pathname: router.pathname });
                }}
              >
                OK
              </Button>
            </div>
          ) : router.query.state === "transferWithoutToken" ? (
            convictState.convictzee && (
              <TransferModal
                imageSize={120}
                title={"Transfer"}
                convictzee={convictState.convictzee}
              >
                <div className="self-start py-4 font-semibold">
                  Receiver Address
                </div>
                <Input
                  placeholder="Enter receiver's address"
                  className=" bg-gray-800 text-white border-none placeholder:text-gray-400"
                  onChange={(e) =>
                    convictState.setReceiverAddress(e.target.value)
                  }
                ></Input>
                <Button
                  className="w-24 min-w-max text-sm bg-black h-8 my-4 text-white"
                  onClick={() =>
                    router.replace({
                      pathname: router.pathname,
                      query: { state: "transferConfirm" },
                    })
                  }
                >
                  TRANSFER
                </Button>
              </TransferModal>
            )
          ) : router.query.state === "redeem" ? (
            convictState.convictzee && (
              <TransferModal
                title={"Redeem"}
                convictzee={convictState.convictzee}
              >
                <div className=" py-4 font-semibold">
                  Are you sure you want to throw this sloth back into prison and
                  take the bounty of $1,000,000?
                </div>
                <Button
                  className="w-24 min-w-max text-sm bg-black h-8 my-4 text-white"
                  onClick={() =>
                    router.replace({
                      pathname: router.pathname,
                      query: { state: "redeemConfirm" },
                    })
                  }
                >
                  Yes
                </Button>
              </TransferModal>
            )
          ) : router.query.state === "redeemConfirm" ? (
            convictState.convictzee && (
              <div className="w-full flex flex-col items-center">
                <div className="py-10 text-7xl text-[#F1FF00]">
                  <CheckCircleOutlined />
                </div>
                <div className="text-2xl">Redeem Request Approved</div>

                <div className=" font-medium py-6">
                  You will receive the bounty once transaction confirms.
                </div>

                <Button
                  className="w-24 min-w-max text-sm bg-black h-8 my-4 text-white"
                  onClick={() => {
                    convictState.resetModal();
                    router.replace({ pathname: router.pathname });
                  }}
                >
                  OK
                </Button>
              </div>
            )
          ) : router.query.state === "mint" ? (
            convictState.convictzee && (
              <TransferModal
                title={"Mint"}
                convictzee={convictState.convictzee}
              >
                <div className=" py-4 font-semibold">
                  Are you sure you want to mint this sloth?
                </div>
                <Button
                  className="w-24 min-w-max text-sm bg-black h-8 my-4 text-white"
                  onClick={() =>
                    router.replace({
                      pathname: router.pathname,
                      query: { state: "mintConfirm" },
                    })
                  }
                >
                  Yes
                </Button>
              </TransferModal>
            )
          ) : router.query.state === "mintConfirm" ? (
            convictState.convictzee && (
              <TransferModal
                title={"Mint"}
                convictzee={convictState.convictzee}
              >
                <div className=" py-4 font-semibold">Minted!</div>
                <Button
                  className="w-24 min-w-max text-sm bg-black h-8 my-4 text-white"
                  onClick={() => {
                    convictState.resetModal();
                    router.replace({
                      pathname: router.pathname,
                    });
                  }}
                >
                  OK
                </Button>
              </TransferModal>
            )
          ) : (
            <></>
          )}
          {router.query.state === ""}
        </Modal>
        <div className="w-full flex justify-between">
          <div className=" font-bold text-xl flex items-center">
            Sloths on the Run
          </div>
          <ConnectButton />
        </div>
        <div className="w-full mt-10 flex ">
          <div className="flex items-center w-full">
            <div>
              <div className=" text-5xl font-bold my-4">Sloths on the Run</div>
              <div className="mb-10">
                Meet the sloths that you've never seen before – these
                slow-moving creatures have turned into adrenaline-pumping,
                lightning-fast escape artists after committing some serious
                crimes in the web3 universe. <br />
                Once you've minted your stable NFT of the convict sloth, he is
                yours to control.
                <br />
                Redeem your money by throwing him back into prison for the
                bounty on his head.
                <br />
              </div>
              <Button className="h-10">Find out more</Button>
            </div>
          </div>
          <div className="w-[50%] min-w-[300px] h-full flex items-center justify-center -z-10">
            <div className="absolute -z-20 top-80 -right-80 ">
              <Image
                src="/coinBlured.svg"
                alt="bluredCoin"
                width={626}
                height={904}
                className="object-contain"
              />
            </div>
            <div className="absolute -z-20 top-0">
              <Image
                src="/coinBlured2.svg"
                alt="bluredCoin2"
                width={481}
                height={297}
                className="object-contain"
              />
            </div>
            <img
              src="/rollingCoins.png"
              alt="convictzees"
              className=" object-contain ml-10"
            />
          </div>
        </div>
        <ConvictzeesCarousel
          convictzees={convictState.prisonedSloth}
          title="Mint Sloths from Prison" 
          arrowDisable={true}        />
        <ConvictzeesCarousel
          convictzees={convictState.mySloth}
          title="My Sloths"
          state="redeem" 
          arrowDisable={false}        />
      </div>
    </div>
  );
}
