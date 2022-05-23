import { useEffect } from 'react';
import '../App.css';

function App() {
  useEffect(() => {
    window.location.replace("/login")
  }, [])

  return null;
}

export default App;
