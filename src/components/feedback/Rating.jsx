import React, { useState, useEffect } from 'react';
import { Rating } from '@mui/material';
import styles from './Rating.module.css';

export default function RatingForm({ rating, onRatingChange }) {
    const [localRating, setLocalRating] = useState(rating);

    useEffect(() => {
        setLocalRating(rating); // Initialize local rating from props
    }, [rating]);

    useEffect(() => {
        onRatingChange(localRating);
    }, [localRating]);

    return (
        <div className={styles.feedbackForm}>
            <span>Rate this conversation:</span>
            <Rating
                value={localRating}
                onChange={(e, newValue) => setLocalRating(newValue)}
                className={styles.ratings}
            />
        </div>
    );
}
