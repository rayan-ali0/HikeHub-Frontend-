import React, { useEffect } from "react";
import { useSharedData } from '../../context/DataContext';
import style from './Header.module.css';
import logo from '../../assets/images/logo.jpg';
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";

const FilterBar = ({open,setOpen}) => {

    /* THIS IS TO SHOW AND HIDE THE DROP MENU */
    const { isNavOpen, setIsNavOpen } = useSharedData();

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 992) {
                setIsNavOpen(true);
            } else {
                setIsNavOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className={`${style.header} ${isNavOpen ? style.SectionOpacity : ``}`}>
            <div className={style.container}>
                <Link to="/" className={style.logo}>
                    <img src={logo} alt="Logo" />
                </Link>
                <div className={style.content}>
                    {isNavOpen && <NavBar />}
                    <div className={style.burger} onClick={toggleNav} >
                        <div className={`${style.bar} ${isNavOpen ? style.open : ''}`}></div>
                        <div className={`${style.bar} ${isNavOpen ? style.open : ''}`}></div>
                        <div className={`${style.bar} ${isNavOpen ? style.open : ''}`}></div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default FilterBar;
