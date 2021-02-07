import Header from "./Header";
import React from 'react'
import { connect } from "react-redux";
import { logout } from "../../redux/AuthReducer";


class HeaderContainer extends React.Component {
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
//1st cont for connect and props
export default connect(mapStateToProps, { logout })(HeaderContainer);