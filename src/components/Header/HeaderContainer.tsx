import Header from "./Header";
import React from 'react'
import { connect } from "react-redux";
import { logout } from "../../redux/AuthReducer";
import { AppStateType } from "../../redux/reduxStore";

type PropsType = {
    isAuth: boolean
    login: string | null
}
type DispatchPropsType = {
    logout: () => void
}

class HeaderContainer extends React.Component<PropsType & DispatchPropsType> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
//1st cont for connect and props
export default connect<PropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer);