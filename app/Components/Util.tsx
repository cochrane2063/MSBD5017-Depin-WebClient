
export interface Node {
  address: string;
  ip: string;
  port: number;
  traffic: number;
  price : number;
  pricePerMinute : BigInt;
  rating : number;
}

export interface NodeInfo {
  ipAddress: string;
  port: number;
  pricePerMinute : BigInt;
  reputationScore : BigInt;
  totalMinutesServed : BigInt;
  totalEarnings : BigInt;
}

export interface PaymentChannelInfo {
  balance: BigInt;
  nonce: BigInt;
  isActive: boolean;
}