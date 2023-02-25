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
import Table from 'react-bootstrap/Table';
const Searchpackage = () =>{
    const history = useHistory();
    const [id,setId] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [packagedetail,setPackagedetail] = useState("");
    const [status,setStatus] = useState('')
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user"));
      if(user){
        dispatch({type:"USER",payload:user})
        // history.push('/')
      }
    },[])
    const [errorMessage,setErrorMessage]= useState("")
    
const tableContent=()=>{
  if(name){
    return[
      
      <Row>
        <div style={{margin:'20px'}}></div>
        <h3 style={{textAlign:'center'}}>Pacakage Details</h3>
        <div style={{margin:'5px'}}></div>
         <Table striped bordered hover variant="dark">
     
      <tbody>
        <tr>
          
          
          <td>Name</td>
          <td>{name}</td>
        </tr>
        <tr>
          
          
          <td>Email</td>
          <td>{email}</td>
        </tr>
        <tr>
          
          
          <td>Phone</td>
          <td>{phone}</td>
        </tr>
        <tr>
          
          
          <td>Pacakage details</td>
          <td>{packagedetail}</td>
        </tr>
        <tr>
          
          
          <td>Status</td>
          <td>{status}</td>
        </tr>

      </tbody>
    </Table>
       
  </Row>
    
    ]
  }
}
  const UpdateStatus=()=>{
   
    if(state){
    if(status=="Yet to Deliver"){
      return[
      <Button  variant="outline-dark" onClick={()=>UpdateData()}>Update Status</Button>
      ]
    }
  }
  } 
  const UpdateData=()=>{
    fetch("http://localhost:5000/updatedetail",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
    },
      body:JSON.stringify({
              id
      })
  })
  .then(res => res.json())
  .then(data => {
       
       setStatus("Deliverd")
       console.log(status)
      
      if(data.error){
          console.log(data.error);
         
          setErrorMessage(data.error)
          console.log(errorMessage)
          
      }
      
      history.push("/searchpackage")
    
  })
  .catch(err => console.log(err))


  
  }
   
   
    const PostData = () =>{
      console.log(state)
      console.log(id)
        console.log("hii")
        fetch("http://localhost:5000/packagedetail",{
            method:"post",
            headers:{
              "Content-Type":"application/json"
          },
            body:JSON.stringify({
                    id
            })
        })
        .then(res => res.json())
        .then(data => {
             
           
            if(data.error){
                console.log(data.error);
               
                setErrorMessage(data.error)
                console.log(errorMessage)
                
            }else{
               setName(data.user.name)
               setEmail(data.user.email)
               setPhone(data.user.phone)
               setPackagedetail(data.user.packagedetail)
               setStatus(data.user.status)
             
                
                
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
       
    }, [])
    return (
        <Container>
        <div style={{marginTop: 30}}></div>
       <Row>
           <Col xs={3}></Col>
           <Col xs={6}>
   <Card  >
   <Card.Body style={{margin: 40}}>
       
     <Card.Title style={{textAlign: 'center',fontSize:'30px'}}>Search Pacakage</Card.Title>
     <hr/>
     <Form>
        {errorMessage}
        <Row>
          <Col sm={10}>
     <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginTop: 20}}>
      <Row>
 
  <Col sm={12}>
   <Form.Control type="text" placeholder="Enter Id" value={id}
onChange={e => setId(e.target.value)}/>
   <Form.Text className="text-muted">
     
   </Form.Text>
   </Col>
   </Row>
 </Form.Group>
 </Col>
 <Col sm={2}>
 <div className="d-grid gap-2" style={{marginTop: 20}}>
 <Button variant="dark"   onClick={()=>PostData()}>
   Search
 </Button>
 
 </div>
 </Col>
 </Row>
</Form>
   </Card.Body>
 </Card>
 </Col>
 </Row>
 <Row>
  <Col xs={3}></Col>
  <Col xs={6}>
 {tableContent()}
 </Col>
 </Row>
 <Row>
  <Col xs={3}></Col>
  <Col xs={2}></Col>
  <Col xs={3}>
  {UpdateStatus()}
 </Col>
 </Row>
 
 </Container>
    )
}

export default Searchpackage