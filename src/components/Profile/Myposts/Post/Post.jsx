import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.content}>
            <div>
                <img src="https://cs16planet.ru/steam-avatars/images/avatar2700.jpg" />
                {props.message}
                <div>like  {props.likesCount}</div>
            </div>
        </div>
    )
}
export default Post;