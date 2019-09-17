import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";

import { connect } from "react-redux";
import { filterGrants } from "../actions/index";

const Filters = ({ filterGrants }) => {
  const [filters, setFilters] = useState({
    region: [],
    amount: [],
    area_focus: []
  });

  const grantFilters = {
      color: "primary",
      region: ["Global", "North America", "Europe", "South America", "Africa"],
      amount: ["Under $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000+"],
      area_focus: ["Business", "Technology", "Science", "Creative"],
      minority: ["Women", "African American", "Hispanic", "Other"]
  }

  const handleChanges = e => {
    console.log("who", e.target.name);
    if (!e.target.checked) {
      setFilters({
        ...filters
      });
    } else {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value
      });
    }
    console.log("List", filters);
  };
  return (
    <div>
      <h2>Filter Grants By:</h2>

      <form>
        <FormControl component="fieldset">
          <FormLabel component="legend">Grant Amount</FormLabel>
          {grantFilters.amount.map(name => {
              return <FormControlLabel control={<Checkbox value={name} color={grantFilters.color} />} label={name}/>
          })}
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Area Focus</FormLabel>
          {grantFilters.area_focus.map(name => {
              return <FormControlLabel control={<Checkbox value={name} color={grantFilters.color} />} label={name}/>
          })}
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Region</FormLabel>
          {grantFilters.region.map(name => {
              return <FormControlLabel control={<Checkbox value={name} color={grantFilters.color} />} label={name}/>
          })}
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Minority</FormLabel>
          {grantFilters.minority.map(name => {
              return <FormControlLabel control={<Checkbox value={name} color={grantFilters.color} />} label={name}/>
          })}
        </FormControl>

      </form>
    </div>
  );
};

export default connect(
  null,
  { filterGrants }
)(Filters);
