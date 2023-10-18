import { useState } from "react";
import "./App.css";
import DatePicker from "react-datepicker";
import React from "react";
import MultipleDatePicker from "react-multiple-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [task, setTask] = useState([]);
  const [EndDate, setEndDate] = useState(new Date());
  const [StartDate, setStartDate] = useState(new Date());
  /*const [Month , setMonth] = useState(EndDate.getMonth()+1);*/
  const Month = EndDate.getMonth() + 1;
  const [excludedDates, setexcludedDates] = useState([]);
  const Days =
    Math.floor(
      (EndDate.getTime() - StartDate.getTime()) / (1000 * 60 * 60 * 24) -
        excludedDates.length
    ) + 1;
  const [LeadCount, setLeadCount] = useState();
  /* const [DDR, setDDR] = useState();*/
  const DDR = Math.floor(LeadCount / Days);
  const Time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
  const firstDate = StartDate.getDate()+`/`+StartDate.getMonth()+`/`+StartDate.getFullYear();
  const lastDate = EndDate.getDate()+`/`+EndDate.getMonth()+`/`+EndDate.getFullYear();
  const newtask = {
    Id: task.length +1,
    startDate: firstDate,
    endDate: lastDate,
    month: Month,
    ExcludedDates: excludedDates,
    days: Days,
    leadCount: LeadCount,
    ddr: DDR,
  };
  const addTask = () => {
    setTask((prevData)=>{return[...prevData , newtask]})
    console.log(newtask.startDate);
    console.log(newtask.endDate);
    console.log(newtask.month);
  };
  console.log(Time);
  return (
    <div>
    <h1>Delivery Records</h1>
    <div className="container">
      <table>
        <tr id="thead">
          <th id="thead">Id</th>
          <th id="thead">Start Date</th>
          <th id="thead">End Date</th>
          <th id="thead">Month</th>
          <th id="thead">Excluded Date</th>
          <th id="thead">No. of Days</th>
          <th id="thead">Lead Count</th>
          <th id="thead">Expected DRR</th>
          <th id="thead">Last Updated</th>
        </tr>
        
        <tr>
        <td data-heading="Id" id="tbodytr">N/A</td>
          <td data-heading="Start date" id="tbodytr">
            <DatePicker
              showIcon
              selected={StartDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={StartDate}
              endDate={EndDate}
              
            />
          </td>
          <td data-heading="End date" id="tbodytr">
            <DatePicker
              showIcon
              selected={EndDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={StartDate}
              endDate={EndDate}
              minDate={StartDate}
            />
          </td>
          <td data-heading="Month" id="tbodytr">
            <p>{Month}</p>
          </td>
          <td data-heading="Excluded Dates" id="tbodytr">
            <MultipleDatePicker
              id="aa"
              
              onSubmit={(dates) => setexcludedDates(dates)}
              minDate={StartDate}
              maxDate={EndDate}
              placeholder ="0"
            />
          </td>
          <td data-heading="Days" id="tbodytr">
            <p>{Days}</p>
          </td>
          <td data-heading="Lead Count" id="tbodytr">
            <input
              id="aa"
              placeholder="0"
              type="number"
              onChange={(event) => setLeadCount(event.target.value)}
            />
          </td>
          <td data-heading="DDR" id="tbodytr">
            <p>{DDR}</p>
          </td>
          <td data-heading="Submit" id="tbodytr">
            <button onClick={addTask}>Submit</button>
          </td>
        </tr>
      
        
        {task.map((tasks)=>(
          
          <tr id="tbodytr">
            <td data-heading="Id" id="tbodytd">
              {tasks.Id}
            </td>
            <td data-heading="Start Date" id="tbodytd">
              {tasks.startDate}
            </td>
            <td data-heading="Last Date" id="tbodytd">
            {tasks.endDate}
            </td>
            <td data-heading="Month" id="tbodytd">
              {tasks.month}
            </td>
            <td data-heading="Excluded Dates" id="tbodytd">
              {tasks.ExcludedDates.map((exc)=>(
                <p>{exc.getDate()+`/`+exc.getMonth()+`/`+exc.getFullYear()}</p>
              ))}
            </td>
            <td data-heading="No. of Days" id="tbodytd">
              {tasks.days = -1 ? 0:tasks.days}
            </td>
            <td data-heading="Lead Count" id="tbodytd">
              {tasks.leadCount}
            </td>
            <td data-heading="DDR" id="tbodytd">
              {tasks.ddr = Infinity ? "invalid data":tasks.ddr }
            </td>
            <td data-heading="Submittion timing" id="tbodytd">
              {Time}
            </td>
          </tr>
        
          
        ))}
        
      </table>
      </div>
    </div>
  );
}
export default App;
