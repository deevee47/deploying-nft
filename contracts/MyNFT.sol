// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds; // Counter for token IDs

    constructor(address initialOwner) ERC721("MyNFT", "NFT") Ownable(initialOwner) {}

    function mintNFT(address recipient, string memory tokenURI) 
        public 
        onlyOwner 
        returns (uint256) 
    {
        _tokenIds++; // Increment token ID counter

        uint256 newItemId = _tokenIds; // Assign new token ID
        _mint(recipient, newItemId); // Mint NFT
        _setTokenURI(newItemId, tokenURI); // Set metadata URI

        return newItemId; // Return the minted token ID
    }

    function getLatestTokenId() public view returns (uint256) {
        return _tokenIds; // Get latest minted token ID
    }
}
