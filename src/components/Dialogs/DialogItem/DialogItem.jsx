import { NavLink } from 'react-router-dom'
import s from './DialogItem.module.css'

const DialogItem = (props) => {
    let path='/dialogs/' + props.id
    return (
        <div className={s.user}>
            <img src="https://cs16planet.ru/steam-avatars/images/avatar2700.jpg"/>
            <NavLink to={path} className={s.item} activeClassName={s.activeLink}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;