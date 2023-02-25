import React, {useContext, useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

const Signin = () =>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [errorMessage,setErrorMessage]= useState("")
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("")
    const [pos,setpos] =useState('')
   
    const PostData = () =>{
        console.log(pos)
        console.log("hii")
        fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email,
                pos
            })
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
           
            if(data.error){
                console.log(data.error);
               
                setErrorMessage(data.error)
                console.log(errorMessage)
                
            }else{
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
             
                
                // eslint-disable-next-line no-unreachable
                history.push('/')
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if(state){
            // dispatch({type:'LOGOUT'})
            history.push('/')
        }
    }, [])
    return (
        <Container>
             <div style={{margin: 100}}></div>
            <Row>
                <Col xs={3}></Col>
                <Col xs={6}>
        <Card  >
        <Card.Body style={{margin: 40}}>
            {errorMessage}
          <Card.Title style={{textAlign: 'center',fontSize:'30px'}}>Signin</Card.Title>
          <hr/>
          <Form>
          
        <div key={`inline-radio`} className="mb-3">
          <Form.Check 
          inline
            type="radio"
            name="group1"
            label={`Admin`}
            value={'Admin'}
            onClick={e=>setpos(e.target.value)}
            
          />

          <Form.Check
           inline
            type="radio"
            label={`Employee`}
            name="group1"
            value={'Employee'}
            onClick={e=>setpos(e.target.value)}
          />
        </div>

      <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginTop: 20}}>
        <Form.Label>Email address</Form.Label>
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

    // <div className="mycard">
    //     <div className="card auth-card input-field">
    //         <h2>Instagram</h2>
    //         <input
    //         type="text"
    //         placeholder="Email"
    //         value={email}
    //         onChange={e => setEmail(e.target.value)}/>
    //         <input
    //         type="password"
    //         placeholder="Password"
    //         }
    //         />
    //         <button className="btn waves-effect waves-light #0d47a1 blue darken-1" onClick={()=>PostData()}>Login</button>
    //         <h5>
    //         <Link to='/signup'>Don't have an Account</Link>
    //         </h5>
    //     </div>
    // </div>
    )
}

export default Signin