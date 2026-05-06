import { useEffect, useState } from "react";
import "./styles.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const [cost, setCost] = useState<number | "">("");
  const [interest, setInterest] = useState<number | "">("");
  const [fee, setFee] = useState<number | "">("");
  const [tenure, setTenure] = useState<number | "">("");
  const [downPayment, setDownPayment] = useState<number>(0);
  const [emi, setEmi] = useState<number>(0);

  const numericCost = Number(cost) || 0;
  const numericInterest = Number(interest) || 0;
  const numericFee = Number(fee) || 0;
  const numericTenure = Number(tenure) || 1;

  const calculateEMI = (principal: number): number => {
    const monthlyRate = numericInterest / 12 / 100;

    if (principal <= 0) return 0;
    if (monthlyRate === 0) return Math.round(principal / numericTenure);

    const emiValue =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, numericTenure)) /
      (Math.pow(1 + monthlyRate, numericTenure) - 1);

    return Math.round(emiValue);
  };

  const handleDownPaymentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDownPayment(Number(e.target.value));
  };

  useEffect(() => {
    const principal = numericCost - downPayment;
    setEmi(calculateEMI(principal));
  }, [numericCost, numericInterest, numericTenure, downPayment]);

  const totalLoan = numericCost - downPayment;
  const processingFee = Math.round((totalLoan * numericFee) / 100);
  const totalInterest = emi * numericTenure - totalLoan;
  const totalPayable = totalLoan + totalInterest + processingFee;

  const chartData = {
    labels: ["Principal Loan", "Total Interest", "Processing Fee"],
    datasets: [
      {
        data: [totalLoan, totalInterest, processingFee],
        backgroundColor: ["#94a3b8", "#64748b", "#cbd5e1"],
        borderWidth: 0,
        hoverOffset: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#374151",
          boxWidth: 12,
          padding: 12,
          font: {
            size: 11
          }
        }
      }
    },
    cutout: "72%"
  };

  return (
    <div className="App">
      <h1 className="heading">EMI Calculator</h1>

      <div className="card formCard">
        <div className="inputGroup">
          <label>Total Cost of Asset</label>
          <input
            type="number"
            placeholder="Enter asset cost"
            value={cost}
            onChange={(e) =>
              setCost(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>

        <div className="inputGroup">
          <label>Interest Rate (%)</label>
          <input
            type="number"
            placeholder="Enter interest rate"
            value={interest}
            onChange={(e) =>
              setInterest(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>

        <div className="inputGroup">
          <label>Processing Fee (%)</label>
          <input
            type="number"
            placeholder="Enter fee"
            value={fee}
            onChange={(e) =>
              setFee(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>

        <div className="inputGroup">
          <label>Loan Tenure (Months)</label>
          <input
            type="number"
            placeholder="Enter tenure"
            value={tenure}
            onChange={(e) =>
              setTenure(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>
      </div>

      <div className="analyticsSection">
        <div className="chartCard">
          <div className="chartWrapper">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="summaryPanel">
          <div className="summaryRow">
            <span>Total Loan Amount</span>
            <h2>₹{totalLoan > 0 ? totalLoan.toLocaleString() : 0}</h2>
          </div>

          <div className="summaryRow">
            <span>Monthly EMI</span>
            <h2>₹{emi.toLocaleString()}</h2>
          </div>

          <div className="summaryRow">
            <span>Total Interest</span>
            <h2>₹{totalInterest > 0 ? totalInterest.toLocaleString() : 0}</h2>
          </div>

          <div className="summaryRow">
            <span>Processing Fee</span>
            <h2>₹{processingFee > 0 ? processingFee.toLocaleString() : 0}</h2>
          </div>

          <div className="summaryRow totalPayable">
            <span>Total Amount Payable</span>
            <h2>₹{totalPayable > 0 ? totalPayable.toLocaleString() : 0}</h2>
          </div>
        </div>
      </div>

      <div className="sliderCard">
        <label>Down Payment: ₹{downPayment.toLocaleString()}</label>
        <input
          className="slider"
          type="range"
          min={0}
          max={numericCost}
          step={1000}
          value={downPayment}
          onChange={handleDownPaymentChange}
        />
      </div>
    </div>
  );
}
