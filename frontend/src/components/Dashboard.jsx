import React, { useEffect, useState } from 'react';
import { Appbar } from '../UI/Appbar';
import { Balance } from '../UI/Balance';
import { Users } from '../UI/Users';
import axios from 'axios';

const Dashboard = () => {
  const [balance, setBalance] = useState("Loading...");

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    const fetchBalance = () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/v1/account/balance',
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
      };
      
      axios.request(config)
        .then((response) => {
          const fetchedBalance = parseFloat(response.data.balance).toFixed(2);
          setBalance(fetchedBalance || "0.00");
        })
        .catch((error) => {
          console.error("Error fetching balance:", error);
          setBalance("0.00");  // Fallback value in case of error
        });
    };

    // Fetch balance initially and set up an interval to refresh it
    fetchBalance();
    const intervalId = setInterval(fetchBalance, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);
  
  return (
    <>
      <Appbar />
      <Balance value={balance} />
      <Users />
    </>
  );
};

export default Dashboard;
