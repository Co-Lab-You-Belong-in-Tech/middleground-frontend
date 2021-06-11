import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MenuItem, Select } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function Searchbar({ setResults, setLoading }) {
  // const [loading, isLoading] = useState(false);
  const [value, setValue] = useState("");
  const [view, setView] = useState("center");
  const [orderBy, setOrderBy] = useState("publishedAt");
  const [selectFromDate, setSelectFromDate] = useState(new Date());
  const [selectToDate, setSelectToDate] = useState(new Date());

  function handleFromDateChange(date) {
    setSelectFromDate(date);
  }
  function handleToDateChange(date) {
    setSelectToDate(date);
  }

  function handleChange(event) {
    // console.log(event.target.value);
    setView(event.target.value);
  }

  function handleOrderBy(event) {
    setOrderBy(event.target.value);
  }

  function formatDate(date) {
    var [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];
    day = day.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    month = month + 1;

    month = month.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const returnDate = `${year}-${month}-${day}`;
    return returnDate;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    // console.log(event);
    var fromDate = formatDate(selectFromDate);
    var toDate = formatDate(selectToDate);

    try {
      var res = await fetch(
        `http://localhost:3500/searchTerm?query=${value}&view=${view}&datefrom=${fromDate}&dateto=${toDate}&order=${orderBy}`
      );

      if (res.ok) {
        res = await res.json();
        // console.log(res);
        await setResults(res.articles);
      } else {
        alert("No articles found!");
        setResults([]);
      }
      setLoading(false);
    } catch (error) {
      // console.log(error);
      console.log("CATCHING");
      await setResults([]);
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      style={{ display: "block", margin: "0 auto" }}
    >
      <TextField
        color="secondary"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Search Term"
        required
        style={{ width: "100%" }}
      />
      <Select style={{ margin: 20 }} onChange={handleChange} value={view}>
        <MenuItem value="center">center</MenuItem>
        <MenuItem value="left">left</MenuItem>
        <MenuItem value="right">right</MenuItem>
      </Select>
      <Select style={{ margin: 15 }} onChange={handleOrderBy} value={orderBy}>
        <MenuItem value="publishedAt">Latest</MenuItem>
        <MenuItem value="popularity">Most popular source</MenuItem>
        <MenuItem value="relevancy">
          Most relevant to {value || "search term"}
        </MenuItem>
      </Select>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy/MM/dd"
          margin="normal"
          label="From Date"
          disableFuture={true}
          value={selectFromDate}
          onChange={handleFromDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy/MM/dd"
          margin="normal"
          label="To Date"
          disableFuture={true}
          value={selectToDate}
          onChange={handleToDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>

      <Button type="submit" variant="outlined" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default Searchbar;
