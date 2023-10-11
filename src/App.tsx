import React, { useState, useEffect } from "react";
import UserDataTable from "./CollapseAbleTable";
import axios from "axios";
import RecordsChart from "./RecordsChart";

function App() {
  const [record, setRecords] = useState([]);
  const [PieRecord, setPieRecords] = useState({ high: 0, medium: 0, low: 0, critical: 0 });

  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/records");
      setRecords(data);
	  const counts = data.reduce((acc:any, item:any) => {
		acc[item.severity] = (acc[item.severity] || 0) + 1;
		return acc;
	  }, {});
	  setPieRecords(counts);
    } catch (error: any) {
		console.log(error.message);
    }
};
useEffect(() => {
	getData();
}, []);

console.log(PieRecord, "PieRecord");


  return (
    <div className='App'>
      <UserDataTable records={record} />
      <RecordsChart data={PieRecord} />
    </div>
  );
}

export default App;
