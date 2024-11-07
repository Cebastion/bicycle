import { useEffect, useState } from "react"
import { UserService } from "../services/user.service"

const Withdraw = () => {
  const [Sum, SetSum] = useState<string>('0')
  const [Account, setAccount] = useState<string>()

  const GetAccount = async () => {
    if (window.ethereum) {
      try {
        // Добавляем сеть Polygon, если ее еще нет
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x89', // Chain ID для основной сети Polygon
              chainName: 'Polygon Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              rpcUrls: ['https://polygon-rpc.com/'],
              blockExplorerUrls: ['https://polygonscan.com/'],
            },
          ],
        });

        // Добавляем токен USDT в MetaMask
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // Адрес контракта USDT в сети Ethereum
              symbol: 'USDT',
              decimals: 6,
              image: 'https://etherscan.io/token/images/tether_32.png', // Ссылка на иконку токена
            },
          },
        });

        console.log("USDT успешно добавлен в MetaMask.");
        alert('USDT успешно добавлен в MetaMask.')

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Ошибка при добавлении сети или токена USDT:", error);
      }
    } else {
      console.log("Ethereum не обнаружен в браузере.");
    }
  }

  const Withdraw = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const TokenParse = JSON.parse(token)
      const User = await UserService.GetUser(TokenParse)
      if (User && Account && User.user.score >= +Sum) {
        await UserService.Withdraw(+Sum, Account, TokenParse)
      }
    }
  }


  useEffect(() => {
    GetAccount()
  }, [])

  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="p-2 w-80  border-black border-solid border-2 rounded-xl">
        <h2 className="text-center">Withdraw</h2>
        <div className="mt-3">
          <label htmlFor="">Amount</label>
          <input required value={Sum} onChange={(e) => SetSum(e.target.value)} placeholder="amount" type="text" className="w-full h-10 p-1 border-2 border-solid border-black rounded" />
        </div>
        <div className="flex justify-center w-full mt-3">
          <button className="w-[90%] bg-black h-10 text-white rounded" onClick={() => Withdraw()}>withdraw</button>
        </div>
      </div>
    </main>
  )
}

export default Withdraw
