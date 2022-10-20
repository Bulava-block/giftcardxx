 //const { ethers } = require("ethers");


let provider = new ethers.providers.Web3Provider(window.ethereum)
let accounts 
async function init (){
    await provider.send("eth_requestAccounts", [])
}

init ()

const signer = provider.getSigner()
console.log(signer)
const contractAddress = "0x595a69Ce32A1Cc4DbA7A600CBb090f336E9bE322";



const abi = [
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
          "indexed": false,
          "internalType": "contract IERC721",
          "name": "NFT_ADDRESS",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "TOKEN_ID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "HOLDER_PORTION",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ROYALTY",
          "type": "uint256"
        }
      ],
      "name": "Money_taken",
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
          "internalType": "uint8",
          "name": "deposit",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "withdraw",
          "type": "uint8"
        }
      ],
      "name": "Royalty_changed",
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
          "indexed": false,
          "internalType": "contract IERC721",
          "name": "NFT_ADDRESS",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "TOKEN_ID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "HOLDER_PORTION",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ROYALTY",
          "type": "uint256"
        }
      ],
      "name": "Tokens_sent",
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
          "name": "token_added",
          "type": "address"
        }
      ],
      "name": "currency_added",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "contract IERC721",
          "name": "NFT_ADDRESS",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "TOKEN_ID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "contract IERC20",
          "name": "CURRENCY",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "ERC20_added",
          "type": "bool"
        }
      ],
      "name": "token_to_nft",
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
      "name": "nativeCurrency",
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
          "internalType": "address payable",
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
      verifyingContract: "0x595a69Ce32A1Cc4DbA7A600CBb090f336E9bE322"
      
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
	
	console.log(JSON.stringify(tx))
   //bubble_fn__showAllowedCryptoJS(JSON.stringify(tx));
  }
  
  // addCurrency
  async function addCurrencyJS(){
	currencyVal = $("#addCurrencyVal").val();
	let tx = await contract.addCurrency(currencyVal)
	tx = await tx.wait()

	let tx_event={
		TOKEN_ADDED:tx.events[0].args.token_added		
	}
	let bubble_tx=JSON.stringify(tx_event)
	console.log((bubble_tx))
	 console.log(tx)
   //bubble_fn__addCurrencyJS(bubble_tx)
  }

  // seeRoyalty
  async function seeRoyaltyJS(){	
  var ERC20 = document.getElementById("seeRoyaltyVal").value;
	const tx = await contract.seeRoyalty(ERC20)
  
	let bubble_tx={
		deposit:tx[0].toNumber(),
		withdraw:tx[1].toNumber()
	}
	console.log(bubble_tx)
  //bubble_fn__seeRoyaltyJS(JSON.stringify(bubble_tx))
  
}


// setRoyalty
async function setRoyaltyJS(){
  var ERC20 = document.getElementById("setRoyalty_ERC20").value;
  var depos = document.getElementById("setRoyalty_depos").value;
  var withd = document.getElementById("setRoyalty_withd").value;
  
	let tx = await contract.setRoyalty(ERC20, depos, withd)
	
  
  console.log("here is the hash", tx)
  contract.on("Royalty_changed", (deposit, withdraw)=>{
	let bubble_tx={
		deposit_now:deposit,
		witdraw_now:withdraw

	}
  	
  console.log(bubble_tx)		
  })
  //bubble_fn__setRoyaltyJS(JSON.stringify(bubble_tx));
}

// tokenToNft
async function tokenToNftJS(){
  var contractTo = document.getElementById("contractTo").value;
  var cardTo = document.getElementById("cardIdTo").value;
  var tokenTo = document.getElementById("erc20To").value;
  
	let okenTo = await contract.tokenToNft(contractTo, cardTo, tokenTo )
	okenTo = await okenTo.wait()
	
	
	let tx_event={
		nft_address:okenTo.events[0].args.NFT_ADDRESS,
		token_id:okenTo.events[0].args.TOKEN_ID.toNumber(),
		currency:okenTo.events[0].args.CURRENCY,
		isAdded:okenTo.events[0].args.ERC20_added,

	}
	let bubble_tx=JSON.stringify(tx_event)
	console.log((bubble_tx))
   // bubble_fn__setRoyaltyJS((bubble_tx);
}

// cardInfo
async function cardInfoJS(){
  var contractADR = document.getElementById("cardfi_contractaddress").value;
  var tokenid = document.getElementById("cardfi_tokenid").value;
	
	const cardInfovar = await contract.cardInfo(contractADR, tokenid)

  let txObject={balance:cardInfovar[0].toString(),
                ERC20Added:cardInfovar[2],
                ERC20Address:cardInfovar[1]}
  document.getElementById("cardInfoDisplay").innerHTML =JSON.stringify((txObject))
  console.log(txObject)
  //bubble_fn_cardfi(JSON.stringify(txObject));
}

// sendTokens
async function sendTokensJS(){
	let contractADR = $("#ERC721").val();
	let  tokenid = $("#idOfCard").val();
	let  amount = $("#amountOF").val();
	
	const cardInfo = await contract.cardInfo(contractADR, tokenid)
	const ERC20Address = cardInfo.currencyAddress

	const ERC20_ABI = ["function approve(address pender, uint256 amount) returns (bool)"]

	const erc20Instance = new ethers.Contract(ERC20Address, ERC20_ABI, signer)

	await erc20Instance.approve(contractAddress, amount);

	let tx = await contract.sendTokens(contractADR, tokenid, amount, {value: amount})
	tx = await tx.wait()
         console.log(tx.events[2].args.NFT_ADDRESS)
	let tx_event={
		nft_address:tx.events[2].args.NFT_ADDRESS,
		token_id:tx.events[2].args.TOKEN_ID.toNumber(),
		holder_portion:tx.events[2].args.HOLDER_PORTION.toNumber(),
		royalty:tx.events[2].args.ROYALTY.toNumber(),

	}
	 let bubble_tx=JSON.stringify(tx_event)
	 console.log((bubble_tx))
	//bubble_fn_cardfi_sendTokens(bubble_tx);
	
}

// contractBalance
async function contractBalanceJS(){
	let  erc20 = $("#erc20Balance").val();
	const balance = await contract.contractBalance(erc20)

	
	bubble_x= JSON.stringify(balance.toNumber())
	console.log("The amount of this ERC20 inside of this contract is", bubble_x, "wei")
	//bubble_fn_cardfi_contractBalance(bubble_x)
}

// takeSomeMoney
async function takeSomeMoneyJS(){
   var contractSome = document.getElementById("contract_redemption").value;
   var cardIdSome = document.getElementById("cardId_redemption").value;
   var amountSome = document.getElementById("money_redemption").value;
	const {v, r,s, message, signerAddress} = await verify()
	let tx = await contract.takeSomeMoney(contractSome, cardIdSome, amountSome, v, r, s, message, signerAddress)
	tx = await tx.wait()
  //console.log(tx)		

  let tx_event={
	nft_address:tx.events[2].args.NFT_ADDRESS,
	token_id:tx.events[2].args.TOKEN_ID.toNumber(),
	holder_portion:tx.events[2].args.HOLDER_PORTION.toNumber(),
	royalty:tx.events[2].args.ROYALTY.toNumber(),

}
	 let bubble_tx=JSON.stringify(tx_event)
 	console.log((bubble_tx))
	//bubble_fn_cardfi_sendTokens(bubble_tx);

} 



