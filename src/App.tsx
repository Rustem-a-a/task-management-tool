import React, {useEffect} from 'react';
import styles from './App.module.scss';
import Header from "./components/ui/Header/Header";
import LeftSidebar from "./components/ui/LeftSidebar/LeftSidebar";
import AppRouter from "./routes/AppRouter";
import {useDispatch} from "react-redux";
import {checkAuthAsync} from "./store/actions/authActions";


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
      if(localStorage.getItem('token')){
        dispatch(checkAuthAsync())
  }}, []);

  return (
    <div className={styles.App}>
      <Header/>
        <main className={styles.main}>
          <LeftSidebar/>
          <AppRouter/>
        </main>
    </div>
  );
}

export default App;
