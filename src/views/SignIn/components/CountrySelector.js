import React, { useState } from 'react'
import { Select, FormControl, FormHelperText, MenuItem, TextField } from '@material-ui/core';
import ReactCountryFlag from "react-country-flag"
import { useForm } from 'react-hook-form';
import countryData from '../../../assets/data/countryData'
import SvgIcon from '@material-ui/core/SvgIcon';

const CountrySelector = ({ handleChange, value, inputRef, data, name }) => {
  const { register } = useForm();
  return (
    <>
      <TextField
        select
        // label="country code"
        defaultValue={value}
        onChange={handleChange}
        variant="outlined"
        inputRef={register}
        name={name}
      >
        {data.map((option) => (
          <option key={option.id} value={option.iso_code}>
            {option.name} {option.dialing_code}
          </option>
        ))}
      </TextField>
      {/* <TextField
          id="outlined-select-currency-native"
          select
          label="country"
          value={currency}
          onChange={handleChange}
          // SelectProps={{
          //   native: true,
          // }}
          variant="outlined"
        >
          {countryData.map((option) => (
            <option key={option.id} value={option.iso_code}>
              {option.dialing_code}
              {
                <ReactCountryFlag
                  className="emojiFlag"
                  countryCode={option.iso_code}
                  style={{
                    fontSize: '2em',
                    lineHeight: '2em',
                  }}
                  aria-label="United States"
                  svg
                />
              }
            </option>
          ))}
        </TextField>
        <ReactCountryFlag
          className="emojiFlag"
          countryCode={'US'}
          style={{
            fontSize: '2em',
            lineHeight: '2em',
          }}
          aria-label="United States"
          svg
        /> */}

    </>
  )
}

export default CountrySelector;