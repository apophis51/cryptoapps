import WalletComponent from '../MetaMask2/page'

let contractOwnerKey = process.env.PRIVATE_KEY;


export default function MetaMaskContainer() {
    return (
      <div>
        {contractOwnerKey}
      <WalletComponent ownerkey = {contractOwnerKey}/>
      </div>
    );
  }