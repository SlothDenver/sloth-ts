import { Convictzee } from "@/components";
import { create } from "zustand";
type ConvictzeesStore = {
  
  sloth_1Ms: Convictzee[];
  sloth_10Ks: Convictzee[];
  sloth_1Ks: Convictzee[];
  mySloth: Convictzee[];
  prisonedSloth: Convictzee[];

  convictzee: Convictzee | undefined;
  modal: boolean;
  receiverAddress: string | undefined;
  transferAmount: number | undefined;
  vertical: boolean;
  bounties : number;

  setBounties: (convictzees: Convictzee, sloth : Convictzee[])=> void;
  closeDummySloth: () => void;
  setDummySloth: (convictzees: Convictzee[]) => void;
  viewDummySloth: (convictzee: Convictzee) => void;
  setModal: (modal: boolean) => void;
  setTransferAmount: (amount: number) => void;
  setReceiverAddress: (address: string) => void;
  resetModal: () => void;
  setVertical: (vertical: boolean) => void;
};

export const useConvictzees = create<ConvictzeesStore>((set) => ({
  sloth_1Ms:[
    { 
      name: "dot_1M_jack", 
      id: "1", 
      prisoned: true, 
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_1M_jack.png?raw=true",
      amount : 1000000
    },
    { 
      name: "dot_1M_robby", 
      id: "2", 
      prisoned: true, 
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_1M_robby.png?raw=true",
      amount : 1000000

  },
    { 
      name: "dot_1M_tony", 
      id: "3", 
      prisoned: true, 
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_1M_tony.png?raw=true",
      amount : 1000000
  },
  ],
  sloth_10Ks:[
    { 
      name: "dot_10K_han", 
      id: "1", 
      prisoned: true,
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_10K_han.png?raw=true",
      amount : 10000
  },
    { 
      name: "dot_10K_kyle", 
      id: "2", 
      prisoned: true,
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_10K_kyle.png?raw=true" ,
      amount : 10000
    },
  ],
  sloth_1Ks:[
    { 
      name: "dot_1K_mike", 
      id: "1", 
      prisoned: true,
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_1K_mike.png?raw=true" ,
      amount : 1000
    },
    { 
      name: "dot_1K_nick", 
      id: "2", 
      prisoned: true,
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_1K_nick.png?raw=true" ,
      amount : 1000
    },
  ],
  mySloth: [
  ] as Convictzee[],
  
  prisonedSloth: [
    { name: "Bounty_1M", id: "1", prisoned: true,url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/Bounty_1M.png?raw=true",amount : 1000000 },
    { name: "Bounty_10K", id: "2", prisoned: true,url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/Bounty_10K.png?raw=true",amount : 10000 },
    { name: "Bounty_1K", id: "3", prisoned: true,url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/Bounty_1K.png?raw=true",amount : 1000 },
  ],
  convictzee: undefined,
  modal: false,
  transferAmount: undefined,
  receiverAddress: undefined,
  vertical: false,
  bounties : 0,
  setBounties: (convictzees: Convictzee, sloth : Convictzee[]) => 
    set(() => ({ 
      bounties: Math.floor(Math.random()*sloth.length)
    })),
  setVertical: (vertical: boolean) => set(() => ({ vertical: vertical })),
  setDummySloth: (convictzees: Convictzee[]) =>
    set((state) => ({ mySloth: convictzees })),
  viewDummySloth: (convictzee: Convictzee) =>
    set((state) => ({ convictzee: convictzee, modal: true })),
  closeDummySloth: () =>
    set((state) => ({ convictzee: undefined, modal: false })),
  setModal: (modal: boolean) => set((state) => ({ modal: modal })),
  setTransferAmount: (amount: number) =>
    set((state) => ({ transferAmount: amount })),
  setReceiverAddress: (address: string) =>
    set((state) => ({ receiverAddress: address })),
  resetModal: () =>
    set((state) => ({
      transferAmount: undefined,
      receiverAddress: undefined,
      convictzee: undefined,
      modal: false,
      vertical: false,
      bounties : 0
    })),
}));
