import { useEffect, useState } from "react"
import { Button, message } from 'antd';
import "../styles/App.css";
import UserInfo from "./UserInfo";
import UserTodos from "./UserTodos";

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
  const handleCompleted =async (position) => {
    //llamado (asincrono) a la API para guardar en mi base de datos
    //###########EJEMPLO DE GUARDAR EN UN BDD#############
    const todoToUpdate=todos[position];
    todoToUpdate.completed=true;
    console.log('todoToUpdate',todoToUpdate);
    console.log('todoToUpdate String', JSON.stringify(todoToUpdate));
    
    const responsive=await fetch (`https://jsonplaceholder.typicode.com/todos/${todoToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify(todoToUpdate),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
const data=await responsive.json();
    message.success('Tarea completada');
    //###########FIN EJEMPLO DE GUARDAR EN UN BDD##########

    const newTodos = [...todos];
    newTodos[position].completed = true;
    setTodos(newTodos);
  };
  const handleDelete = (position) => {
    //llamado (asincrono) a la API para eliminar en mi base de datos
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
          <Button type="primary" onClick={() => handleChangeUserId(-1)}>Anterior</Button>
        )}
        {userId < 10 && (
          <Button type="primary" onClick={() => handleChangeUserId(1)}>Siguiente</Button>
        )}
      </div>
      <UserInfo user={userInfo}/>

      <UserTodos todos={todos} onCompleted={handleCompleted} onDelete={handleDelete} />
    </>
  );
}

export default App;
