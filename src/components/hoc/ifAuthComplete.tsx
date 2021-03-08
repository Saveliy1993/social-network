import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../../redux/reduxStore'

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
    }
}
type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}

export function ifAuthComplete<WCP>(Component: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps}=props
        if (props.isAuth) return <Redirect to='/profile' />
        return <Component {...restProps as WCP} />
    }
    return connect(mapStateToProps)(RedirectComponent)
}