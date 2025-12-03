import { Web3 } from 'web3';
import clearNetJson from './ClearNet.json';

const clearNetABI = (clearNetJson as any).abi ?? clearNetJson;
const clearNetAddress = "0xf04cbb756045b276ea962ea98d938a0ed8101f51";

export const getActiveNodes = async (provider: any) => {
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(clearNetABI, clearNetAddress);
    const activeNodes = await contract.methods.getActiveNodes().call();
    return activeNodes;
}

export async function registerNode(provider: any,account: string) {
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(clearNetABI, clearNetAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 300000;
    const tx = await contract.methods.registerNode("57.158.82.48", 51820, 1000000000000000000n).send({
        from: account,
        gas: String(gasLimit),
        gasPrice: String(gasPrice),
    });

    console.log(tx);


}