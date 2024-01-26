import { useState } from "react";
import listService from "../../features/listas/listService";
import "../../components/navigation/sidebar.css";

const Sidebar = ({ user }) => {
  const [listName, setListName] = useState("");
  const [list, setList] = useState([]);

  let initialState = {
    display: "none",
  };
  const [styleInput, setStyleInput] = useState(initialState);

  const addlist = () => {
    setListName("");
    initialState.display = "inline";
    setStyleInput(initialState);
  };

  const updateListName = (e) => {
    setListName(e.target.value);
  };

  const save = () => {
    listService.postList(listName, user).then(function (data) {
      initialState.display = "none";
      setStyleInput(initialState);

      //UPDATE ARRAY LISTAS
      updateLists();
    });
  };

  const updateLists = () => {
    if (user && user.token) {
      listService.getList(user.token).then(function (data) {
        setList(data);
      });
    }
  };

  updateLists();

  return (
    <aside className="aside">
      <section>
        <p>Mis listas </p>
        <div className="form-group">
          <button className="btn-btn-block" type="button" onClick={addlist}>
            Crear Lista
          </button>
        </div>
        <div style={styleInput}>
          <input type="text" value={listName} onChange={updateListName}></input>
          <button onClick={save}>Guardar</button>
        </div>
      </section>

      <section>
        {list.map((ls) => (
          <p>{ls.name}</p>
        ))}
      </section>
    </aside>
  );
};

export default Sidebar;
