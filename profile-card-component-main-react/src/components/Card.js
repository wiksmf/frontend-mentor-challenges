import React from 'react';

function Card(props) {
  return (
    <div className="card">
      <div className="card__header"></div>

      <div className="card__profile">
        <img className="card__profile-photo" src={props.image} alt="" />
        <h1 className="card__profile-name u-mt-lg">
          {props.name}
          <span className="card__profile-age"> {props.age}</span>
        </h1>
        <p className="card__profile-location">{props.location}</p>
      </div>

      <div className="card__social">
        <div className="card__social-info">
          <h2 className="card__social-data">{props.followers}</h2>
          <p className="card__social-item">Followers</p>
        </div>
        <div className="card__social-info">
          <h2 className="card__social-data">{props.likes}</h2>
          <p className="card__social-item">Likes</p>
        </div>
        <div className="card__social-info">
          <h2 className="card__social-data">{props.photos}</h2>
          <p className="card__social-item">Photos</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
