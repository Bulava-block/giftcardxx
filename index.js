<link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' type='text/css'>
<script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.34/dist/web3.min.js"></script>
<script
src="https://cdn.jsdelivr.net/npm/ethers@5.7.1/dist/ethers.umd.min.js"></script>
<script
src="https://s3.amazonaws.com/appforest_uf/d100/f1666113486255x885861431080135200/abi.js"></script>
<script>
var contractAddress = "0xe1C42c4cAdAFD6BFCb3a20821ca6E24F3155CbD2";
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    if (web3.version.network == 1) {
        contractAddress = "0xe1C42c4cAdAFD6BFCb3a20821ca6E24F3155CbD2";
    } else if (web3.version.network == 80001) {
        contractAddress = "0xe1C42c4cAdAFD6BFCb3a20821ca6E24F3155CbD2";
    } else if (web3.version.network == 4) {
        contractAddress = "0xe1C42c4cAdAFD6BFCb3a20821ca6E24F3155CbD2";
    } else if (web3.version.network == 42) {
        contractAddress = "0xe1C42c4cAdAFD6BFCb3a20821ca6E24F3155CbD2";
    }
}
 // const { ethers } = require("ethers");
let provider = new ethers.providers.Web3Provider(window.ethereum)
let accounts
async function init (){
    await provider.send("eth_requestAccounts", [])
}
init ()
const signer = provider.getSigner()
console.log(signer)
console.log("contract",contractAddress)
  const contract = new ethers.Contract(contractAddress, abi, signer)
  async function verify(){
	let signerAddress = await signer.getAddress()
	console.log(signerAddress)
	const message = "Make sure the address below is your wallet"
 const domain = {
      name: "SetTest",
      version: "1",
      chainId: await provider.getNetwork().then(network => network.chainId),
      verifyingContract: contractAddress
    }
    const types =  {
		set:[
			{name:"message", type:"string"},
			{name:"sender", type:"address"},
		  ]
    }
    const value =  {
        message: message,
		sender: signerAddress,
      }
	
    let signature = await signer._signTypedData(domain, types, value)
	
	let splitSignature = ethers.utils.splitSignature(signature)
	console.log(splitSignature)
	const v = splitSignature.v
	const r = splitSignature.r
	const s = splitSignature.s
	 return {v, r,s, message, signerAddress}
  }
  	//showAllowedCryptoJS
  async function showAllowedCryptoJS(){
	let tx=await contract.showAllowedCrypto();
	
	console.log(tx)
  }
   function bubble_fn_cardfi_sendTokens(transaction){
        console.log("sendTokens transaction hash is", transaction.transactionHash);
    return transaction.transactionHash;
   }
   function bubble_fn_cardfi_takeSomeMoney(transaction){
    console.log("takeSomeMoney transaction hash is", transaction.transactionHash);
  return transaction.transactionHash;
  }
   function bubble_fn_cardfi_cardInfo(object){
    return JSON.stringify(object)
   }
  // addCurrency
  async function addCurrencyJS(){
	currencyVal = $("#addCurrencyVal").val();
	let tx = await contract.addCurrency(currencyVal)
	tx = await tx.wait()
	contract.on("addedCurrency", (_paytoken)=>{
		 		console.log("Added", _paytoken)			
	})
	 console.log(tx)
   //document.getElementById("addCur").innerHTML =tx.transactionHash
  }
  // seeRoyalty
  async function seeRoyaltyJS(){
	// let tx=await contract.seeRoyalty();
  let ERC20 = $("#seeRoyaltyVal").val();
	
	const tx = await contract.seeRoyalty(ERC20)
	
	console.log("deposit Royalty",tx[0].toNumber(),"%")
	console.log("wihdraw Royalty",tx[1].toNumber(), "%")
  //document.getElementById("addCur").innerHTML =tx.transactionHash
}
// setRoyalty
async function setRoyaltyJS(){
  ERC20 = $("#setRoyaltyERC20").val();
	depos = $("#depos").val();
	withd = $("#withd").val();
	let tx = await contract.setRoyalty(ERC20, depos, withd)
	contract.on("Royalty", (depositRoyal, withdrawRoyal)=>{
		console.log("Changed deposit Royalty to", depositRoyal.toNumber(), "%")	
		console.log("Changed withdraw Royalty to", withdrawRoyal.toNumber(), "%")		
    })
	console.log("here is the hash",tx.hash)
  //document.getElementById("setRoyal").innerHTML =tx.hash
}
// tokenToNft
async function tokenToNftJS(){
	// let contractTo = $("#contractTo").val();
    var contractTo = document.getElementById("contractTo").value;
	// let cardTo = $("#cardIdTo").val();
    var cardTo = document.getElementById("cardTo").value;
	// let tokenTo = $("#erc20To").val();
    var tokenTo = document.getElementById("tokenTo").value;
	 let okenTo = await contract.tokenToNft(contractTo, cardTo, tokenTo )
	okenTo = await okenTo.wait()
	contract.on("currencyAttached", (minter, cardId, currency)=>{
		console.log("ERC721 contract is ", minter)	
		console.log("Your NFT ID is ", cardId)
		console.log("ERC20 you attached to this NFT is", currency)		
    })
	console.log(okenTo)
  console.log(okenTo.transactionHash)
  document.getElementById("tokNft").innerHTML =okenTo.transactionHash
}
// cardInfo
async function cardInfoJS(){
    var contractADR = document.getElementById("cardfi_contractaddress").value;
    var tokenid = document.getElementById("cardfi_tokenid").value;
      // let contractADR = $("#CONTRACT").val();
      // let  tokenid = $("#TOKEID").val();
      const cardInfovar = await contract.cardInfo(contractADR, tokenid)
    var txObject={balance:cardInfovar[0].toString(),
                 ERC20Added:cardInfovar[2].toString(),
                ERC20Address:cardInfovar[1].toString()}
    console.log(txObject);
bubble_fn_cardfi(JSON.stringify(txObject));
// load cardInfo if token parameter is in url
if (window.location.href.indexOf("token") > -1) {
  var contractADR = window.location.href.split("token=")[1];
  cardInfoJS(contractADR);
}
  }
// cardInfo2
async function cardInfoJS2(){
    var contractADR = document.getElementById("ERC721").value;
    var tokenid = document.getElementById("idOfCard").value;
      // let contractADR = $("#CONTRACT").val();
      // let  tokenid = $("#TOKEID").val();
      const cardInfovar = await contract.cardInfo(contractADR, tokenid)
    var txObject={balance:cardInfovar[0].toString(),
                 ERC20Added:cardInfovar[2].toString(),
                ERC20Address:cardInfovar[1].toString()}
    console.log(txObject);
bubble_fn_sendTokens(JSON.stringify(txObject));
// load cardInfo if token parameter is in url
if (window.location.href.indexOf("token") > -1) {
  var contractADR = window.location.href.split("token=")[1];
  cardInfoJS(contractADR);
}
  }
// sendTokens
async function sendTokensJS(){
	let contractADR = $("#ERC721").val();
	let  tokenid = $("#idOfCard").val();
	let  amount = $("#amountOF").val();
	//let  Delay = $("#delay").val();
	const cardInfo = await contract.cardInfo(contractADR, tokenid)
	const ERC20Address = cardInfo.currencyAddress
	const ERC20_ABI = ["function approve(address pender, uint256 amount) returns (bool)"]
	const erc20Instance = new ethers.Contract(ERC20Address, ERC20_ABI, signer)
	await erc20Instance.approve(contractAddress, amount);
	let tx = await contract.sendTokens(contractADR, tokenid, amount)
	tx = await tx.wait()
       // const x = await contract.cardInfo(contractADR, tokenid)
	 	
         console.log(tx)
	
  document.getElementById("sendTok").innerHTML =bubble_fn_cardfi_sendTokens(tx)
}
// contractBalance
async function contractBalanceJS(){
	let  erc20 = $("#erc20Balance").val();
	const balance = await contract.contractBalance(erc20)
	//console.log("The amount of this ERC20 inside of this contract is", balance.toNumber(), "wei")
	
}
// takeSomeMoney
async function takeSomeMoneyJS(){
	let contractSome = $("#contractSome").val();
	let cardIdSome = $("#cardIdSome").val();
	let amountSome = $("#moneySome").val();
	const {v, r,s, message, signerAddress} = await verify()
	let tx = await contract.takeSomeMoney(contractSome, cardIdSome, amountSome, v, r, s, message, signerAddress)
	tx = await tx.wait()
	contract.on("portionTaken", (amountRecived, royalty, remainingFunds)=>{
		console.log("Recieved", amountRecived.toNumber())	
			
		console.log("Remaining balance on your NFT", remainingFunds.toNumber())		
    })
    console.log(tx)		
    document.getElementById("takeMoney").innerHTML =bubble_fn_cardfi_takeSomeMoney(tx)
}
</script>