import { Web3 } from 'web3';
import type { Node, NodeInfo, PaymentChannelInfo } from '../Util';
import clearNetJson from './ClearNet/ClearNet.json';
import clrTokenJson from './CLRToken/CLRToken.json';

const clearNetABI = (clearNetJson as any).abi ?? clearNetJson;
const clrTokenABI = (clrTokenJson as any).abi ?? clrTokenJson;
const clearNetAddress = "0xb6f537b38b82d08ff3ed796754d9d85b5cfe9cb5";
const clrTokenAddress = "0xf1664c17887767c8f58695846babb349ca61d2e9";
const DEFAULT_MIN_STAKE = BigInt(10000) * BigInt(1e18); // 10000 CLR


export const getActiveNodes = async (provider: any): Promise<Node[]> => {
    if (!provider) {
        return [];
    }
    const web3 = new Web3(provider);
    const clearnet_contract = new web3.eth.Contract(clearNetABI, clearNetAddress);
    const activeNodes: string[] = await clearnet_contract.methods.getActiveNodes().call();
    const nodes: Node[] = await Promise.all(activeNodes.map(async (node: string) => {
        const nodeInfo: NodeInfo = await clearnet_contract.methods.getNodeInfo(node).call();
        return {
            ip: nodeInfo.ipAddress,
            port: Number(nodeInfo.port),
            traffic: 0,
            price: Number(nodeInfo.pricePerMinute) / 1e18,
            rating: Number(nodeInfo.reputationScore) / 1000,
        };
    }));
    console.log("Fetched nodes:", nodes);
    return nodes;
}

export async function approveCLRTokenSpending(provider: any,account: string) {
    const web3 = new Web3(provider);
    const clr_token_contract = new web3.eth.Contract(clrTokenABI, clrTokenAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 300000;
    const tx = await clr_token_contract.methods.approve(clearNetAddress, DEFAULT_MIN_STAKE).send({
        from: account,
        gas: String(gasLimit),
        gasPrice: String(gasPrice),
    });
    console.log(tx);
}

export async function openPaymentChannel(provider: any,account: string,amount: BigInt) {
    const web3 = new Web3(provider);
    const clearnet_contract = new web3.eth.Contract(clearNetABI, clearNetAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 300000;
    const tx = await clearnet_contract.methods.openPaymentChannel(amount).send({
        from: account,
        gas: String(gasLimit),
        gasPrice: String(gasPrice),
    });

    console.log(tx);
}

export async function closePaymentChannel(provider: any,account: string) {
    const web3 = new Web3(provider);
    const clearnet_contract = new web3.eth.Contract(clearNetABI, clearNetAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 300000;
    const tx = await clearnet_contract.methods.closePaymentChannel().send({
        from: account,
        gas: String(gasLimit),
        gasPrice: String(gasPrice),
    });
    console.log(tx);

}

export async function getPaymentChannelInfo(provider: any,account: string) : Promise<PaymentChannelInfo> {
    if (!provider) {
        return { balance: BigInt(0), nonce: BigInt(0), isActive: false};
    }
    const web3 = new Web3(provider);
    const clearnet_contract = new web3.eth.Contract(clearNetABI, clearNetAddress);
    const channelInfo: PaymentChannelInfo = await clearnet_contract.methods.getPaymentChannelInfo(account).call();
    return {
        balance: channelInfo.balance,
        nonce: channelInfo.nonce,
        isActive: channelInfo.isActive,
    };
}