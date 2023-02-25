import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useContext, useEffect, useRef,useState } from 'react'
import {Link,useHistory} from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'

const NavBar = () =>{
  const searchModal = useRef(null)
  const {state,dispatch} = useContext(UserContext)
  console.log(state)

  
  const [search,setSearch] = useState();
  const history = useHistory()
  const LogOut = () =>{
    localStorage.clear()
    dispatch({type:'CLEAR'})
    history.push('/signin');
  }
  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])
  const renderList = () =>{
    if(state){
      console.log(state)
      return [
        
        <Nav.Link key="logout" onClick={()=> LogOut()}>Logout</Nav.Link>
        
      ]
    }
  }
return (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
    <Navbar.Brand href="/">Shipping Management System</Navbar.Brand>

<div style={{float:"left"}}>
    <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
    <Navbar.Collapse id="responsive-navbar-nav">
     
      <Nav >
        {renderList()}
      </Nav>
    </Navbar.Collapse>
    </div>  
  </Container>
</Navbar>


  //   <nav>
  //   <div className="nav-wrapper white">
  //     <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
  //     <ul id="nav-mobile" className="right">
  //     {renderList()}
  //     </ul>
      
  //     <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
  //     <div className="modal-content">
  //     <input 
  //     type="text" 
  //     placeholder="Search"
  //     value={search} 
  //     onChange={e=>setSearch(e.target.value)}/>      
      
  //     <ul className="collection">
  //       <li className="collection-item">Alvin</li>
  //       <li className="collection-item">Alvin</li>
  //       <li className="collection-item">Alvin</li>
  //       <li className="collection-item">Alvin</li>
  //     </ul>
  //     </div>
  //     <div className="modal-footer">
  //     <button href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</button>
  //     </div>
  //     </div>
  //     </div>
  // </nav>
        

)
}

export default NavBar