import React, { useState } from 'react'
import { Select, FormControl, FormHelperText, MenuItem, TextField } from '@material-ui/core';
import ReactCountryFlag from "react-country-flag"
import { useForm } from 'react-hook-form';
import countryData from '../../../assets/data/countryData'
import SvgIcon from '@material-ui/core/SvgIcon';

const CountrySelector = () => {
  const [selectedCountry, setSelectedCountry] = useState('')
  const { register } = useForm();
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  let schoolcode = 'US'
  let data = [
    {
      "id": 1,
      "name": "Afghanistan",
      "dialing_code": "93",
      "iso_code": "AF"
    },
    {
      "id": 2,
      "name": "Albania",
      "dialing_code": "355",
      "iso_code": "AL"
    }
  ]

  const changeHandler = value => {
    setSelectedCountry(value)
  }
  console.log(countryData)

  return (
    <>
      <FormControl>
        <TextField
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
        />

      </FormControl>
    </>
  )
}

export default CountrySelector;