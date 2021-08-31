import { useEffect, useState } from "react";
import "../styles/App.css";

function App() {
  //variable de estado
  const [userId, setUserId] = useState(1);
  const [userInfo, setUserInfo] = useState(null); //si esta en null no puede pasar datos entonces se confunde con el return
  //lamada a la funcion   El useEffect hace el montaje
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      ); //await fetch hace el llamda a la url de donde sacaremos nuestros datos
      const info = await response.json();
      setUserInfo(info);
      const responseTodos = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/todos`
      ); //await fetch hace el llamda a la url de donde sacaremos nuestros datos
      const todosData = await responseTodos.json();
      setTodos(todosData);
    };
    getData();
  }, [userId]);

  const handleChangeUserId = (value) => {
    setUserId((prevState) => prevState + value);
  };
  const handleCompleted = (position) => {
    const newTodos = [...todos];
    newTodos[position].completed = true;
    setTodos(newTodos);
  };
  const handleDelete = (position) => {
    const newTodos = todos.filter((todo, index) => index !== position);
    setTodos(newTodos);
  };
  if (!userInfo) {
    return "cargando datos...";
  }

  return (
    <>
      <div>
        {userId > 1 && (
          <button onClick={() => handleChangeUserId(-1)}>Anterior</button>
        )}
        {userId < 10 && (
          <button onClick={() => handleChangeUserId(1)}>Siguiente</button>
        )}
      </div>
      <div>
        <div>
          <strong>Nombre:</strong>
          {userInfo.name}
        </div>
        <div>
          <strong>Usuario:</strong>
          {userInfo.username}
        </div>
        <div>
          <strong>Email:</strong>
          {userInfo.email}
        </div>
        <div>
          <strong>Web:</strong>
          {userInfo.website}
        </div>
        <div>
          <strong>Telefono:</strong>
          {userInfo.phone}
        </div>
      </div>

      <div>
        <h1>Lista de Tareas</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>
                  {todo.completed ? (
                    "Completada"
                  ) : (
                    <button onClick={() => handleCompleted(index)}>
                      Marcar como Completada
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
