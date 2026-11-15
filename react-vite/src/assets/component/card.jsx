import "../styles/card.css";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

function Stars({ score }) {
  return (
    <span className="stars-wrap">
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = score >= n ? 100 : score >= n - 0.5 ? 50 : 0;
        return (
          <span key={n} className="star" style={{ "--fill": `${fill}%` }}>
            ★
          </span>
        );
      })}
    </span>
  );
}

function VideoCard({ course }) {
  const navigate = useNavigate();
  const score = parseFloat(course.rating) || 0;

  const handleCardClick = () => {
    const target = `/information/${course.id}`;

    if (getCurrentUser()) {
      // sudah login: buka informasi produk sesuai id card
      navigate(target);
    } else {
      // belum login: ke halaman login, lalu kembali ke produk ini setelah login
      navigate("/login", { state: { from: target } });
    }
  };

  return (
    <div
      className="video-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <img src={course.image} alt={course.title} className="video-card-image" />

      <div className="video-card-content">
        <h3>{course.title}</h3>

        <p className="video-card-desc">{course.description}</p>

        <div className="video-card-author">
          <img
            src={course.avatar}
            alt={course.author}
            className="video-card-avatar"
          />
          <div className="author-info">
            <p>{course.author}</p>
            <span>
              {course.role}
              {course.company && (
                <span className="company-text">
                  {" "}
                  di <b>{course.company}</b>
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="video-card-footer">
          <div className="video-card-rating">
            <Stars score={score} />
            <small>{course.rating}</small>
          </div>
          <strong>{course.price}</strong>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
