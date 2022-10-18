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