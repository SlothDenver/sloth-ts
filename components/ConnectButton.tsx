import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { injected , walletconnect} from "@/connectors/connectors";

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
import { getErrorMessage } from "@/helper/getErrorMessage";

function ConnectButton() {
  //
  //const errorMessage = errorConnect || errorDisconnect || notDetected; // error code for fuel
  //const errorMessage = getErrorMessage(error)                           error code for metamask
  const { Text } = Typography;
  const [fuel, FuelnotDetected] = useFuel();
  const [isFuelConnected] = useIsConnected();

  const [handleFuelDisconnect, isFuelDisconnecting, errorFuelDisconnect] = useLoading(
    async () => {
      await fuel?.disconnect();
  });
  const [handleFuelConnect, isFuelConnecting, errorFuelConnect] = useLoading(
    async () => {
    await fuel?.connect();
  });
  const [Fuelaccounts, setFuelAccounts] = useState<string[]>([]);

  const [handleFuelAccounts, errorFuelAccounts] = useLoading(
    async () => {
      const accounts = await fuel.accounts();
      setFuelAccounts(accounts);
  });

  const handleFuelAccountsEvent = (accounts: string[]) => {
    setFuelAccounts(accounts);
  };



  useEffect(() => {
    fuel?.on("accounts", handleFuelAccountsEvent);
    return () => {
      fuel?.off("accounts", handleFuelAccountsEvent);
    };
  }, [fuel]);
  
  useEffect(() => {
    if (isFuelConnected) handleFuelAccounts();
  }, [isFuelConnected]);

  // For MetaMask
  const { activate, active, account, error, deactivate} = useWeb3React();


  const FuelerrorMessage = errorFuelConnect || errorFuelDisconnect || FuelnotDetected;
  const EtherrorMessage = getErrorMessage(error)

  const handleEthDisConnect = () => {
    deactivate();
  }
  const handleEthConnect = async () => {
    await activate(injected, (error) => {
      getErrorMessage(error)
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Text
          className="flex text-white cursor-pointer items-center font-medium rounded-lg hover:bg-black transition"
          onClick={handleFuelConnect}
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
          onClick={handleEthConnect}
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

  if(active) {
    return (
      <div className="flex md:px-2 2xl:px-4 items-center">
          <Image
            src="/images/connectors/metamask-fox.svg"
            width={24}
            priority
            height={24}
            alt="MetaMask"
          />
          <span className="text-white">MetaMask</span>
        <Select 
          className="w-36 mx-2 text-white"
          defaultValue = {0}
        >
          {
            <Select.Option value={0} key = {0}>
          <span className="text-white">{account}</span>
          </Select.Option>
          }
        </Select>
        
      <Button 
        className="bg-black backdrop-blur text-white"
        onClick={handleEthDisConnect}>
        <LogoutOutlined />
      </Button>
    </div>
    )
  }
  if (isFuelConnected) {
    return (
      <div className="flex md:px-2 2xl:px-4 items-center">
            <Image
              src="/images/connectors/fuel-logo.svg"
              width={24}
              height={24}
              priority
              alt="FuelConnect"
            />
            <span className="text-white">Fuel</span>
          <Select 
            className="w-36 mx-2 text-white"
            defaultValue = {0}
          >
            {
            Fuelaccounts.map((account, i) => (
              <Select.Option value={i} key = {i}>
            <span className="text-white">{account}</span>
            </Select.Option>
            ))
            }
          </Select>
          
        <Button 
          className="bg-black backdrop-blur text-white"
          onClick={handleFuelDisconnect}>
          <LogoutOutlined />
        </Button>
      </div>
    );
  }


  return (
    <div className="md:px-2 2xl:px-4">
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button className="bg-[#F1FF0099] text-black border-none h-10 text-base font-bold" >
          Connect Wallet
        </Button>
      </Dropdown>
    </div>
  );
}

export default ConnectButton;