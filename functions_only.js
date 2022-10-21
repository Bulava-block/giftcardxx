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
 