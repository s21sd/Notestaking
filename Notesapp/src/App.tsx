import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import NewNotes from './NewNotes';
import Home from './Home';
import EditNotes from './EditNotes';
import Landing from './Landing';
import { useState } from 'react';
function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Container className='my-4'>

      <Routes>
        <Route path='/' element={<Landing setIsAuth={setIsAuth} />} />
        <Route path='/main' element={<Home />} />
        <Route path='/new' element={<NewNotes />} />
        <Route path='/:id'>
          <Route index element={<h1>show</h1>} />
          <Route path='edit' element={<EditNotes />} />
        </Route>

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
