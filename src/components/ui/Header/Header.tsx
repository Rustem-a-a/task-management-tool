import React, {FC, useState} from 'react';
import styles from './Header.module.scss';
import {Link} from "react-router-dom";
import Modal from "../Modal/Modal";
import AuthModal from "../AuthModal/AuthModal";

const Header: FC = () => {
    const [isSignIn, setIsSignIn] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [isSignOut, setIsSignOut] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isModal, setIsModal] = useState<boolean>(false);

    return (
        <header className={styles.header}>
            <Link to='/'>
                <img src="/logo.svg" alt=""/>
                <p><span>PM </span> Project management tool</p>
            </Link>
            <div className={styles.auth}>
                {
                    isAuth
                          ?   <h4 onClick={()=>{setIsAuth(false)}}>SignOut</h4>
                          :    <div className={styles.logInUp}>
                                 <h4 onClick={()=>{
                                     setIsModal(true)
                                     setIsSignIn(true)
                                 }}>SignIn</h4>
                                 <h4 onClick={()=>{
                                     setIsModal(true)
                                     setIsSignUp(true)
                                   }}>SignUp</h4>
                               </div>
                }

            </div>
            {isModal&&
                <Modal setIsSignUp={setIsSignUp} setIsSignIn={setIsSignIn} setIsModal={setIsModal}>
                    <AuthModal setIsModal={setIsModal} setIsSignIn={setIsSignIn} setIsSignUp={setIsSignUp} isSignIn={isSignIn} isSignUp={isSignUp}/>
                </Modal>}

        </header>
    );
};

export default Header;
