import React from 'react' 
import CreateLink from './components/CreateLink'
import LinkList from './components/LinkList'
import Header from './components/Header'
import Login from './components/Login'
import Search from './components/Search'
import {Navigate, Route, Routes} from 'react-router-dom'
 

const  App=()=> {
  return(
    <div className='center w85'>
      <Header/>
      <div className='ph3 pv1 background-gray'>
        <Routes>
        <Route
          path="/"
          element={<Navigate replace to="/new/1" />}
        />
          
          <Route path='/create' element={<CreateLink/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/search"element={<Search/>}/>
          <Route path='/new/:page' element={<LinkList/>}/>
          <Route path='/top' element={<LinkList/>}/>


        </Routes>
      </div>
    </div>
  )
}
export default App