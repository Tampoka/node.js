import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
    const [state, setState] = useState([])
    const [name, setName] = useState("")

    const getUsers = () => {

        axios.get('http://localhost:4000/users'+window.location.search)
            .then(res => setState(res.data))
    }

    const addUsers = (name) => {
        axios.post('http://localhost:4000/users', {name})
            .then(res => getUsers())
            .then(res => setName(""))
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost:4000/users/${id}`)
            .then(() => getUsers())
    }

    const updateUser = (id) => {
        const userName = name || "Anonymous"

        axios.put(`http://localhost:4000/users/${id}`, {userName})
            .then(res => getUsers())
            .then(() => setName(""))
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
                                        onDoubleClick={() => updateUser(u.id)}
                    >{u.name}
                        <button
                            style={{marginLeft: 20, padding: 10}}
                            onClick={() => deleteUser(u._id)}
                        >X
                        </button>
                    </li>)}
                </ul>
                <div>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                    <button onClick={() => addUsers(name)}
                            disabled={!name}
                    >Add new user
                    </button>
                </div>
            </header>
        </div>
    );
}

export default App;
