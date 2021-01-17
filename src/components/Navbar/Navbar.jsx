import { NavLink } from 'react-router-dom';
import Friends from './Friends/Friends';
import s from './Navbar.module.css'

const Navbar = (props) => {
    //let friendElement= props.friends.map(f=> <Friends name={f.name}/>){friendElement}
    
    return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to='/profile' activeClassName={s.activeLink}>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/dialogs' activeClassName={s.activeLink}>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/users' activeClassName={s.activeLink}>Users</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/news' activeClassName={s.activeLink}>News</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/music' activeClassName={s.activeLink}>Music</NavLink>
        </div>
        <div className={s.item}>
            <div className={s.settings}>
                <NavLink to='/settings' activeClassName={s.activeLink}>Settings</NavLink>
            </div>
        </div>
        <div className={s.item}>
            <div className={s.friends}>
                <NavLink to='/friends' activeClassName={s.activeLink}> Friends  </NavLink>
            </div>
        </div>
    </nav>

}
export default Navbar;