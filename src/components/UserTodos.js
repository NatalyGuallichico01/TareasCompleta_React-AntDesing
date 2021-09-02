import React from "react";
import { Button, Modal, Tag } from 'antd';
import {CheckCircleOutlined ,DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

const { confirm } = Modal;
const UserTodos=({todos, onCompleted, onDelete})=>{
    const showDeleteConfirm=(index)=> {
        confirm({
            title: 'Esta seguro de eliminar esta tarea?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta accion no podra revertirse',
            okText: 'Sí, quiero eliminar la taera',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                onDelete(index);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    return(
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
                                    <Tag color="green">Completada</Tag>

                            ) : (
                                <Button
                                    type="primary"
                                    shape="circle"
                                    onClick={() => onCompleted(index)} icon={<CheckCircleOutlined />}size = "small"/>

                            )}
                        </td>
                        <td>
                            <Button
                                type="primary"
                                onClick={() => showDeleteConfirm (index)}icon={<DeleteOutlined />}shape="circle" danger size="small"/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default UserTodos;