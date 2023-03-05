/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type {
  Interface,
  FunctionFragment,
  DecodedValue,
  Contract,
  BytesLike,
  BigNumberish,
  InvokeFunction,
  BN,
} from "fuels";

import type { Enum, Option } from "./common";

export type AddressInput = { value: string };

export type AddressOutput = { value: string };

export type ContractIdInput = { value: string };

export type ContractIdOutput = { value: string };

export type IdentityInput = Enum<{
  Address: AddressInput;
  ContractId: ContractIdInput;
}>;

export type IdentityOutput = Enum<{
  Address: AddressOutput;
  ContractId: ContractIdOutput;
}>;

interface NFTContractAbiInterface extends Interface {
  functions: {
    admin: FunctionFragment;
    balance_of: FunctionFragment;
    constructor: FunctionFragment;
    get_token_owner: FunctionFragment;
    max_supply: FunctionFragment;
    mint: FunctionFragment;
    redeem: FunctionFragment;
    total_supply: FunctionFragment;
    transfer_from: FunctionFragment;
  };

  encodeFunctionData(functionFragment: "admin", values?: undefined): Uint8Array;
  encodeFunctionData(
    functionFragment: "balance_of",
    values: [IdentityInput]
  ): Uint8Array;
  encodeFunctionData(
    functionFragment: "constructor",
    values?: undefined
  ): Uint8Array;
  encodeFunctionData(
    functionFragment: "get_token_owner",
    values: [BigNumberish]
  ): Uint8Array;
  encodeFunctionData(
    functionFragment: "max_supply",
    values?: undefined
  ): Uint8Array;
  encodeFunctionData(
    functionFragment: "mint",
    values: [BigNumberish]
  ): Uint8Array;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [BigNumberish, AddressInput]
  ): Uint8Array;
  encodeFunctionData(
    functionFragment: "total_supply",
    values?: undefined
  ): Uint8Array;
  encodeFunctionData(
    functionFragment: "transfer_from",
    values: [AddressInput, AddressInput, BigNumberish]
  ): Uint8Array;

  decodeFunctionData(functionFragment: "admin", data: BytesLike): DecodedValue;
  decodeFunctionData(
    functionFragment: "balance_of",
    data: BytesLike
  ): DecodedValue;
  decodeFunctionData(
    functionFragment: "constructor",
    data: BytesLike
  ): DecodedValue;
  decodeFunctionData(
    functionFragment: "get_token_owner",
    data: BytesLike
  ): DecodedValue;
  decodeFunctionData(
    functionFragment: "max_supply",
    data: BytesLike
  ): DecodedValue;
  decodeFunctionData(functionFragment: "mint", data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: "redeem", data: BytesLike): DecodedValue;
  decodeFunctionData(
    functionFragment: "total_supply",
    data: BytesLike
  ): DecodedValue;
  decodeFunctionData(
    functionFragment: "transfer_from",
    data: BytesLike
  ): DecodedValue;
}

export class NFTContractAbi extends Contract {
  interface: NFTContractAbiInterface;
  functions: {
    admin: InvokeFunction<[], IdentityOutput>;

    balance_of: InvokeFunction<[owner: IdentityInput], BN>;

    constructor: InvokeFunction<[], void>;

    get_token_owner: InvokeFunction<[token_id: BigNumberish], AddressOutput>;

    max_supply: InvokeFunction<[], BN>;

    mint: InvokeFunction<[amount: BigNumberish], void>;

    redeem: InvokeFunction<
      [token_id: BigNumberish, recipient: AddressInput],
      void
    >;

    total_supply: InvokeFunction<[], BN>;

    transfer_from: InvokeFunction<
      [from: AddressInput, to: AddressInput, token_id: BigNumberish],
      void
    >;
  };
}
