import React from 'react';
import styles from './IconCard.css';
import PropTypes from 'prop-types';
import "./IconCard.css"

export default function IconCard({ src, alt, label }) {
  return (
    <div className={styles.card}>
      <img src={require(`../../assets/${src}`)} alt={alt} />
      <span>{label}</span>
    </div>
  );
}

IconCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  label: PropTypes.string.isRequired,
};
