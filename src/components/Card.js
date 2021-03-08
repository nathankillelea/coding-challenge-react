import React, { useEffect, useState } from 'react';
import styles from './Card.module.css';

const Card = ({id, profilePicture, firstName, lastName, email, jobTitle, favoriteAnime, section}) => {
  let color = '';
  
  switch(section) {
    case 'Teal':
      color = 'rgb(0, 128, 128)';
      break;
    case 'Indigo':
      color = 'rgb(63, 0, 255)';
      break;
    case 'Purple':
      color = 'rgb(128, 0, 128)';
      break;
    case 'Maroon':
      color = 'rgb(128, 0, 0)';
      break;
    case 'Orange':
      color = 'rgb(255, 128, 0)';
      break;
    case 'Khaki':
      color = 'rgb(195, 176, 145)';
      break;
    case 'Puce':
      color = 'rgb(204, 136, 153)';
      break;
    case 'Aquamarine':
      color = 'rgb(127, 255, 212)';
      break;
    case 'Yellow':
      color = 'rgb(255, 255, 0)';
      break;
    case 'Pink':
      color = 'rgb(255, 192, 203)';
      break;
    case 'Red':
      color = 'rgb(255, 0, 0)';
      break;
    case 'Fuscia':
      color = 'rgb(255, 0, 255)';
      break;
    case 'Mauv':
      color = 'rgb(224, 176, 255)';
      break;
    case 'Green':
      color = 'rgb(0, 255, 0)';
      break;
    case 'Crimson':
      color = 'rgb(220, 20, 60)';
      break;
    case 'Turquoise':
      color = 'rgb(64, 224, 208)';
      break;
    case 'Violet':
      color = 'rgb(127, 0, 255)';
      break;
    case 'Goldenrod':
      color = 'rgb(218, 165, 32)';
      break;
    case 'Blue':
      color = 'rgb(0, 0, 255)';
      break;
    default:
      color = 'rgb(0, 0, 0)';
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.leftCardContainer}>
          <img className={styles.profilePicture} src={profilePicture}></img>
          <div>
            <h1 className={styles.nameText}>{firstName + ' ' + lastName + ' : ' + id}</h1>
            <h2 className={styles.jobText}>{jobTitle}</h2>
            <a className={styles.emailText} href={'mailto:' + email}>{email}</a>
            <h2 className={styles.favoriteAnimeText}>Favorite Anime: <i>{favoriteAnime}</i></h2>
          </div>
        </div>
        <div className={styles.colorSplotch} style={{backgroundColor: color}} />
      </div>
    </div>
  );
}

export default Card;