import s from './Message.module.css'

type PropsType = {
    message: string
}
const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={s.text}>
            <div className={s.item}>{props.message}</div>
        </div>
    )
}

export default Message;