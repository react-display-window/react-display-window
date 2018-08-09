import React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';


const styles = StyleSheet.create({
  checkboxProp: {
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
  },
});


const CheckboxProp = ({
  prop,
  value,
  onChange,
}) => {
  const { key } = prop;
  return (
    <div className={css(styles.checkboxProp)}>
      <label htmlFor={key}>
        <span className={css(styles.label)}>{key}</span>
        <input
          id={key}
          type="checkbox"
          name={key}
          className={css(styles.input)}
          checked={value || false}
          onChange={(e) => onChange( ! value, e.target.name)} />
      </label>
    </div>
  );
}


export default CheckboxProp;
