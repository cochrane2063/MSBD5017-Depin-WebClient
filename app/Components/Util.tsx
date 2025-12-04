
export interface Node {
  ip: string;
  port: number;
  traffic: number;
  price : number;
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