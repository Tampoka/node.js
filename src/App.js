import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
    const [state, setState] = useState([])

    const getUsers = () => {
        axios.get('http://localhost:4000/users')
            .then(res => setState(res.data))
    }

    const addUsers = () => {
        axios.post('http://localhost:4000/users')
            .then(res => getUsers())
    }

    const deleteUser = () => {
        axios.delete('http://localhost:4000/users')
            .then(res => getUsers())
    }
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <ul>
                    Users:{state.map(u => <li key={u.id}>{u.name}
                </li>)}
                </ul>
                <div>
                    <button onClick={addUsers}>Add new user</button>
                    <button onClick={deleteUser}>X</button>
                </div>
            </header>
        </div>
    );
}

export default App;
