import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, char =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18
    }
  }
});

const EventFilter = props => {
  const classes = useStyles();
  const { filterOptions, filterLabel, isCountryFilter } = props;
  return (
    <Autocomplete
      id="country-select-demo"
      style={{ width: 300 }}
      options={filterOptions}
      classes={{
        option: classes.option
      }}
      autoHighlight
      getOptionLabel={option => option.label}
      renderOption={option => (
        <>
          {isCountryFilter ? <span>{countryToFlag(option.code)}</span> : null}
          {option.label}
        </>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label={filterLabel}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password' // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

EventFilter.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  filterOptions: PropTypes.array.isRequired,
  filterLabel: PropTypes.string.isRequired,
  isCountryFilter: PropTypes.bool
};

export default EventFilter;
