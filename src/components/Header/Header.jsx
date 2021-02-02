import { NavLink } from 'react-router-dom'
import s from './Header.module.css'


const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.label}>
                <img src='https://www.freelogodesign.org/Content/img/logo-samples/theater.png'></img>
            </div>
            <div className={s.navbar}>
                <div className={s.item}>
                    <NavLink to='/profile' activeClassName={s.activeLink}>Profile</NavLink>
                    <NavLink to='/dialogs' activeClassName={s.activeLink}>Messages</NavLink>
                    <NavLink to='/users' activeClassName={s.activeLink}>Users</NavLink>
                    <NavLink to='/news' activeClassName={s.activeLink}>News</NavLink>
                    <NavLink to='/music' activeClassName={s.activeLink}>Music</NavLink>
                    <NavLink to='/settings' activeClassName={s.activeLink}>Settings</NavLink>
                    <NavLink to='/friends' activeClassName={s.activeLink}> Friends  </NavLink>
                </div>
            </div>
            <div className={s.loginBlock}>
                {/*                <NavLink to={'/profile/' + id}>
                                            <img className={s.avatar} src={photos.small != null ? photos.small : userPhoto} />
                                    </NavLink>*/}
                {props.isAuth
                    ? <div>{props.login}
                        <button onClick={props.logout}> Log out </button>
                    </div>
                    : <NavLink to='/login'>Login</NavLink>
                }
            </div>
        </header >

    )
}

export default Header;