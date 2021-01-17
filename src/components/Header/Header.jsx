import { NavLink } from 'react-router-dom'
import s from './Header.module.css'
import userPhoto from '../../assets/images/user.jpg'


const Header = (props) => {
    return (
        <header className={s.header}>
            <img src='https://www.freelogodesign.org/Content/img/logo-samples/theater.png'></img>
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
        </header>

    )
}

export default Header;