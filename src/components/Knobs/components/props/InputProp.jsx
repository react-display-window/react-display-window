import React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';


const styles = StyleSheet.create({
  inputProp: {

  },
  label: {

  },
  input: {

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
        value={value}
        className={css(styles.input)}
        onChange={(e) => onChange(e.target.value, e.target.name)} />
    </div>
  );
}


export default InputProp;
