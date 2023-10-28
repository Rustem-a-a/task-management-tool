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
    const stateError = useSelector((state:RootState) => state.user.stateError)
    // console.log(stateError)

    const dispatch = useDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const signIn = async () => {
           dispatch(loginAsync({username:user.username,password:user.password}))
    }
    const signUp = () => {
        dispatch(registrationAsync({...user}))
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
            <h1>Authorization</h1>

            <div className={styles.name}>
                <label><h2>Username:</h2></label>
                {stateError?.errors?.length>0 && <p style={{color:'red'}}>{stateError.errors.find(v => v.path === 'username')?.msg}</p>}
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                />
            </div>
            {isSignUp && <div className={styles.name}>
                <label><h2>Email:</h2></label>
                {stateError?.errors?.length>0 && <p style={{color:'red'}}>{stateError.errors.find(v => v.path === 'email')?.msg}</p>}
                <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
            </div>}
            <div className={styles.name}>
                <label><h2>Password:</h2></label>
                {stateError?.errors?.length>0 && <p style={{color:'red'}}>{stateError.errors.find(v => v.path === 'password')?.msg}</p>}
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
                        {stateError.message&&<p style={{color:'red'}}>{stateError.message}</p>}
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