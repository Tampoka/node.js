import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl="https://zombi-first.herokuapp.com/users"
// const baseUrl="http://localhost:4000/users"

function App() {
    const [state, setState] = useState([])
    const [name, setName] = useState("")

    const getUsers = () => {

        axios.get(baseUrl+window.location.search)
            .then(res => setState(res.data))
    }

    const addUsers = (name) => {
        axios.post(baseUrl, {name})
            .then(res => getUsers())
            .then(res => setName(""))
    }

    const deleteUser = (id) => {
        axios.delete(`${baseUrl}/${id}`)
            .then(() => getUsers())
    }

    const updateUser = (id) => {
        const userName = name || "Anonymous"

        axios.put(`${baseUrl}/${id}`, {userName})
            .then(res => getUsers())
            .then(() => setName(""))
    }

    useEffect(() => {
        getUsers()
    }, [])
    console.log(state)

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>Users:</p>
                <ul style={{width: 300}}>
                    {state.map(u => <li key={u._id}
                                        style={{display: "flex", justifyContent: "space-between", paddingBottom: 10}}
                                        onDoubleClick={() => updateUser(u._id)}
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
