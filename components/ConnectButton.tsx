import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "@/connectors/connectors";

//import { getErrorMessage }      TODO  : ERROR CODES
//import { switchChains }         TODO  : SWITCHING WALLET

import {
  Button,
  Dropdown,
  MenuProps,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useLoading } from "@/hooks/useLoading";
import { useIsConnected } from "@/hooks/useIsConnected";
import { useFuel } from "@/hooks/useFuel";

function ConnectButton() {
  //
  //const errorMessage = errorConnect || errorDisconnect || notDetected; // error code for fuel
  //const errorMessage = getErrorMessage(error)                           error code for metamask
  const { Text } = Typography;
  const [fuel, notDetected] = useFuel();
  const [isConnected] = useIsConnected();
  const [isFuel, setIsFuel] = useState(false);
  const [handleDisconnect, isDisconnecting, errorDisconnect] = useLoading(
    async () => {
      await fuel?.disconnect();
    }
  );
  const [handleConnect, isConnecting, errorConnect] = useLoading(async () => {
    await fuel?.connect();
  });
  const [accounts, setAccounts] = useState<string[]>([]);

  const [handleAccounts, errorAccounts] = useLoading(async () => {
    const accounts = await fuel.accounts();
    setAccounts(accounts);
  });

  const handleAccountsEvent = (accounts: string[]) => {
    setAccounts(accounts);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Text
          className="flex text-white cursor-pointer items-center font-medium rounded-lg hover:bg-black transition"
          onClick={() => {
            handleConnect();
            setIsFuel(true);
          }}
        >
          <Image
            src="/images/connectors/fuel-logo.svg"
            width={24}
            height={24}
            priority
            alt="FuelConnect"
          />
          <span>Fuel Wallet</span>
        </Text>
      ),
    },
    {
      key: "2",
      label: (
        <Text
          className="flex text-white cursor-pointer items-center  font-medium rounded-lg hover:bg-black transition"
          onClick={async () => {
            await activate(injected);
            setIsFuel(false);
          }}
        >
          <Image
            src="/images/connectors/metamask-fox.svg"
            width={24}
            priority
            height={24}
            alt="MetaMask"
          />
          <span>MetaMask</span>
        </Text>
      ),
    },
    {
      key: "3",
      label: (
        <Text
          className="flex text-white cursor-pointer items-center  font-medium rounded-lg hover:bg-black transition"
          onClick={async () => {
            await activate(walletconnect);
            setIsFuel(false);
          }}
        >
          <Image
            src="/images/connectors/walletconnect-logo.svg"
            width={24}
            height={24}
            priority
            alt="WalletConnect"
          />
          <span>Wallet Connect</span>
        </Text>
      ),
    },
  ];

  useEffect(() => {
    fuel?.on("accounts", handleAccountsEvent);
    return () => {
      fuel?.off("accounts", handleAccountsEvent);
    };
  }, [fuel]);
  useEffect(() => {
    if (isConnected) handleAccounts();
  }, [isConnected]);

  // For MetaMask
  const { activate, active, account, error } = useWeb3React();
  const accountFormatted = isConnected
    ? accounts[0].substring(0, 6) + "..." + accounts[0].substring(26, 32)
    : account?.substring(0, 6) + "..." + account?.substring(26, 32);

  if (isConnected) {
    return (
      // <div className="flex items-center font-semibold 2xl:text-xl gap-2 text-dark-800 tracking-2%">
      //   {
      //     <div className="tracking-2% md:text-sm 2xl:text-base">
      //       <div className="flex items-center gap-3">
      //         <span className="uppercase text-dark-800">Wallet</span>
      //         <span className="w-3 h-3 rounded-full bg-[#24DB4D]"></span>
      //       </div>
      //       <p className="text-dark-100">{accountFormatted}</p>
      //     </div>
      //   }
      // </div>
      <div className="flex md:px-2 2xl:px-4">
        <Select className="w-36 text-white ">
          <Select.Option value="1">
            <Image
              src="/images/connectors/fuel-logo.svg"
              width={24}
              height={24}
              priority
              alt="FuelConnect"
            />
            <span className="text-white">Fuel</span>
          </Select.Option>
          <Select.Option value="2">
            <Image
              src="/images/connectors/metamask-fox.svg"
              width={24}
              priority
              height={24}
              alt="MetaMask"
            />
            <span className="text-white">MetaMask</span>
          </Select.Option>
        </Select>
        <Select className="w-36 mx-2 text-white ">
          <Select.Option value="1">
            <span className="text-white">{accountFormatted}</span>
          </Select.Option>
          <Select.Option value="2">
            <span className="text-white">{accountFormatted}</span>
          </Select.Option>
        </Select>
        <Button className="bg-black backdrop-blur text-white">
          <LogoutOutlined />
        </Button>
      </div>
    );
  }
  return (
    <div className="md:px-2 2xl:px-4">
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button className="bg-[#F1FF0099] text-black border-none h-10 text-base font-bold">
          Connect Wallet
        </Button>
      </Dropdown>
    </div>
  );
}

export default ConnectButton;
