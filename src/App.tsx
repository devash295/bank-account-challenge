import React from 'react';
import TransactionIcon from './components/icons/transactionIcon';
import TransferMoneyIcon from './components/icons/transferMoneyIcon';
import WithdrawMoneyIcon from './components/icons/withdrawMoneyIcon';
import DepositMoneyIcon from './components/icons/depositMoneyIcon';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={''} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <TransactionIcon color='red'/>
        <TransactionIcon color='green'/>
        <TransferMoneyIcon/>
        <WithdrawMoneyIcon/>
        <DepositMoneyIcon/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
