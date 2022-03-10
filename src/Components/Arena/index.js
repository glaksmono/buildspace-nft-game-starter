import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import myEpicGame from '../../utils/MyEpicGame.json';
import './Arena.css';

/*
 * We pass in our characterNFT metadata so we can show a cool card in our UI
 */
const Arena = ({ characterNFT }) => {
  // State
  const [gameContract, setGameContract] = useState(null);

    /*
    * State that will hold our boss metadata
    */
    const [boss, setBoss] = useState(null);

    // UseEffects
    useEffect(() => {
    /*
    * Setup async function that will get the boss from our contract and sets in state
    */
    const fetchBoss = async () => {
        const bossTxn = await gameContract.getBigBoss();
        console.log('Boss:', bossTxn);
        setBoss(transformCharacterData(bossTxn));
    };

    if (gameContract) {
        /*
        * gameContract is ready to go! Let's fetch our boss
        */
        fetchBoss();
    }
    }, [gameContract]);

  // UseEffects
  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      );

      setGameContract(gameContract);
    } else {
      console.log('Ethereum object not found');
    }
  }, []);

  return (
    <div className="arena-container">
      {/* Boss */}
      <p>BOSS GOES HERE</p>

      {/* Character NFT */}
      <p>CHARACTER NFT GOES HERE</p>
    </div>
  );
};

export default Arena;