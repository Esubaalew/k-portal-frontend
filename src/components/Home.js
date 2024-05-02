import '../App.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import { getLoggedInUser } from '../API/auth';
import { Analytics } from '@vercel/analytics/react';
import { useEffect, useState } from 'react';
import Feed from './Feed';

function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const Token = JSON.parse(localStorage.getItem('user'));
        const accessToken = Token ? Token.access : null;
        const userData = await getLoggedInUser(accessToken);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
    return () => setUser(null);
  }, []);
 
  return (
    <div className="App">
      <Header />
      {user && <Feed />}
      {!user && <Main />}
     <Analytics/>
      <Footer />
    </div>
  );
}

export default Home;
