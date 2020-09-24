import React from 'react'
import axios from 'axios'


export default function Login({ setMyUsername, setMyPassword }) {

    function getLoginElements() {
        const singInLogin = document.getElementById("singInLogin").value
        const singInPassword = document.getElementById("singInPassword").value
        setMyUsername(singInLogin)
        setMyPassword(singInPassword)
    }


    function getRegisterElements() {
        const singUpLogin = document.getElementById("singUpLogin").value
        const singUpPassword = document.getElementById("singUpPassword").value


        const data = {
            "username": singUpLogin,
            "password": singUpPassword
        }


        axios.post('http://127.0.0.1:8000/api/auth/users/', data)
            .then((res) => {
                alert("Вы зарегистировались!")
                setMyUsername(singUpLogin)
                setMyPassword(singUpPassword)
            })
            .catch((err) => {
                alert("Попробуйте еще раз!")
            })

    }

    return (
        <form>
            <div className='centeredobj '>
                <h1>Войти в Аккаунт</h1>
                <label >Username:</label>
                <div>
                    <input id="singInLogin" className='inpform' type="text" />
                </div>
                <label>Password:</label>
                <div>
                    <input id="singInPassword" className='inpform' type="password" />
                </div>
                <button className="btn btn-secondary loginbtn" onClick={getLoginElements}>Войти</button>

                <h1>Создать Аккаунт</h1>
                <label>Username:</label>
                <div>
                    <input id="singUpLogin" className='inpform' type="text" />
                </div>
                <label>Password:</label>
                <div>
                    <input id="singUpPassword" type="password" className='inpform' />
                </div>
                <button className="btn btn-secondary loginbtn" type="button" onClick={getRegisterElements}>Зарегистрироваться</button>

            </div>
        </form>
    )
}
