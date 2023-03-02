import { Convictzee } from "@/components";
import { create } from "zustand";
type ConvictzeesStore = {
  dummyConvictzees: Convictzee[];
  convictzee: Convictzee | undefined;
  modal: boolean;
  receiverAddress: string | undefined;
  transferAmount: number | undefined;
  closeDummyConvictzee: () => void;
  setDummyConvictzees: (convictzees: Convictzee[]) => void;
  viewDummyConvictzee: (convictzee: Convictzee) => void;
  setModal: (modal: boolean) => void;
  setTransferAmount: (amount: number) => void;
  setReceiverAddress: (address: string) => void;
  resetModal: () => void;
};

export const useConvictzees = create<ConvictzeesStore>((set) => ({
  dummyConvictzees: [
    { name: "prisonedConvictzee1", id: "1", prisoned: true },
    { name: "prisonedConvictzee2", id: "2", prisoned: true },
    { name: "prisonedConvictzee3", id: "3", prisoned: true },
    { name: "myConvictzee1", id: "4", prisoned: false },
    { name: "myConvictzee2", id: "5", prisoned: false },
    { name: "myConvictzee3", id: "6", prisoned: false },
  ] as Convictzee[],
  convictzee: undefined,
  modal: false,
  transferAmount: undefined,
  receiverAddress: undefined,
  setDummyConvictzees: (convictzees: Convictzee[]) =>
    set((state) => ({ dummyConvictzees: convictzees })),
  viewDummyConvictzee: (convictzee: Convictzee) =>
    set((state) => ({ convictzee: convictzee, modal: true })),
  closeDummyConvictzee: () =>
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
    })),
}));
