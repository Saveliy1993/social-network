import { Route } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import React from 'react'
import { connect } from "react-redux";
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { initializeApp } from './redux/AppReducer';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/reduxStore'
import { Provider } from 'react-redux'
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));
const News = React.lazy(() => import('./components/News/News'));
const Friends = React.lazy(() => import('./components/Friends/Friends'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginPage = React.lazy(() => import('./components/LoginPage/Login'));


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'><DialogsContainer /></Route>
                    <Route path='/profile/:userId?'><ProfileContainer /></Route>
                    <React.Suspense fallback={<Preloader />}>
                        <Route path='/music'><Music /></Route>
                        <Route path='/news'><News /></Route>
                        <Route path='/settings'><Settings /></Route>
                        <Route path='/friends'><Friends /></Route>
                        <Route path='/users'><UsersContainer /></Route>
                        <Route path='/login'><LoginPage /></Route>
                    </React.Suspense>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

let AppContainer = compose(
    connect(mapStateToProps, { initializeApp })
        (App))

const MainApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <React.StrictMode>
                <AppContainer />
            </React.StrictMode>
        </Provider>
    </BrowserRouter>
}
export default MainApp