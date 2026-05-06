import { useState } from "react";
import "./styles.css";

export default function App() {
  const [cost, setCost] = useState(0)
  const [interest, setInterest] = useState(10)
  const [fee, setFee] = useState(1)
  const [downPayment, setDownPayment] = useState(0)
  const [tenure, setTenure] = useState(12)
  const [emi, setEmi] = useState(0)

  const upadateEMI = () => {
  }

  const updateDownPayment = () => {

  }

  const calculateEMI = () => {

  }

  return (
    <div className="App">
      <span className="title" style={{ fontSize: 20, marginTop: 20 }}>EMI Calculator</span>
      <span className="title">Total Cost of Asset</span>
      <input type="number" placeholder="Enter Total Cost of Asset" value={cost} onChange={(e) => setCost(e.target.value)} />
      <span className="title">Interest Rate (in %)</span>
      <input type="number" placeholder="Enter Interest Rate" value={interest} onChange={(e) => setInterest(e.target.value)} />
      <span className="title">Processing Fee (in %)</span>
      <input type="number" placeholder="Enter Processing Fee" value={fee} onChange={(e) => setFee(e.target.value)} />
      <span className="title">Down Payment</span>
      <input className="slider" type="range" min={0} max={cost} value={downPayment} onChange={upadateEMI} />
      <span className="title">Loan Per Month</span>
      <input className="slider" type="range" min={calculateEMI(cost)} max={calculateEMI(0)} value={emi} onChange={updateDownPayment} />
      {}
    </div>
  );
}
