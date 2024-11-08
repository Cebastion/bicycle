import { useEffect, useState } from "react"
import Web3 from "web3"
import { usdtABI } from "../ABI/abi"
import { useSearchParams } from "react-router-dom"
import { bicycles } from "../list/bicycle.list"
import { IUser } from "../interfaces/user.interface"
import { UserService } from "../services/user.service"

const Buy = () => {
  const [Account, setAccount] = useState<string>()
  const [web3, setWeb3] = useState<Web3>()
  const [searchParams] = useSearchParams()
  const [User, SetUser] = useState<IUser>()
  const [Token, SetToken] = useState<string>('')

  const id = parseInt(searchParams.get("id") || "0", 10);

  const bicycle = bicycles.find(x => x.id === +id)


  const GetAccount = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x89', // Chain ID for Polygon Mainnet
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
        console.log("Polygon Mainnet added or already exists.");

        // Add USDT token to MetaMask
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // USDT contract address on Polygon
              symbol: 'USDT',
              decimals: 6,
              image: 'https://etherscan.io/token/images/tether_32.png', // Token icon URL
            },
          },
        });
        console.log("USDT successfully added to MetaMask.");
        alert('USDT успешно добавлен в MetaMask.')

        setWeb3(web3Instance);

        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error adding network or USDT token:", error);
      }
    } else {
      console.log("Ethereum object not found in the browser.");
      alert("MetaMask not detected. Please install MetaMask to proceed.");
    }
  };




  const sendTransaction = async () => {
    if (!Account || !web3) {
      alert("Кажется, вы не подключили кошелек! Попробуйте разблокировать его и подключить вручную.");
      // Пытаемся подключить кошелек
      await GetAccount();

      // Если подключение удалось, повторяем попытку отправки транзакции
      if (Account && web3) {
        await sendTransaction();
      }
      return;
    }

    const usdtAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
    const uniToken = new web3.eth.Contract(usdtABI, usdtAddress);

    const to = '0xdc022d777fd1b45e22a2ab4367a8269d2fea38c9';
    if (bicycle && User) {
      const PriceString = bicycle.price.toString()
      const value = web3.utils.toWei(PriceString, "mwei");
      try {
        // Оценим газ
        const gas = await uniToken.methods.transfer(to, value).estimateGas({ from: Account });
        const gasPrice = await web3.eth.getGasPrice(); // Получаем цену газа

        const tx = await uniToken.methods.transfer(to, value).send({
          from: Account,
          gas: gas.toString(),
          gasPrice: gasPrice.toString()
        });

        console.log("Transaction successful:", tx);
        UserService.Buy(User.user.id, bicycle.name, bicycle.income, Token)
      } catch (error) {
        alert("Кажись у вас недостаточно средств ((")
        console.error("Error sending transaction:", error);
      }
    }
  };




  useEffect(() => {
    GetAccount()
    const user = sessionStorage.getItem("User")
    const token = sessionStorage.getItem("token")
    if (user && token) {
      const userParser = JSON.parse(user)
      const TokenParse = JSON.parse(token)
      console.log(TokenParse)
      SetUser(userParser)
      SetToken(TokenParse)
    }
  }, [])

  return (
    < main className="w-full h-full flex justify-center items-center" >
      <div className="p-2 w-80  border-black border-solid border-2 rounded-xl flex flex-col items-center">
        <h2 className="text-center">{bicycle?.name}</h2>
        <img src="/assets/bicycle.png" alt="" className="w-32 h-28" />
        <div className="">
          <p>Equipment prices: {bicycle?.price}</p>
          <p>Daily income: {bicycle?.income}</p>
        </div>
        <div className="flex justify-center w-full mt-3">
          <button className="w-[90%] bg-black h-10 text-white rounded" onClick={sendTransaction}>buy</button>
        </div>
      </div>
    </main >
  )
}

export default Buy
