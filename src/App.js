import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProfilePage from './components/ProfileCard';
import Profiles from './components/ProfileList';
import ResourceList from './components/ResourceList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Success from './components/Success';
import NotFound from './components/NotFound';

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
