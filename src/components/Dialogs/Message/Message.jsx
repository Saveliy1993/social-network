import s from './Message.module.css'

const Message = (props) => {
    return (
        <div className={s.text}>
            <div className={s.item}>{props.message}</div>
        </div>
    )
}

export default Message;