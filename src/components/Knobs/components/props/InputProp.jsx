import React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';


const styles = StyleSheet.create({
  inputProp: {
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
    display: 'flex',
    alignItems: 'center',
    borderRadius: 2,
    border: '1px solid rgba(84, 110, 122, 0.23)',
    padding: '0 7px',
    color: 'rgba(0, 0, 0, 0.7)',
    outline: 'none !important',
    '&:focus': {
      border: '1px solid rgba(84, 110, 122, 0.4)',
    },
  },
});


const InputProp = ({
  prop,
  value,
  onChange,
}) => {
  const { key } = prop;
  return (
    <div className={css(styles.inputProp)}>
      <label
        htmlFor={key}
        className={css(styles.label)}>
        {key}
      </label>
      <input
        id={key}
        name={key}
        value={value || ''}
        className={css(styles.input)}
        onChange={(e) => onChange(e.target.value, e.target.name)} />
    </div>
  );
}


export default InputProp;
