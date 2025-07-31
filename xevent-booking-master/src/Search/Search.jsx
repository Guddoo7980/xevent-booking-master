
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookingModal from '../components/BookingModal/BookingModal';
import styles from './Search.module.css';

const API = 'https://eventdata.onrender.com';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const q          = useQuery();
  const state      = q.get('state');
  const city       = q.get('city');
  const [events, setEvents]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selectedEvent, setEvent] = useState(null);

  useEffect(() => {
    if (!state || !city) return;
    fetch(`${API}/events?state=${state}&city=${city}`)
      .then(r => r.json())
      .then(data => {
        const cleaned = data.map(evt => ({
          id:     evt.id,
          name:   evt.eventName,
          addr:   evt.address,
          city:   evt.city,
          state:  evt.state,
          rating: evt.overallRating,
        }));
        setEvents(cleaned);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [state, city]);

  if (loading) return <p className={styles.loading}>Loading…</p>;

  return (
    <div className={styles.container}>
      <h1>{events.length} events available in {city}</h1>
      <div className={styles.grid}>
        {events.map(evt => (
          <div key={evt.id} className={styles.card}>
            <h3>{evt.name}</h3>
            <p>{evt.addr}</p>
            <p>Rating: {evt.rating}</p>
            <button onClick={() => setEvent(evt)}>
              Book FREE Event
            </button>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <BookingModal event={selectedEvent} onClose={() => setEvent(null)} />
      )}
    </div>
  );
}
