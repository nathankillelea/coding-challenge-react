import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useOnClickOutside } from '../hooks/useOnClickOutside.js';
import styles from './Filter.module.css';

const Filter = ({filters, filter, setFilter}) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setIsListOpen(false));
  const [isListOpen, setIsListOpen] = useState(false);

  const filterValues = filters.map(item => {
    return (
      <li
        className={styles.listItem}
        key={item.id}
        style={{backgroundColor: filter === item.value ? 'hsl(206, 33%, 90%)' : null}}
        onClick={() => {
          setFilter(item.value);
        }}
      >
        {item.value}
        <div className={styles.colorSplotch} style={{backgroundColor: item.rgb}} />
      </li>
    );
  });

  return (
    <div className={styles.container} ref={ref} onClick={() => setIsListOpen(!isListOpen)}>
      <div className={styles.header}>
        <h1 className={styles.headerText}>{filter ? filter : 'Filter By'}<FontAwesomeIcon icon={isListOpen ? faCaretUp : faCaretDown} className={styles.filterIcon} /></h1>
      </div>
      {isListOpen ?
        <ul className={styles.list}>
          {filterValues}
        </ul>
        :
        <></>
      }
    </div>
  );
}

export default Filter;