import { Button } from 'antd';
import { useFuel } from 'hooks/useFuel';
import { useIsConnected } from 'hooks/useIsConnected';
import { useLoading } from 'hooks/useLoading';

export function Connection() {
  const [fuel, notDetected] = useFuel();
  const [isConnected] = useIsConnected();

  const [handleConnect, isConnecting, errorConnect] = useLoading(async () => {
    await fuel?.connect();
  });

  const [handleDisconnect, isDisconnecting, errorDisconnect] = useLoading(
    async () => {
      await fuel?.disconnect();
    }
  );

  const errorMessage = errorConnect || errorDisconnect || notDetected;

  return (
      <div>
        {!isConnected ? (
          <Button className="bg-[#F1FF0099] text-black border-none h-10 text-base fonte-bold"
            onClick={handleConnect}
            loading={isConnecting}
            disabled={isConnecting || isConnected || !fuel}
          >
            Connect Wallet
          </Button>
        ) : null}
        {isConnected ? (
          <Button className="bg-[#F1FF0099] text-black border-none h-10 text-base fonte-bold"
            onClick={handleDisconnect}
            loading={isDisconnecting}
            disabled={isDisconnecting || !isConnected || !fuel}
          >
            Disconnect
          </Button>
        ) : null}
      </div>
  );
}