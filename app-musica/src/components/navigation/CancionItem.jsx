import { useState } from "react";
import songService from "../../features/listas/songService";
import "../../index.css";

const CancionItem = ({ songs, user }) => {
  const [AlbumArtSrc, setAlbumArtSrc] = useState(
    "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
  );

  if (user && user.token) {
    songService.getAlbumArt(user.token, songs.album).then(function (data) {
      setAlbumArtSrc(data.album);
    });
  }

  return (
    <div className="tarea">
      <div>
        <img className="imageCard" src={AlbumArtSrc} />
      </div>
      <div>{songs.song}</div>
      <h2>{songs.artist}</h2>
      <div className="form-group">
        <button className="btn-btn-block" type="submit">
          Agregar a lista
        </button>
      </div>
    </div>
  );
};
export default CancionItem;
