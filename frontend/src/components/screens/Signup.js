import React, {useState, useEffect,useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../../App';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

const Signup = () =>{
    const [errorMessage,setErrorMessage]  = useState("")
    const history = useHistory();
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("")
    
    const {state,dispatch} = useContext(UserContext)

    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user"));
      if(user){
        dispatch({type:"USER",payload:user})
        // history.push('/')
      }else{
        history.push('/signin')
      }
    },[])
    

    

    const PostData = () =>{
        fetch("http://localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
                
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.error){
                M.toast({html:data.error,classes:'#d32f2f red darken-2'})
            }else{
                M.toast({html:data.msg,classes:'#00e676 green accent-3'})
                history.push('/signin')
            }
        })
        .catch(err => console.log(err))

    }

            return( <Container>
                <div style={{margin: 100}}></div>
               <Row>
                   <Col xs={3}></Col>
                   <Col xs={6}>
           <Card  >
           <Card.Body style={{margin: 40}}>
               {errorMessage}
             <Card.Title style={{textAlign: 'center',fontSize:'30px'}}>Admin Admin</Card.Title>
             <hr/>
             <Form>
             <Form.Group className="mb-3" controlId="formBasicName" style={{marginTop: 20}}>
           <Form.Label>Email name</Form.Label>
           <Form.Control type="text" placeholder="Enter name" value={name}
     onChange={e => setName(e.target.value)}/>
           <Form.Text className="text-muted">
             
           </Form.Text>
         </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginTop: 20}}>
           <Form.Label>Email mail</Form.Label>
           <Form.Control type="email" placeholder="Enter email" value={email}
     onChange={e => setEmail(e.target.value)}/>
           <Form.Text className="text-muted">
             
           </Form.Text>
         </Form.Group>
   
         <Form.Group className="mb-3" controlId="formBasicPassword">
           <Form.Label>Password</Form.Label>
           <Form.Control type="password" placeholder="Password"  value={password}
        onChange={e => setPassword(e.target.value)}/>
         </Form.Group >
         <div className="d-grid gap-2" style={{marginTop: 20}}>
         <Button variant="dark"   onClick={()=>PostData()}>
           Login
         </Button>
         </div>
       </Form>
           </Card.Body>
         </Card>
         </Col>
         </Row>
         </Container>
            );
    }



export default Signup


