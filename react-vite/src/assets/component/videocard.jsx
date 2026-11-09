function VideoCard({ video, title, description, iconPp, author, role, price }) {
  return (
    <article className="video-card">
      <video src={video} controls />

      <div className="video-content">
        <h3>{title}</h3>

        <p>{description}</p>

        <div className="author">
          <img src={iconPp} alt={author} />

          <div>
            <span>{author}</span>
            <small>{role}</small>
          </div>
        </div>

        <div className="card-footer">
          <div className="rating">⭐⭐⭐⭐⭐</div>
          <strong className="price">{price}</strong>
        </div>

      </div>
    </article>
  );
}

export default VideoCard;
