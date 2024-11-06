import React, { useState } from 'react';

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;

    const monthlyPayment =
      (principal * rate) / (1 - Math.pow(1 + rate, -term));

    setMonthlyPayment(monthlyPayment.toFixed(2));
  };

  return (
    <div className='m-3 p-4 bg-blue-300 rounded shadow-md'>
      <h2 className='text-lg font-bold mb-2'>Mortgage Calculator</h2>
      <form className='space-y-2'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Loan Amount ($):
          </label>
          <input
            className='mt-1 p-2 border rounded w-full'
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Interest Rate (%):
          </label>
          <input
            className='mt-1 p-2 border rounded w-full'
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Loan Term (years):
          </label>
          <input
            className='mt-1 p-2 border rounded w-full'
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </div>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
          type="button"
          onClick={calculateMonthlyPayment}
        >
          Calculate
        </button>
      </form>
      {monthlyPayment !== null && (
        <div className='mt-2'>
          <h3 className='text-sm font-semibold'>Monthly Payment:</h3>
          <p className='text-xs font-bold text-green-500'>${monthlyPayment}</p>
        </div>
      )}
    </div>
  );
  
};

export default MortgageCalculator;

