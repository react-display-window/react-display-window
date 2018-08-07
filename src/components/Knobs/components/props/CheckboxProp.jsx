import React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';


const styles = StyleSheet.create({
  checkboxProp: {

  },
  label: {

  },
  input: {

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
        <span>{key}</span>
        <input
          id={key}
          type="checkbox"
          name={key}
          className={css(styles.input)}
          checked={value}
          onChange={(e) => onChange( ! value, e.target.name)} />
      </label>
    </div>
  );
}


export default CheckboxProp;
