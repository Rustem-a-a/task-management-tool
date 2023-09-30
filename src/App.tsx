import React from 'react';
import styles from './App.module.scss';
import Header from "./components/ui/Header/Header";
import LeftSidebar from "./components/ui/LeftSidebar/LeftSidebar";
import TaskCard from "./components/ui/TaskCard/TaskCard";
import TaskPage from "./components/pages/TaskPage/TaskPage";
import AppRouter from "./routes/AppRouter";

function App() {
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
