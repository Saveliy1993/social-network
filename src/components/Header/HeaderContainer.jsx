import Header from "./Header";
import React from 'react'
import { connect } from "react-redux";
import { getAuthUserData, logout } from "../../redux/AuthReducer";


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData()
    }
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, { getAuthUserData, logout })(HeaderContainer);