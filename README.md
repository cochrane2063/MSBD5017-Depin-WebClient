# Welcome to CLEARNET!

A new Decentralized VPN

## Getting Started
Before you use ClearNet make sure you have wireguard installed on your computer.

The download link for wireguard is provided below.

[Download Wireguard](https://www.wireguard.com/install)

You can start using clearnet by clicking on the link below.

[CLEARNET WebClient](http://depin.msbd.cloud)

## Use the web app

1. When you open the website link above you will be greeted with blank page with no available servers.

2. To connect to your metamask wallet, just click login. Then choose your wallet and connect.

3. Make sure you are using the sepolia test net as the contract is deployed there.

4. When you see the metamask logo on the top right it means you are connected.

5. You need some CLR tokens to register to the network. For testing purposes, we prepared a faucet where you can get some tokens. Go to the Faucet page and click "Claim CLR" to get some Tokens. We suggest you claim it twice to make sure you have enough tokens.

6. After you have some tokens, click the metamask icon on the top right to register to the network.

7. It will ask for your confirmation twice, be patient and wait for the process to complete.

8. When you return to the home page you will see the list of available nodes to connect to.

9. Pick a node and click connect. You will be promted to download the wireguard config file.

10. Import the config fire to your wireguard client. you can start using the VPN now.

11. When you finish click disconnect on the node. You will be prompted to enter a rating for the server. You can choose to rate or not rate. Make sure to click confirm on metamask. (if you choose to rate it will ask for your confirmation twice. The first one is to sign your rating)

## Local Setup
If you prefer a local setup or the web site above is down, you can follow the instructions below.

### Prerequisites
Make sure you have nodejs installed on your system 

If not, you can downlaod from their offical website: 

[https://nodejs.org/en/download](https://nodejs.org/en/download)

After you have node installed 

Clone this repository and cd into it

```bash
cd MSBD5017-Depin-WebClient
```
run
```bash
npm install
```
to install all the dependencies

next, run
```bash
npm run build
```
A build folder will appear, you can use your web server of choice to serve this foler or just use the built in web server and run
```bash
npm start
```
The server will be listening on port 3000.

