// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;


import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";

import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract giftCard is Initializable,  OwnableUpgradeable  {

    //this is the royalty address
    address public theBoss;
    IERC20Upgradeable cardFiCoin;

    //NFT[IERC721][uint256]
        mapping (IERC721Upgradeable => mapping (uint256 => Card)) public vaultBox ;
        



     // this stores all the added currencies
    IERC20Upgradeable[] public allowedCrypto;

    
    event Royalty(uint256 depositRoyal, uint256 withdrawRoyal);

    
        //this shows the info of the card you added the funds to
     event addedFunds(
        
        IERC721Upgradeable _contractAddress,
        uint256 cardId,
        IERC20Upgradeable _token,
        uint256 delayTime,
        uint256 cardFunds

    );
        
        // this shows the amount of the currency that the contract stores
    event totalTokenBalance(
        uint256 amount
    );


       // this empties the card and sends everything to the redeemer
        event takenAll(
            uint256 pid, 
            uint256 allTaken
        );


        // this shows how much funds was taken from the card
        //this shows ho much funds is still on the card
        event portionTaken(uint256 amountRecived, uint256 royalty, uint256 remainingFunds);
        event addedCurrency(IERC20Upgradeable token);
        event Signer(address signer);
        event currencyAttached(IERC721Upgradeable minter, uint256 cardId, IERC20Upgradeable currency, bool added);
        
        
    using SafeMathUpgradeable for uint256;
   

    function initialize() external initializer{
       //  __ERC721_init("giftCard", "GC");
         __Ownable_init();
         theBoss=0xd0f42F06212Ec949Af692b1d31Fd3f3D8Ddc05D7;
        cardFiCoin=IERC20Upgradeable(0xFf1c5b5Aa6362B8804BeD047163Ebe1a9B125869);
         addCurrency(cardFiCoin);
         setRoyalty(cardFiCoin, 3, 5);
    }

         
        
        // ERC20 royalties
        mapping(IERC20Upgradeable=>uint256[]) public Royalties; 


        // these are the stats that a card will have
        struct Card {
            //this shows the currency the card stores 
            IERC20Upgradeable token; 
            //this shows the amount of the currency the card stores
            uint256 funds;  
            //this shows when you are alowed to claim the funds       
            uint256 moneyDate;

            bool currencyAdded;
        }

        

function executeSetIfSignatureMatch(
    uint8 v,
    bytes32 r,
    bytes32 s,
    string memory message,
    address sender
  ) public view returns (bool) {
    // require(block.timestamp < deadline, "Signed transaction expired");

    uint chainId;
    assembly {
      chainId := chainid()
    }
    bytes32 eip712DomainHash = keccak256(
        abi.encode(
            keccak256(
                "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
            ),
            keccak256(bytes("SetTest")),
            keccak256(bytes("1")),
            chainId,
            address(this)
        )
    );  

    bytes32 hashStruct = keccak256(
      abi.encode(
          keccak256("set(string message,address sender)"),
          keccak256(abi.encodePacked(message)),
          sender
        )
    );

    bytes32 hash = keccak256(abi.encodePacked("\x19\x01", eip712DomainHash, hashStruct));
    address signer = ecrecover(hash, v, r, s);
    require(signer == sender, "MyFunction: invalid signature");
    require(signer != address(0), "ECDSA: invalid signature");

    
    return signer == sender;
    
  }
        
            // mapping(IERC20Upgradeable=>uint256[]) public Royalties;
            function setRoyalty(IERC20Upgradeable tokenAddress, uint256 depositFee, uint256 withdrawFee) public onlyOwner {
                uint256[] storage _royaltyArray=Royalties[tokenAddress];
                _royaltyArray[0]=depositFee;
                _royaltyArray[1]=withdrawFee;
                emit Royalty(depositFee, withdrawFee);
            }

            function seeRoyalty(IERC20Upgradeable tokenAddress) public onlyOwner view returns(uint256, uint256){
                uint256[] storage _royaltyArray=Royalties[tokenAddress];

                return( _royaltyArray[0], _royaltyArray[1]);
            }
          
            //this tells you if the token is in database
        function tokenExist(IERC20Upgradeable tokenAddress) public view returns(bool ifExist){
           
            for (uint256 i = 0; i < allowedCrypto.length; i++) {
            if (allowedCrypto[i] == tokenAddress) {
            return true;
                }
            }
            return false;
        }


        function showAllowedCrypto() public view returns (IERC20Upgradeable[] memory){
            return allowedCrypto;
        }

           //this adds new ERC20 to the list of accepted currencies
        function addCurrency(IERC20Upgradeable _paytoken) public onlyOwner {  
            require(tokenExist(_paytoken)==false,"this currency is already added");

            allowedCrypto.push(_paytoken);
             uint256[] storage _royaltyArray=Royalties[_paytoken];
                _royaltyArray[0]=0;
                _royaltyArray[1]=0;
            
            emit addedCurrency(_paytoken);
        } 

            //this attaches a token to an NFT and sets the delay time to 0
        function tokenToNft(IERC721Upgradeable _contractAddress, uint256 _tokenId, IERC20Upgradeable _currency) public {   
                require(vaultBox[_contractAddress][_tokenId].currencyAdded==false, "this token already has currency assigned");     
                require(tokenExist(_currency)==true,"this currency is not in our database yet");
                Card storage _Card =vaultBox[_contractAddress][_tokenId];
                
                _Card.token=_currency;
                _Card.funds=0;
                _Card.moneyDate=0;
                _Card.currencyAdded=true;
                emit currencyAttached(_contractAddress, _tokenId, _currency, _Card.currencyAdded );

        }       

       
        // this adds the amount of ERC20 to the NFT
        function sendTokens(IERC721Upgradeable _contractAddress, uint256 _tokenId, uint256 _moneyDate, uint256 _howMuch) public payable{
            require(_howMuch>=100,"100 wei is minimum");
            Card storage _card=vaultBox[_contractAddress][_tokenId];
            require(block.timestamp>=_card.moneyDate, "you need to wait!"); 
            IERC20Upgradeable currency=_card.token;
            _card.moneyDate=block.timestamp+_moneyDate;
            uint256 royalty=(_howMuch*Royalties[currency][0])/100;
            uint256 holderPortion=_howMuch-royalty;
            _card.funds=_card.funds-royalty;
            currency.transferFrom(msg.sender, address(this), holderPortion);
             currency.transferFrom(msg.sender, theBoss, royalty);

            // require(block.timestamp>=vaultBox[_contractAddress][_tokenId].moneyDate, "you need to wait!");          
            // IERC20Upgradeable currency=vaultBox[_contractAddress][_tokenId].token;   
            // vaultBox[_contractAddress][_tokenId].moneyDate=block.timestamp+_moneyDate;
            
            //     //this is a royality portion
            //      uint256 royalty=(_howMuch*depositRoyal)/100;
            //          //this is what the holder gets
            //      uint256 holderPortion=_howMuch-royalty;
                 
            //     vaultBox[_contractAddress][_tokenId].funds=vaultBox[_contractAddress][_tokenId].funds+holderPortion;
            //      currency.transferFrom(msg.sender, address(this), holderPortion);
            //      currency.transferFrom(msg.sender, theBoss, royalty);
             
            
            emit addedFunds(_contractAddress, _tokenId, currency,  _card.moneyDate, _card.funds);
        }


            // this shows the owner of this contract how much of pid currency is stored in the smart contract
            function contractBalance(IERC20Upgradeable _currency) public onlyOwner view returns(uint256){
                        require(tokenExist(_currency));
                return _currency.balanceOf(address(this));
               
            }
        
     //this shows the balance of the card that an owner can redeem 
     //this shows how much longer you have to wait before you can claim the funds
    // this shows what currency this card holds 
        function cardInfo(IERC721Upgradeable _contractAddress, uint256 _tokenId) public view
            returns (uint256 theRest, uint256 moneyDate, IERC20Upgradeable currencyAddress, bool added){
                   
                return (vaultBox[_contractAddress][_tokenId].funds,
                        vaultBox[_contractAddress][_tokenId].moneyDate,
                        vaultBox[_contractAddress][_tokenId].token,
                        vaultBox[_contractAddress][_tokenId].currencyAdded);
        }


         //this allows you to take a portion of funds or the whole amount
        function takeSomeMoney(IERC721Upgradeable _contractAddress, uint256 _tokenId, uint256 _amount, uint8 v,  bytes32 r,  bytes32 s, string memory message, address signerAddress) public payable{
            executeSetIfSignatureMatch(v, r, s, message, signerAddress);

            require(_amount>=100,"100 wei is minimum");
            require(_contractAddress.ownerOf(_tokenId)==msg.sender, "You are not th owner of this NFT");
            Card storage _card=vaultBox[_contractAddress][_tokenId];
            require(block.timestamp>=_card.moneyDate, "you need to wait!");         
            require(_amount<=_card.funds, "Not enough funds on the card");           
            require(_card.token.balanceOf(address(this))>=_amount, "the Vault doesn't have enough funds to pay you");
                _card.funds=_card.funds-_amount;
                IERC20Upgradeable currency=_card.token;             
                    //this is a royality portion
                    uint256 royalty=(_amount*Royalties[currency][1])/100;
                    //this is what the holder gets
                uint256 holderPortion=_amount-royalty;             
                currency.transfer(msg.sender, holderPortion);
                currency.transfer(theBoss, royalty);
                emit portionTaken(holderPortion, royalty, _card.funds);
                                         
        }

        
}      