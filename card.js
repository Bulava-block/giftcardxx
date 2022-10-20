// takeSomeMoney
async function takeSomeMoneyJS(){
  var contractSome = document.getElementById("contract_redemption").value;
  var cardIdSome = document.getElementById("cardId_redemption").value;
  var amountSome = document.getElementById("money_redemption").value;
 const {v, r,s, message, signerAddress} = await verify()
 let tx = await contract.takeSomeMoney(contractSome, cardIdSome, amountSome, v, r, s, message, signerAddress)
 tx = await tx.wait()
 console.log(tx)		

   document.getElementById("takeMoney").innerHTML =bubble_fn_cardfi_takeSomeMoney(tx)
} 


// contract.on("Royalty", (depositRoyal, withdrawRoyal)=>{
//   console.log("Changed deposit Royalty to", depositRoyal.toNumber(), "%")	
//   console.log("Changed withdraw Royalty to", withdrawRoyal.toNumber(), "%")		
//   })