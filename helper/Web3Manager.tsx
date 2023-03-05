import { useEffect, useState } from "react"

import { useWeb3React } from "@web3-react/core"

function Web3Manager({ children }: { children: React.ReactNode }) {
  const { connector, active, deactivate } = useWeb3React()

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  return <>{children}</>
}

export default Web3Manager
