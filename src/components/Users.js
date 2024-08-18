import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Users() {
    let navigate = useNavigate();
    let token = localStorage.getItem("authToken");
    let [data, setData] = useState([]);
    let [show, setShow] = useState(false);

    function logout() {
        localStorage.clear();
        navigate("/login");
    }
    useEffect(() => {
        async function findAll() {
            let users = await fetch("https://authentication-server-gaxu.onrender.com/all/users", {
                method: "GET",
                headers: {
                    "auth-token": `${token}`,
                    "Content-Type": "application/json"
                }
            })
            let resp = await users.json();
            if (resp.response === "Authentication failed" || resp.response === "no token") {
                navigate("/login");
            }
            if (resp.data) {
                setShow(true);
                setData(resp.data);
            }
        }
        findAll();
    }, [])
    return (
        <div className='user-div'>
            <div className='registered-users'>
                <div className='nav-bar d-flex justify-content-between align-items-center ps-5 pe-5' style={{ height: "100px", background: "#00325E" }}>
                    <p style={{ color: "white", fontWeight: "600", fontSize: "20px", marginTop: "4px" }}> Welcome</p>
                    <button className='btn' style={{ background: "red", color: "white" }} onClick={logout}>Logout</button>
                </div>
                <div className='all-users'>
                    {show ? <div>
                        <div>
                            <p className='fs-4 mt-3'>Registered users</p>
                            <div className='datas'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((user, ind) => (
                                            <tr key={ind}>
                                                <td data-label="Name">{user.firstName} {user.lastName}</td>
                                                <td data-label="Email">{user.email}</td>
                                                <td data-label="Role">{user.role}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div> : <p className='mt-4'>Loading....</p>}

                </div>
            </div>
        </div>
    )
}

export default Users