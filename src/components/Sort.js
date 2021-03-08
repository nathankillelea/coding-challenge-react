import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useOnClickOutside } from '../hooks/useOnClickOutside.js';
import styles from './Sort.module.css';

const Sort = ({data, setData}) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setIsListOpen(false));
  const [sort, setSort] = useState();
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    switch(sort) {
      case 'Id':
        setData([...data].sort((a, b) => a.id - b.id));
        break;
      case 'First Name':
        setData([...data].sort((a, b) => a.first_name.localeCompare(b.first_name)));
        break;
      case 'Last Name':
        setData([...data].sort((a, b) => a.last_name.localeCompare(b.last_name)));
        break;
      case 'Email':
        setData([...data].sort((a, b) => a.email.localeCompare(b.email)));
        break;
      case 'Job Title':
        setData([...data].sort((a, b) => a.job_title.localeCompare(b.job_title)));
        break;
      case 'Favorite Anime':
        setData([...data].sort((a, b) => a.favorite_anime.localeCompare(b.favorite_anime)));
    }
  }, [sort])

  const items = ['Id', 'First Name', 'Last Name', 'Email', 'Job Title', 'Favorite Anime']

  const sortValues = items.map(item => {
    return (
      <li
        className={styles.listItem}
        style={{backgroundColor: sort === item ? 'hsl(206, 33%, 90%)' : null}}
        onClick={() => {
          setSort(item);
        }}
      >
        {item}
      </li>
    );
  });

  return (
    <div className={styles.container} ref={ref} onClick={() => setIsListOpen(!isListOpen)}>
      <div className={styles.header}>
        <h1 className={styles.headerText}>{sort ? sort : 'Sort By'}<FontAwesomeIcon icon={isListOpen ? faCaretUp : faCaretDown} className={styles.filterIcon} /></h1>
      </div>
      {isListOpen ?
        <ul className={styles.list}>
          {sortValues}
        </ul>
        :
        <></>
      }
    </div>
  );
}

export default Sort;