import React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';


const styles = StyleSheet.create({
  selectProp: {
    margin: '8px 0',
  },
  label: {
    color: 'rgba(0, 0, 0, 0.8)',
    display: 'block',
    fontSize: '0.7em',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  input: {
    height: 35,
    width: '100%',
    display: 'block',
    borderRadius: 2,
    border: '1px solid rgba(84, 110, 122, 0.23)',
    color: 'rgba(0, 0, 0, 0.7)',
    outline: 'none !important',
    '&:focus': {
      border: '1px solid rgba(84, 110, 122, 0.4)',
    },
  },
});


const SelectProp = ({
  prop,
  value,
  onChange,
}) => {
  const { key, type } = prop;
  const { value: values } = type;
  return (
    <div className={css(styles.selectProp)}>
      <label className={css(styles.label)} htmlFor={key}>
        {key}
      </label>
      <select
        id={key}
        className={css(styles.input)}
        name={key}
        value={value}
        onChange={(e) => onChange(e.target.value, e.target.name)}>
        {values.map((v) => (
          <option key={v.value} value={v.value.replace(/'/g, '')}>{v.value.replace(/'/g, '')}</option>
        ))}
      </select>
    </div>
  );
}


export default SelectProp;
