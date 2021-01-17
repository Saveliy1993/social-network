import s from './Friends.module.css'

let Friends=(props)=>{
    return(
        <div className={s.block}>
            <img src="https://wgpa.co.uk/wp/wp-content/uploads/2015/06/orange-box.png" className={s.img}/>
            {props.name}
        </div>
    )
}
export default Friends;