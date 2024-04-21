import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="App">
     <Header />
     <Main />
     <Footer />
     <Analytics/>
    </div>
  );
}

export default App;
