import { connect } from 'react-redux'
import { compose } from 'redux'
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/DialogsReducer'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import Dialogs from './Dialogs'


const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newPostMessage: state.dialogsPage.newPostMessage,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator())
        },
        changeMessage: (text) => {
            let action = (updateNewMessageTextActionCreator(text))
            dispatch(action)
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

