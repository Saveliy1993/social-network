import { Route } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import News from './components/News/News';
import Friends from './components/Friends/Friends'
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/LoginPage/Login';


const App = (props) => {
    return (
        <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar />
            <div className='app-wrapper-content'>
                <Route path='/dialogs'><DialogsContainer /></Route>
                <Route path='/profile/:userId?'><ProfileContainer /></Route>
                <Route path='/music'><Music music={props.music} /></Route>
                <Route path='/news'><News /></Route>
                <Route path='/settings'><Settings /></Route>
                <Route path='/friends'><Friends /></Route>
                <Route path='/users'><UsersContainer /></Route>
                <Route path='/login'><LoginPage /></Route>
            </div>
        </div>
    );
}

export default App;
