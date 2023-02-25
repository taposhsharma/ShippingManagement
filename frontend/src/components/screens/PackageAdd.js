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

import Modal from 'react-bootstrap/Modal';


function MyVerticallyCenteredModal(props) {
 
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>
        <h4>Added Succesfully.</h4>
        <p>
          Pacakage Id : {props.id}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const PackageAdd = () =>{
    const history = useHistory();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [packagedetail,setPackagedetail] = useState("");
    const [id,setId] = useState('')
    const {state,dispatch} = useContext(UserContext)
    
    const [errorMessage,setErrorMessage]= useState("")
    const [modalShow, setModalShow] = React.useState(false);

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
        console.log("hii")
        fetch("http://localhost:5000/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                name,
                email,
                phone,
                packagedetail,
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
               console.log(data.post._id)
             
                
                setModalShow(true)
                setId(data.post._id)
                setEmail('')
                setName('')
                setPhone('')
                setPackagedetail('')
                console.log(id)
                
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
       
    }, [])
    return (
      
        <Container>
          
        <div style={{margin: 30}}></div>
       <Row>
           <Col xs={3}></Col>
           <Col xs={6}>
   <Card  >
   <Card.Body style={{margin: 40}}>
       
     <Card.Title style={{textAlign: 'center',fontSize:'30px'}}>New Pacakage</Card.Title>
     <hr/>
     <Form>
        {errorMessage}
     <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginTop: 20}}>
   <Form.Label>Name</Form.Label>
   <Form.Control type="text" placeholder="Enter name" value={name}
onChange={e => setName(e.target.value)}/>
   <Form.Text className="text-muted">
     
   </Form.Text>
 </Form.Group>
 <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginTop: 20}}>
   <Form.Label>Email </Form.Label>
   <Form.Control type="email" placeholder="Enter email" value={email}
onChange={e => setEmail(e.target.value)}/>
   <Form.Text className="text-muted">
     
   </Form.Text>
 </Form.Group>

 <Form.Group className="mb-3" controlId="formBasicPassword">
   <Form.Label>Phone number</Form.Label>
   <Form.Control type="text" placeholder="Enter Phoneno"  value={phone}
onChange={e => setPhone(e.target.value)}/>
 </Form.Group >
 <Form.Group className="mb-3" controlId="formBasicPassword">
   <Form.Label>Pacakge</Form.Label>
   <Form.Control type="text" placeholder="Enter Pacakge Details"  value={packagedetail}
onChange={e => setPackagedetail(e.target.value)}/>
 </Form.Group >
 <div className="d-grid gap-2" style={{marginTop: 20}}>
 <Button variant="dark"   onClick={()=>PostData()}>
   Add Details
 </Button>
 </div>
</Form>
   </Card.Body>
 </Card>
 </Col>
 </Row>
 <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={id}
      />
 </Container>
 
    )
}

export default PackageAdd