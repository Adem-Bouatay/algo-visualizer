"use client";

import React, { useState, useEffect } from "react";
import Chart from "@/components/Chart";
import { faker } from "@faker-js/faker";

const labels = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
];
const initialData = labels.map(() => faker.number.int({ min: 0, max: 100 }));
initialData.sort((a, b) => a - b);

const App = () => {
  const [number, setNumber] = useState(0);
  const [cursor, setCursor] = useState([0]);
  const [sortedData, setSortedData] = useState(initialData);

  const ternarySearch = async () => {
    const array = [...sortedData];
    let start = 0;
    let end = array.length - 1;

    while (start != end) {
      setCursor([start, end]);
      let mid1 = Math.floor(start + (end - start) / 3);
      let mid2 = Math.floor(end - (end - start) / 3);
      if (number === array[mid1]) {
        setCursor([mid1]);
        await sleep(300);
        alert(`Number found at index ${mid1}`);
        return;
      } else if (number === array[mid2]) {
        setCursor([mid2]);
        await sleep(300);
        alert(`Number found at index ${mid2}`);
        return;
      } else if (number < array[mid1]) {
        end = mid1 - 1;
      } else if (number < array[mid2]) {
        end = mid2 - 1;
        start = mid1 + 1;
      } else {
        start = mid2 + 1;
      }

      await sleep(500);
    }
  };

  const cursorColor = (context) => {
    const index = context.dataIndex;
    return cursor.includes(index) ? "#ffff" : "#f472b6";
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
      <div className="flex flex-col w-5/12 p-5 space-y-4 items-center">
        <button
          className="bg-slate-50 text-black rounded-lg p-2 text-sm font-semibold hover:bg-slate-300 active:bg-red-400"
          onClick={ternarySearch}
        >
          ►
        </button>
        <Chart data={data} name="Ternary Search" />
        <h1 className="text-lg font-bold text-[#646464]">
          Number to search for:
        </h1>
        <input
          className="w-1/2 p-2 rounded-lg text-center text-black"
          type="number"
          placeholder="Enter a number"
          onChange={(e) => setNumber(parseInt(e.target.value))}
        />
      </div>
      <div className="flex-1 p-5 border-l-2 rounded-l-3xl text-white">
        <textarea
          className="w-full h-full resize-none p-2 bg-[#151515]"
          disabled
          defaultValue={`const array = [...sortedData];
              let change = true;
              while (change) {
                change = false;
                for (let i = 0; i < array.length - 1; i++) {
                  setCursor([i, i + 1]);
                  await sleep(200);
                  if (array[i] > array[i + 1]) {
                    const temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
                    change = true;
                    setSortedData([...array]);
                  }
                }
              }
            `}
        />
      </div>
    </>
  );
};

export default App;
