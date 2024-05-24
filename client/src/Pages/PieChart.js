// src/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ allValue }) => {
  const [
    totalCompleteOrders,
    totalPendingOrders,
    totalCancelledOrders,
    totalProcessingOrders,
  ] = allValue;

  const data = {
    labels: ["Complete", "Pending", "Processing", "Cancelled"],
    datasets: [
      {
        label: "# of Orders",
        data: [
          totalCompleteOrders,
          totalPendingOrders,
          totalProcessingOrders,
          totalCancelledOrders,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)"
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };
  console.log(data);

  return (
    <div style={{width:"300px"}}>
      <h2>Orders</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
