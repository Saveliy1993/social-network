import s from './Post.module.css'

type PropsType={
    text: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.content}>
            <div>
                <img src="https://cs16planet.ru/steam-avatars/images/avatar2700.jpg" />
                {props.text}
                <div>like  {props.likesCount}</div>
            </div>
        </div>
    )
}
export default Post;