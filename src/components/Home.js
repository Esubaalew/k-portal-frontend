import '../App.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import { Analytics } from '@vercel/analytics/react';

function Home() {
  return (
    <div className="App">
      <Header />
      <Main />
     <Analytics/>
      <Footer />
    </div>
  );
}

export default Home;
