// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AcademicNFT is ERC721, ERC721URIStorage, AccessControl {
    // Definisi Peran (Role)
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant TRANSFER_ROLE = keccak256("TRANSFER_ROLE");

    uint256 private _nextTokenId;

    constructor(address defaultAdmin, address minter, address treasury) 
        ERC721("AcademicCredential", "ACD") 
    {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin); 
        _grantRole(MINTER_ROLE, minter);              
        _grantRole(TRANSFER_ROLE, treasury);          
    }

    function safeMint(address to, string memory uri) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Logika Soulbound: Hanya TRANSFER_ROLE yang boleh memindahkan token
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721)
        returns (address)
    {
        address from = _ownerOf(tokenId);
        
        if (from != address(0) && to != address(0)) {
            require(
                hasRole(TRANSFER_ROLE, auth) || hasRole(DEFAULT_ADMIN_ROLE, auth),
                "AcademicNFT: Soulbound - Siswa tidak diizinkan memtransfer token ini"
            );
        }

        return super._update(to, tokenId, auth);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}