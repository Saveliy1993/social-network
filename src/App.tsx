import { Route, Switch } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import React, { Component } from 'react'
import { connect } from "react-redux";
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { initializeApp } from './redux/AppReducer';
import { HashRouter } from 'react-router-dom';
import store, { AppStateType } from './redux/reduxStore'
import { Provider } from 'react-redux'
//for fast load app in 1st bundlle
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));
const News = React.lazy(() => import('./components/News/News'));
const Friends = React.lazy(() => import('./components/Friends/Friends'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginPage = React.lazy(() => import('./components/LoginPage/Login'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

//classed comp3 for render all app
class App extends Component<MapPropsType & DispatchPropsType> {
    //alerter errors in app
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occured')
        console.error(PromiseRejectionEvent)
    }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }
    //delete error
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className='app-wrapper'>
                <div className='app-wrapper-header'>
                    <HeaderContainer />
                </div >
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route path='/dialogs'><Dialogs /></Route>
                        <Route path='/profile/:userId?'><ProfileContainer /></Route>
                        {/* this components not load in first start app, they not popular*/}
                        <React.Suspense fallback={<Preloader />}>
                            <Route path='/music'><Music /></Route>
                            <Route path='/news'><News /></Route>
                            <Route path='/settings'><Settings /></Route>
                            <Route path='/friends'><Friends /></Route>
                            <Route path='/users'><UsersContainer /></Route>
                            <Route path='/login'><LoginPage /></Route>
                        </React.Suspense>
                    </Switch>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized
    }
}

//for props and compose 2cont
let AppContainer = compose(
    connect(mapStateToProps, { initializeApp })
        (App))

//for test 1cont. hashrouter for ghpages, next time use <BrowserRouter basename={process.env.PUBLIC_URL}.
//Provider добовляет в контекст store, что бы компоненты могли стать consumer
const MainApp: React.FC = () => {
    return <HashRouter >
        <Provider store={store}>
            <React.StrictMode>
                <AppContainer />
            </React.StrictMode>
        </Provider>
    </HashRouter>
}
export default MainApp