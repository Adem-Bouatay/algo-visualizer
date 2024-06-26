import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Quick Sort",
      font: {
        size: 18,
        weight: "bold",
      },
    },
    legend: {
      display: false,
    },
  },
  responsive: true,
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const Chart = ({ initialData }) => {
  const [cursor, setCursor] = useState([-1, -1]);
  const [sortedData, setSortedData] = useState(initialData);
  const [log, setLog] = useState(
    `original array = [${initialData.join(", ")}]\n`
  );
  const quickSort = async () => {
    const sorter = (array) => {
      if (array.length <= 1) return array;
      const pivot = array.pop();
      const smaller = [];
      const larger = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i] < pivot) smaller.push(array[i]);
        else larger.push(array[i]);
      }
      const result = [].concat(sorter(smaller));
      result.push(pivot);
      return result.concat(sorter(larger));
    };
    sorter([14, 2, 6, 1, 8, 4]);
  };

  const cursorColor = (context) => {
    const index = context.dataIndex;
    return index === cursor[0]
      ? "#00a6a0"
      : index === cursor[1]
      ? "#ffff"
      : "#f472b6";
  };

  const [data, setData] = useState({
    labels: sortedData,
    datasets: [
      {
        label: "Dataset",
        data: sortedData,
        backgroundColor: cursorColor,
      },
    ],
  });

  useEffect(() => {
    setData((prevData) => ({
      labels: sortedData,
      datasets: prevData.datasets.map((dataset) => ({
        ...dataset,
        data: sortedData,
      })),
    }));
  }, [sortedData]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      datasets: prevData.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: cursorColor,
      })),
    }));
  }, [cursor]);

  return (
    <>
      <button
        className="bg-slate-50 text-black rounded-lg p-2 text-sm font-semibold hover:bg-slate-300 active:bg-red-400"
        onClick={quickSort}
      >
        ►
      </button>
      <Bar options={options} data={data} updateMode="active" />
      <h1 className="text-lg font-bold text-[#646464]">Log:</h1>
      <div className="w-full h-full">
        <textarea
          className="w-full h-full bg-[#151515] resize-none p-3"
          disabled
          value={log}
        />
      </div>
    </>
  );
};

export default Chart;
