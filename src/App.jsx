
import './global.css'
import Layout from './layout/layout'
import { Routing } from './routes/routing'
import 'bootstrap/dist/css/bootstrap.min.css';
import SessionProvider from './context/SessionProvider';
import FavoritesProvider from './context/FavoritesProvider';

 function App() {


  return (
    <SessionProvider>

    <FavoritesProvider>
      <Routing /> 
      </FavoritesProvider>
    </SessionProvider>
    
    
  );
}
   

export default App
