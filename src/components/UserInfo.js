import React from "react";

const UserInfo =({user})=>{
    return (
        <div>
            <div>
                <strong>Nombre:</strong>
                {user.name}
            </div>
            <div>
                <strong>Usuario:</strong>
                {user.username}
            </div>
            <div>
                <strong>Email:</strong>
                {user.email}
            </div>
            <div>
                <strong>Web:</strong>
                {user.website}
            </div>
            <div>
                <strong>Telefono:</strong>
                {user.phone}
            </div>
        </div>
    );
};
export default UserInfo;