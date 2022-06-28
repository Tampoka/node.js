import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
    const [state, setState] = useState([])
    const [name, setName] = useState("")

    const getUsers = () => {
        axios.get('http://localhost:4000/users')
            .then(res => setState(res.data))
    }

    const addUsers = (name) => {
        axios.post('http://localhost:4000/users', {name})
            .then(res => getUsers())
        setName("")
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost:4000/users/${id}`)
            .then(res => getUsers())
    }

    const updateUser = (id) => {
        axios.put(`http://localhost:4000/users/${id}`, {name})
            .then(res => getUsers())
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>Users:</p>
                <ul style={{width: 300}}>
                    {state.map(u => <li key={u.id}
                                        style={{display: "flex", justifyContent: "space-between", paddingBottom: 10}}
                                        onDoubleClick={() => updateUser(u.id, "Tanya")}
                    >{u.name}
                        {<button style={{marginLeft: 20}} onClick={() => deleteUser(u.id)}>X</button>}</li>)}
                </ul>
                <div>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                    <button onClick={() => addUsers(name)}>Add new user</button>
                </div>
            </header>
        </div>
    );
}

export default App;
