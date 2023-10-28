import React, {Suspense, useEffect, useState} from 'react';
import styles from './App.module.scss';
import Header from "./components/ui/Header/Header";
import LeftSidebar from "./components/ui/LeftSidebar/LeftSidebar";
import AppRouter from "./routes/AppRouter";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthAsync, logoutAsync, successAction} from "./store/actions/authActions";
import {getProjectAsync} from "./store/actions/projectActions";
import {RootState} from "../src/store/store";
import {ProjectResponse} from "./types/response/response";

const LazyLeftSidebar = React.lazy(() => import("./components/ui/LeftSidebar/LeftSidebar"));


function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuthAsync())
        } else {
            dispatch(successAction())
        }

    }, []);
    const user = useSelector((state: RootState) => state.user)
    const isActivated = user.user && user.user.isActivated;

    useEffect(() => {
        if (isActivated) {
            dispatch(getProjectAsync())
        }
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
                                        : <h1>Check your email and click to link to activate your account</h1>
                                }
                            </>
                            :
                            <h1>Please signIn or signUp</h1>
                        }
                    </main>
                </>
            }
        </div>
    );
}

export default App;
