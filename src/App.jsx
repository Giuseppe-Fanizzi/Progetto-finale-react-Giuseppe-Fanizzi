
import './global.css'
import Layout from './layout/layout'
import { Routing } from './routes/routing'
import 'bootstrap/dist/css/bootstrap.min.css';
import SessionProvider from './context/SessionProvider';

 function App() {


  return (
    <SessionProvider>

      <Routing /> 
    </SessionProvider>
    
    
  );
}
   

export default App
