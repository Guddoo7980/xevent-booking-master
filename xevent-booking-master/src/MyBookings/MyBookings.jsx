import React, { useEffect, useState } from 'react';
import styles from './MyBookings.module.css';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookings')||'[]');
    setBookings(saved);
  }, []);

  return (
    <div className={styles.page}>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b,i) => (
          <div key={i} className={styles.card}>
            <h3>{b.eventName}</h3>
            <p>{b.address}, {b.city}, {b.state}</p>
          </div>
        ))
      )}
    </div>
  );
}