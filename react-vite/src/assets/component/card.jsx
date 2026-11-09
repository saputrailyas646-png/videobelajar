function VideoCard({ course }) {
return (
  <div className="video-card">
    <img src={course.image} alt={course.title} className="video-card-image" />
    <div className="video-card-content">
      <h3>{course.title}</h3>
      <div className="video-card-author">
        <img
          src={course.avatar}
          alt={course.author}
          className="video-card-avatar"
        />
        <div className="author-info">
          <p>{course.author}</p>
          <span>{course.role}</span>
        </div>
      </div>
      <div className="video-card-footer">
        <div className="video-card-rating">
          <span className="stars">★★★</span>
          <span className="empty-stars">★★</span>
          <small>{course.rating}</small>
        </div>
        <strong>{course.price}</strong>
      </div>
    </div>
  </div>
);
}
export default VideoCard;
