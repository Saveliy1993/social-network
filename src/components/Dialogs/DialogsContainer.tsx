import { connect } from 'react-redux'
import { compose } from 'redux'
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/DialogsReducer'
import { AppStateType } from '../../redux/reduxStore'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import Dialogs from './Dialogs'


type MapStatePropsType = {}
type MapDispatchPropsType = {}
type OwnProps = {}
const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newPostMessage: state.dialogsPage.newPostMessage,
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator())
        },
        changeMessage: (text: string) => {
            let action = (updateNewMessageTextActionCreator(text))
            dispatch(action)
        }
    }
}
//connect and compose HOC
export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

