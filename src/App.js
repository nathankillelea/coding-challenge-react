import React, { useEffect, useState } from 'react';
import axios from 'axios';
import mock_data from './data/MOCK_DATA.json';
import FadeLoader from 'react-spinners/FadeLoader';
import Filter from './components/Filter.js';
import Sort from './components/Sort.js';
import Card from './components/Card.js';
import styles from './App.module.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(mock_data);
  const [filter, setFilter] = useState();

  useEffect(() => {
    axios.all([
      axios({
        url: 'https://graphql.anilist.co',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        data: {
          query: `
            query {
              Page(page: 1, perPage: 50) {
                media {
                  id,
                  title {
                    english,
                    native
                  }
                }
              }
            }
          `
        }
      }),
      axios({
        url: 'https://graphql.anilist.co',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        data: {
          query: `
            query {
              Page(page: 2, perPage: 50) {
                media {
                  id,
                  title {
                    english,
                    native
                  }
                }
              }
            }
          `
        }
      }),
      axios({
        url: 'https://randomuser.me/api/?gender=female&results=100&inc=picture'
      })
    ])
    .then(axios.spread((obj1, obj2, obj3) => {
      let animeData = obj1.data.data.Page.media.concat(obj2.data.data.Page.media);
      let clonedData = [...data];
      for(let i = 0; i < animeData.length; i++) {
        clonedData[i].profile_picture = obj3.data.results[i].picture.large;
        if(animeData[i].title.english) {
          clonedData[i].favorite_anime = animeData[i].title.english;
        }
        else {
          clonedData[i].favorite_anime = animeData[i].title.native;
        }
      }
      setData(clonedData);
      setLoading(false);
    }))
    .catch((error) => {
      alert('Error Retrieving Data');
      console.log(error);
    });
  }, []);

  const filters = [
    {id: 0, value: 'All'},
    {id: 1, value: 'Aquamarine', rgb: 'rgb(127, 255, 212)'},
    {id: 2, value: 'Blue', rgb: 'rgb(0, 0, 255)'},
    {id: 3, value: 'Crimson', rgb: 'rgb(220, 20, 60)'},
    {id: 4, value: 'Fuscia', rgb: 'rgb(255, 0, 255)'},
    {id: 5, value: 'Goldenrod', rgb: 'rgb(218, 165, 32)'},
    {id: 6, value: 'Green', rgb: 'rgb(0, 255, 0)'},
    {id: 7, value: 'Indigo', rgb: 'rgb(63, 0, 255)'},
    {id: 8, value: 'Khaki', rgb: 'rgb(195, 176, 145)'},
    {id: 9, value: 'Maroon', rgb: 'rgb(128, 0, 0)'},
    {id: 10, value: 'Mauv', rgb: 'rgb(224, 176, 255)'},
    {id: 11, value: 'Orange', rgb: 'rgb(255, 128, 0)'},
    {id: 12, value: 'Pink', rgb: 'rgb(255, 192, 203)'},
    {id: 13, value: 'Puce', rgb: 'rgb(204, 136, 153)'},
    {id: 14, value: 'Purple', rgb: 'rgb(128, 0, 128)'},
    {id: 15, value: 'Red', rgb: 'rgb(255, 0, 0)'},
    {id: 16, value: 'Teal', rgb: 'rgb(0, 128, 128)'},
    {id: 17, value: 'Turquoise', rgb: 'rgb(64, 224, 208)'},
    {id: 18, value: 'Violet', rgb: 'rgb(127, 0, 255)'},
    {id: 19, value: 'Yellow', rgb: 'rgb(255, 255, 0)'}
  ];

  const filteredData = filter && filter !== 'All' ? data.filter(data => {
    return data.section === filter;
  }) : data;

  const cards = filteredData.map(data => {
    return (
      <Card 
        key={data.id}
        id={data.id}
        profilePicture={data.profile_picture}
        firstName={data.first_name}
        lastName={data.last_name}
        email={data.email}
        jobTitle={data.job_title}
        favoriteAnime={data.favorite_anime}
        section={data.section}
      />
    );
  });

  return (
    <div className={styles.App}>
      {
        loading
        ?
        <div className={styles.loadingContainer}>
          <FadeLoader color={'hsl(210, 2%, 37%)'} />
        </div>
        :
        <div className={styles.container}>
          <div className={styles.dropdownContainer}>
            <Sort data={data} setData={setData} />
            <Filter filters={filters} filter={filter} setFilter={setFilter} />
          </div>
          <div className={styles.cardsContainer}>
            {cards}
          </div>
        </div>
      }
    </div>
  );
}

export default App;
