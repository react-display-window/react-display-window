import React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';

import { getProps } from './utils';


const styles = StyleSheet.create({
  table: {
    width: '100%',
    marginTop: 32,
    marginBottom: 30,
    border: '1px solid rgba(84, 110, 122, 0.3)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  row: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '&:nth-child(odd)': {
      background: 'rgba(84, 110, 122, 0.03)',
    }
  },
  cell: {
    flex: 1,
    padding: '16px',
    lineHeight: 1.5,
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: '0.9em',
    fontFamily: '"Fira Code", "Menlo", monospace',
  },
  bigCell: {
    flex: 2,
  },
  header: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    fontSize: '0.8em',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.8)',
    background: 'rgba(84, 110, 122, 0.1) !important',
  },
  headerCell: {
    padding: '12px 16px',
    paddingTop: 14,
  },
});


const PropsTable = ({
  component,
}) => {
  const props = getProps(component);
  return (
    <div className={css(styles.table)}>
      <div className={css(styles.row, styles.header)}>
        <div className={css(styles.cell, styles.headerCell)}>
          Name
        </div>
        <div className={css(styles.cell, styles.headerCell)}>
          Type
        </div>
        <div className={css(styles.cell, styles.headerCell)}>
          Default
        </div>
        <div className={css(styles.cell, styles.headerCell)}>
          Required
        </div>
        <div className={css(styles.cell, styles.headerCell, styles.bigCell)}>
          Description
        </div>
      </div>
      {Object.keys(props).map((key) => (
        <div key={key} className={css(styles.row)}>
          <div className={css(styles.cell)}>
            {key}
          </div>
          <div className={css(styles.cell)}>
            {props[key].type.name}
          </div>
          <div className={css(styles.cell)}>
            {props[key].defaultValue?.value.replace(/'/g, '') || null}
          </div>
          <div className={css(styles.cell)}>
            {String(props[key].required)}
          </div>
          <div className={css(styles.cell, styles.bigCell)}>
            {do {
              if (props[key].description) {
                props[key].description;
              }
              else if (props[key].type.name === 'enum') {
                const values = props[key].type.value.map((v) => v.value.replace(/'/g, ''));
                `One of: ${values.join(', ')}`;
              }
            }}
          </div>
        </div>
      ))}
    </div>
  );
};


export default PropsTable;
