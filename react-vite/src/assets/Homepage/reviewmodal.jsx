import { useState } from "react";
import "../styles/review.css";

export default function ReviewModal({ initial, onCancel, onSubmit }) {
  const [rating, setRating] = useState(initial?.rating || 0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState(initial?.text || "");

  return (
    <div className="rv-overlay" onClick={onCancel}>
      <div className="rv-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Tulis Review Terbaikmu!</h3>
        <p>Bagaimana pengalaman belajarmu di kelas ini?</p>

        <div className="rv-stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              className={`rv-star ${n <= (hover || rating) ? "on" : ""}`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              aria-label={`${n} bintang`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          rows={3}
          placeholder="Masukkan Review"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="rv-actions">
          <button type="button" className="rv-cancel" onClick={onCancel}>
            Batal
          </button>
          <button
            type="button"
            className="rv-submit"
            disabled={rating === 0}
            onClick={() => onSubmit({ rating, text: text.trim() })}
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
