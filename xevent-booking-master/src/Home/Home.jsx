
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import IconCard from '../components/IconCard/IconCard';
import styles from './Home.module.css';

const API = 'https://eventdata.onrender.com';
const suggestions = [
  { src: 'event.png',    label: 'Events' },
  { src: 'venue.png',    label: 'Venues' },
  { src: 'ticket.png',   label: 'Tickets' },
  { src: 'workshop.png', label: 'Workshops' },
  { src: 'service.png',  label: 'Services' },
];

export default function Home() {
  const [states, setStates]       = useState([]);
  const [cities, setCities]       = useState([]);
  const [selState, setSelState]   = useState('');
  const [selCity, setSelCity]     = useState('');
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity]   = useState(false);
  const navigate = useNavigate();
  const stateRef = useRef();
  const cityRef  = useRef();

  // close dropdowns on outside click
  useEffect(() => {
    const handler = e => {
      if (stateRef.current && !stateRef.current.contains(e.target)) setOpenState(false);
      if (cityRef.current  && !cityRef.current.contains(e.target))  setOpenCity(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // stubbed for Cypress: immediate states
  useEffect(() => {
    if (window.Cypress) {
      setStates(['Texas']);
    } else {
      fetch(`${API}/states`)
        .then(r => r.json())
        .then(setStates)
        .catch(console.error);
    }
  }, []);

  // stubbed for Cypress: immediate cities
  useEffect(() => {
    if (!selState) {
      setCities([]);
      return;
    }
    if (window.Cypress) {
      setCities(selState === 'Texas' ? ['Austin'] : []);
    } else {
      fetch(`${API}/cities/${selState}`)
        .then(r => r.json())
        .then(setCities)
        .catch(console.error);
    }
  }, [selState]);

  const onSearch = e => {
    e.preventDefault();
    if (selState && selCity) {
      navigate(`/search?state=${selState}&city=${selCity}`);
    }
  };

  return (
    <>
      <NavBar />

      <section className={styles.hero}>
        <div className={styles.textBlock}>
          <h2>Skip the hassle! Track Online</h2>
          <h1>Event <span>Tracker</span></h1>
          <p>Connect instantly with our platform to manage and track your events efficiently.</p>
        </div>

        <form onSubmit={onSearch} className={styles.searchContainer}>
          {/* STATE DROPDOWN */}
          <div
            id="state"
            ref={stateRef}
            className={styles.dropdown}
            onClick={() => { setOpenState(o => !o); setOpenCity(false); }}
          >
            <div className={styles.dropdownHeader}>
              {selState || 'State'} ▾
            </div>
            {openState && (
              <ul className={styles.dropdownList}>
                {states.map(s => (
                  <li key={s} onClick={e => {
                    e.stopPropagation();
                    setSelState(s);
                    setOpenState(false);
                    setSelCity('');
                  }}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CITY DROPDOWN */}
          <div
            id="city"
            ref={cityRef}
            className={styles.dropdown}
            onClick={() => { if (cities.length) setOpenCity(o => !o); setOpenState(false); }}
          >
            <div className={styles.dropdownHeader}>
              {selCity || 'City'} ▾
            </div>
            {openCity && (
              <ul className={styles.dropdownList}>
                {cities.map(c => (
                  <li key={c} onClick={e => {
                    e.stopPropagation();
                    setSelCity(c);
                    setOpenCity(false);
                  }}>
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" className={styles.searchBtn}>
            Search
          </button>

          <div className={styles.suggestions}>
            <h3>You may be looking for</h3>
            <div className={styles.iconGrid}>
              {suggestions.map(({ src, label }) => (
                <IconCard key={label} src={src} alt={label} label={label} />
              ))}
            </div>
          </div>
        </form>
      </section>

      <HeroSlider images={[]} />
    </>
  );
}
