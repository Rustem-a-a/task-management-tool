import React, {useEffect, useState} from 'react';
import styles from './AuthModal.module.scss';
import axios from "axios";
import AuthService from "../../../services/AuthService";
import {useDispatch, useSelector} from "react-redux";
import {loginAsync, registrationAsync} from "../../../store/actions/authActions";
import {RootState} from "../../../store/store";
interface IProps{
    setIsModal :  React.Dispatch<React.SetStateAction<boolean>>
    setIsSignIn :  React.Dispatch<React.SetStateAction<boolean>>
    setIsSignUp :  React.Dispatch<React.SetStateAction<boolean>>
    isSignIn:boolean,
    isSignUp:boolean
}
interface IUser {
    username: string;
    email: string;
    password: string;
}
const AuthModal: React.FC<IProps> = ({ setIsModal,isSignIn,isSignUp,setIsSignIn,setIsSignUp }) => {
    const [user, setUser] = useState<IUser>({
        username: '',
        email: '',
        password: ''
    });
    const isAuth = useSelector((state:RootState) => state.user.isAuth)
    const err = useSelector((state:RootState) => state.user.err)

    const dispatch = useDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const signIn = async () => {
        try {
            dispatch(loginAsync({username:user.username,password:user.password}))

        }catch (e) {
            console.log(e)
        }
        // dispatch(loginAsync({username:user.username,password:user.password}))
        // setIsModal(false)
        // setIsSignUp(false)
    }
    const signUp = () => {
        dispatch(registrationAsync({...user}))
            // setIsModal(false)
            // setIsSignUp(false)
    }
    useEffect(()=>{
        if(isAuth){
            setIsModal(false)
            setIsSignUp(false)

        }
    },[isAuth])
    return (
        <div className={styles.addTaskForm}
             onClick={e=>e.stopPropagation()}>
            <h1>Add project</h1>

            <div className={styles.name}>
                <label><h2>Username:</h2></label>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                />
            </div>
            {isSignUp && <div className={styles.name}>
                <label><h2>Email:</h2></label>
                <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
            </div>}
            <div className={styles.name}>
                <label><h2>Password:</h2></label>
                <input
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
            </div>
                {isSignIn
                    ? <div className={styles.buttonArea}>
                        <h3 onClick={()=>{
                            setIsSignIn(false)
                            setIsSignUp(true)
                        }}>SignUp</h3>
                        {err&&<p style={{color:'red'}}>{err}</p>}
                        <button onClick={()=>{
                        signIn()
                        }
                            }>
                            <h2>Entry</h2>
                        </button>
                     </div>
                    : <div className={styles.buttonArea}>
                        <h3 onClick={()=>{
                            setIsSignIn(true)
                            setIsSignUp(false)
                        }}>SignIn</h3>
                        <button onClick={()=>{
                            signUp()
                          }}>
                            <h2>SignUp</h2>
                        </button>
                    </div>

                }
        </div>
    );
};

export default AuthModal;