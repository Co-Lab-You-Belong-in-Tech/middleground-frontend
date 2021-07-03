import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { MenuItem, Select, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { DateTime } from "luxon";

function Searchbar({ setResults, setLoading }) {
  const [value, setValue] = useState("");
  const [bias, setBias] = useState("center");
  const [orderBy, setOrderBy] = useState("publishedAt");
  const [timePeriod, setTimePeriod] = useState("threeDays");
  const [fromDate, setFromDate] = useState(DateTime.now().toSQLDate());
  var toDate = DateTime.now().toSQLDate();

  async function callingApi(value, bias, fromDate, toDate, orderBy) {
    if (value === "") return;
    setLoading(true);
    console.log(value, bias, fromDate, toDate, orderBy);
    try {
      var res = await fetch(
        `https://middleground-backend.herokuapp.com/searchTerm?query=${value}&view=${bias}&datefrom=${fromDate}&dateto=${toDate}&order=${orderBy}`
      );

      if (res.ok) {
        res = await res.json();
        await setResults(res.articles);
      } else {
        alert("No articles found!");
        setResults([]);
      }
      setLoading(false);
    } catch (error) {
      console.log("CATCHING");
      await setResults([]);
      setLoading(false);
    }
  }

  function handleBiasChange(event) {
    setBias(() => event.target.value);
    callingApi(value, event.target.value, fromDate, toDate, orderBy);
  }

  function handleOrderBy(event) {
    setOrderBy(() => event.target.value);
    callingApi(value, bias, fromDate, toDate, event.target.value);
  }

  function handleTimePeriod(event) {
    setTimePeriod(event.target.value);
    var now = DateTime.now();
    var period = event.target.value;
    var fromDate;
    if (period === "threeDays") {
      fromDate = now.minus({ days: 3 }).toSQLDate();
    } else if (period === "tenDays") {
      fromDate = now.minus({ days: 7 }).toSQLDate();
    } else {
      fromDate = now.minus({ days: 30 }).toSQLDate();
    }
    setFromDate(() => fromDate);
    callingApi(value, bias, fromDate, toDate, orderBy);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (event.key !== "Enter" || value === "") {
      return;
    }
    callingApi(value, bias, fromDate, toDate, orderBy);
  }

  return (
    <div>
      <div className="heading heading-flex">
        <h1>MiddleGround</h1>
        <TextField
          color="primary"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label={`Search Term`}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onKeyUp={handleSubmit}
          variant="outlined"
          className="search-bar"
        />
      </div>
      {orderBy !== "popularity" && (
        <div className="bias-picker">
          <label className="bias-label">Bias: </label>
          <Select
            style={{ width: "80%" }}
            onChange={handleBiasChange}
            value={bias}
          >
            <MenuItem value="all">
              <p className="menu-item">All News</p>
            </MenuItem>
            <MenuItem value="center">
              <p className="menu-item">Center</p>
            </MenuItem>
            <MenuItem value="left">
              <p className="menu-item">Left</p>
            </MenuItem>
            <MenuItem value="right">
              <p className="menu-item">Right</p>
            </MenuItem>
          </Select>
        </div>
      )}

      <div className="sorting-selector-container">
        <Select
          variant="outlined"
          onChange={handleOrderBy}
          value={orderBy}
          className="order-by"
        >
          <MenuItem value="publishedAt">Latest</MenuItem>
          <MenuItem value="popularity">Most popular source</MenuItem>
        </Select>
        {orderBy !== "publishedAt" && (
          <Select
            onChange={handleTimePeriod}
            value={timePeriod}
            className="order-by"
            variant="outlined"
          >
            <MenuItem value="threeDays">Past 3 days</MenuItem>
            <MenuItem value="tenDays">Past 7 days</MenuItem>
            <MenuItem value="month">Past 30 days</MenuItem>
          </Select>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
