import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProfilePage from './components/ProfileCard';
import Profiles from './components/ProfileList';
import ResourceList from './components/ResourceList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Success from './components/Success';
import NotFound from './components/NotFound';
import ResourcePage from './components/ResourcePage';
import Reset from './components/Reset';
import MakePass from './components/MakePass';
import Repos from './components/Repos';
import ResourceByLang from './components/ResourceByLang';
import Analysis from './components/Analysis';
import GroupChat from './components/GroupChat';
import ChatList from './components/ChatList';
import CreatePrivateChat from './components/CreatePrivateChat';
import CreateGroupChat from './components/CreateGroupChat';
import PrivateChat from './components/PrivateChat';
import HelpCenter from './components/HelpCenter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/in" element={ <SignIn/>} />
        <Route path="/signup" element={ <SignUp/>} />
        <Route path="/community" element={<Profiles  />} />
        <Route path="/resources" element={<ResourceList />} />
        <Route path="/success" element={<Success/>} />
        <Route path="/user/:username" element={<ProfilePage />} />
        <Route path="/resource/:id" element={<ResourcePage />} />
        <Route path='/password-reset-confirm/:uidb64/:token' element={<MakePass />} />
        <Route path='/resources/language/:languageId' element={<ResourceByLang />} />
        <Route path='/chat' element={<ChatList />}/>
        <Route path='/group-chat/:groupId' element={<GroupChat />} />
        <Route path='/create-private-chat' element={<CreatePrivateChat />} />
        <Route path='/create-group-chat' element={<CreateGroupChat />} />
        <Route path='/private-chat/:userId' element={<PrivateChat />} />
        <Route path='/help' element={<HelpCenter />} />
        <Route path='/analysis' element={<Analysis />} />
        <Route path='/repos' element={<Repos />} />
        <Route path='/reset' element={<Reset />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
}

export default App;
