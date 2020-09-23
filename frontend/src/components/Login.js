import React from 'react'
import axios from 'axios'


export default function Login({ setMyUsername, setMyPassword }) {

    function getLoginElements() {
        const singInLogin = document.getElementsByTagName("input")[0].value
        const singInPassword = document.getElementsByTagName("input")[1].value
        setMyUsername(singInLogin)
        setMyPassword(singInPassword)
    }


    function getRegisterElements() {
        const singUpLogin = document.getElementsByTagName("input")[2].value
        const singUpPassword = document.getElementsByTagName("input")[3].value
        setMyUsername(singUpLogin)
        setMyPassword(singUpPassword)

        const data = {
            "username": singUpLogin,
            "password": singUpPassword
        }


        axios.post('http://127.0.0.1:8000/api/auth/users/', data)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <div>
            <h1>Войти в Аккаунт</h1>

            <label for="usr">Username:</label>
            <div>
                <input className='inpform' type="text" id="usr" />
            </div>
            <label for="pwd">Password:</label>
            <div>
                <input className='inpform' type="text" id="pwd" />
            </div>
            <button className="btn btn-warning loginbtn" onClick={getLoginElements}>Войти</button>

            <h1>Создать Аккаунт</h1>
            <label for="usr">Username:</label>
            <div>
                <input className='inpform' type="text" id="usr" />
            </div>
            <label for="pwd">Password:</label>
            <div>
                <input className='inpform' type="text" id="pwd" />
            </div>
            <button className="btn btn-warning loginbtn" type="button" onClick={getRegisterElements}>Зарегистрироваться</button>

        </div>
    )
}
