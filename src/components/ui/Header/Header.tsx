import React, {FC} from 'react';
import styles from './Header.module.scss';
import {Link} from "react-router-dom";

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <Link to='/'>
                <img src="/logo.svg" alt=""/>
                <p><span>PM </span> Project management tool</p>
            </Link>

        </header>
    );
};

export default Header;
