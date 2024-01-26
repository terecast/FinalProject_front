import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/navigation/Sidebar";
import Spinner from "../components/navigation/Spinner";
import { getSongs,filterSongs, reset } from "../features/listas/songSlice";
import CancionItem from "../components/navigation/CancionItem";
import songService from "../features/listas/songService";

export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { songs,songFilter, isLoading, isError, message } = useSelector((state) => {
    return state.songs;
  });
  const [songsFilter, setSongsFilter] = useState([]);
  const [texto,setTexto] = useState([]);
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      dispatch(getSongs());

      if (user) {
        songService.getSongs(user.token).then(function (data) {
          setSongsFilter(data);
          setAllSongs(data);
        });
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

const setFiltro = (e) => {
    let value = e.target.value;
    setTexto(value)

    dispatch(filterSongs({data:allSongs,filter:value}))
    /*if (!value) {
        setSongsFilter(allSongs)
    }else{
       
        const filteredSongs  = allSongs.filter((song) => 
            song.song.toLowerCase().includes(value.toLowerCase()));
     
     setSongsFilter(filteredSongs);
     
    }*/
}

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Sidebar user={user} />
      <main>
        <section className="heading">
          <h1> Bienvenido {user && user.name} </h1>
          <p>Biblioteca de canciones</p>
        </section>
        <form className="searchBox">
          <div className="form-group">
            <label htmlFor="texto">Buscador de Canciones</label>
            <input
              type="texto"
              name="texto"
              id="texto"
              value={texto}
              onChange={(e) => setFiltro(e)}
            />
          </div>
        </form>
        <section className="content">
          {songs.length}

          {songs.length > 0 ? (
            <div className="tareas">
              {songFilter.map((song) => (
                <CancionItem key={song._id} songs={song} user={user} />
              ))}
            </div>
          ) : (
            <h3>No hay Lista que mostrar</h3>
          )}
        </section>
      </main>
    </>
  );
};

export default Dashboard;
