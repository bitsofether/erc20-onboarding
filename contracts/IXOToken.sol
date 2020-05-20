pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "./ERC20Migrator.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol";

contract IXOToken is Initializable, ERC20Detailed, ERC20Mintable {

  /**
   * @dev Initialization function.
   */
  function initialize(ERC20Detailed _legacyToken, ERC20Migrator _migrator) initializer public {
    ERC20Mintable.initialize(address(_migrator));
    ERC20Detailed.initialize(_legacyToken.name(), _legacyToken.symbol(), _legacyToken.decimals());
  }

}
