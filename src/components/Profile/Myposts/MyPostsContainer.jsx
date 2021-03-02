import { connect } from 'react-redux';
import { actions } from '../../../redux/ProfileReducer'
import MyPosts from './MyPosts'

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(actions.addPostActionCreator())
        },
        updateNewPostText: (text) => {
            let action=(actions.updateNewPostTextActionCreator(text))
            dispatch(action)
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;