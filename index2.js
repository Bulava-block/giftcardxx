// const { ethers } = require("ethers");


let provider = new ethers.providers.Web3Provider(window.ethereum)
let accounts 
async function init (){
    await provider.send("eth_requestAccounts", [])
}

init ()

const signer = provider.getSigner()
console.log(signer)
const contractAddress = "0xe1C42c4cAdAFD6BFCb3a20821ca6E24F3155CbD2";

const abi =[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "depositRoyal",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "withdrawRoyal",
        "type": "uint256"
      }
    ],
    "name": "Royalty",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "signer",
        "type": "address"
      }
    ],
    "name": "Signer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract IERC20",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "addedCurrency",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract IERC721",
        "name": "_contractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cardId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "contract IERC20",
        "name": "_token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cardFunds",
        "type": "uint256"
      }
    ],
    "name": "addedFunds",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract IERC721",
        "name": "minter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cardId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "contract IERC20",
        "name": "currency",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "added",
        "type": "bool"
      }
    ],
    "name": "currencyAttached",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountRecived",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "royalty",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "remainingFunds",
        "type": "uint256"
      }
    ],
    "name": "portionTaken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "allTaken",
        "type": "uint256"
      }
    ],
    "name": "takenAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "totalTokenBalance",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "name": "Royalties",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "deposit",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "withdraw",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_paytoken",
        "type": "address"
      }
    ],
    "name": "addCurrency",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allowedCrypto",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC721",
        "name": "_contractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "cardInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "theRest",
        "type": "uint256"
      },
      {
        "internalType": "contract IERC20",
        "name": "currencyAddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "added",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_currency",
        "type": "address"
      }
    ],
    "name": "contractBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "executeSetIfSignatureMatch",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "name": "seeRoyalty",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC721",
        "name": "_contractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_howMuch",
        "type": "uint256"
      }
    ],
    "name": "sendTokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "depositFee",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "withdrawFee",
        "type": "uint8"
      }
    ],
    "name": "setRoyalty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "showAllowedCrypto",
    "outputs": [
      {
        "internalType": "contract IERC20[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC721",
        "name": "_contractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "signerAddress",
        "type": "address"
      }
    ],
    "name": "takeSomeMoney",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "theBoss",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "name": "tokenExist",
    "outputs": [
      {
        "internalType": "bool",
        "name": "ifExist",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC721",
        "name": "_contractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "contract IERC20",
        "name": "_currency",
        "type": "address"
      }
    ],
    "name": "tokenToNft",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC721",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "vaultBox",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "funds",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "currencyAdded",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
console.log("contract",contractAddress)
  const contract = new ethers.Contract(contractAddress, abi, signer)

 



  async function verify(){

	let signerAddress = await signer.getAddress()
	console.log(signerAddress)
	const message = "Make sure the address below is your wallet"

    const domain = {
      name: "SetTest",
      version: "1",
      chainId: 80001,
      verifyingContract: "0xe1C42c4cAdAFD6BFCb3a20821ca6E24F3155CbD2"
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
	let contractTo = $("#contractTo").val();
	let cardTo = $("#cardIdTo").val();
	let tokenTo = $("#erc20To").val();
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

  let txObject={balance:cardInfovar[0].toString(),
                ERC20Added:cardInfovar[2],
                ERC20Address:cardInfovar[1]}
  document.getElementById("cardInfoDisplay").innerHTML =bubble_fn_cardfi_cardInfo(txObject)
  console.log(txObject)
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



