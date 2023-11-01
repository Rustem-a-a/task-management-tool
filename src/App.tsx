import React, {Suspense, useEffect, useState} from 'react';
import styles from './App.module.scss';
import Header from "./components/ui/Header/Header";
import LeftSidebar from "./components/ui/LeftSidebar/LeftSidebar";
import AppRouter from "./routes/AppRouter";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthAsync, logoutAsync, successAction} from "./store/actions/authActions";
import {getProjectAsync} from "./store/actions/projectActions";
import {RootState} from "../src/store/store";
import Modal from "./components/ui/Modal/Modal";
import AuthModal from "./components/ui/AuthModal/AuthModal";

const LazyLeftSidebar = React.lazy(() => import("./components/ui/LeftSidebar/LeftSidebar"));


function App() {
    const [isModal, setIsModal] = useState<boolean>(false);
    const [isSignIn, setIsSignIn] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {dispatch(checkAuthAsync())}
        else {dispatch(successAction())}
        }, []);
    const user = useSelector((state: RootState) => state.user)
    const isActivated = user.user && user.user.isActivated;

    useEffect(() => {
        if (isActivated) {dispatch(getProjectAsync())}
    }, [isActivated]);
    const projects = useSelector((state: RootState) => state.projects)

    return (
        <div className={styles.App}>
            {!user.isLoadingAuth &&
                <>
                    <Header/>
                    <main className={styles.main}>
                        {user.isAuth
                            ? <>
                                {
                                    isActivated
                                        ? <>
                                            <LeftSidebar projects={projects}/>
                                            <AppRouter/>
                                        </>
                                        : <div className={styles.entry}>
                                            <h1>Check your email for activate your account</h1>
                                            <img src='/door.svg' alt='entry'/>
                                        </div>
                                }
                            </>
                            :
                            <img onClick={()=>{setIsModal(true)}} className={styles.entry} src='/door.svg' alt='entry'/>
                        }
                    </main>
                </>
            }
            {isModal &&
                <Modal setIsSignUp={setIsSignUp} setIsSignIn={setIsSignIn} setIsModal={setIsModal}>
                    <AuthModal setIsModal={setIsModal} setIsSignIn={setIsSignIn} setIsSignUp={setIsSignUp}
                               isSignIn={isSignIn} isSignUp={isSignUp}/>
                </Modal>}
        </div>
    );
}

export default App;
