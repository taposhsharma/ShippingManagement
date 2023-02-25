import Container from 'react-bootstrap/Container';
import React, { useContext, useEffect, useRef,useState } from 'react'
import {useHistory,Redirect,BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { UserContext } from '../../App';
import M from 'materialize-css'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const Home = () =>{
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      history.push('/signin')
    }
  },[])
  const searchModal = useRef(null)
  const {state,dispatch} = useContext(UserContext)
  console.log(state)
  const [search,setSearch] = useState();
  const history = useHistory()
  
  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])
  const renderList = () =>{
   
    if(state){
      
      return [
        <Row>
          <Col sm={6}>
        <a href="/packageadd" style={{textDecoration:'none'}}>
        
            
        <Card >
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1507150615129-3ba0720f488d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
      <Card.Body>
        <Card.Title  style={{color:'black'}}>Add Pacakage</Card.Title>
        
      </Card.Body>
    </Card>
    
    
    </a>
    </Col>

    <Col sm={6}>
        <a href="/searchpackage" style={{textDecoration:'none'}}>
        
            
        <Card >
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1507150615129-3ba0720f488d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
      <Card.Body>
        <Card.Title  style={{color:'black'}}>Search Pacakage</Card.Title>
        
      </Card.Body>
    </Card>
    
    
    </a>
    </Col>


    

    </Row>
        
      ]
    
    }

    
    
    
}
const newrender=()=>{
  if(state){
      
    if(state.position=="Admin"){
      return[
        <Row>
         

    <Col sm={6}>
        <a href="/signup" style={{textDecoration:'none'}}>
        
            
        <Card >
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1507150615129-3ba0720f488d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
      <Card.Body>
        <Card.Title  style={{color:'black'}}>Add Admin</Card.Title>
        
      </Card.Body>
    </Card>
    
    
    </a>
    </Col>


    <Col sm={6}>
        <a href="/addEmployee" style={{textDecoration:'none'}}>
        
            
        <Card >
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1507150615129-3ba0720f488d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
      <Card.Body>
        <Card.Title  style={{color:'black'}}>Add Employee</Card.Title>
        
      </Card.Body>
    </Card>
    
    
    </a>
    </Col>
        </Row>
      ]
    }
  }
}

return (
  
  <Container style={{textAlign:"center"}}>
    <div style={{margin: 30}}></div>
    <Row>
      <Col sm={6}>
        {renderList()}
        </Col>
        <Col sm={6}>
        {newrender()}
        </Col>
      </Row> 
        </Container>

)
}

export default Home

// import React, {useState,useEffect,useContext} from 'react'
// import {UserContext} from '../../App'
// import { useHistory,Link } from 'react-router-dom';

// const Home = () =>{
//     const [data,setData] = useState([]);
//     const {state,dispatch} = useContext(UserContext)
// console.log(state)
//     const history = useHistory()
//     useEffect(() => {
       
//     }, [])
//     const renderList =  () =>{
//         if(!state){
            
//             history.push('/signin')
//         }
//         fetch('http://localhost:5000/allpost',{
//             headers:{
//             "Content-Type":"application/json",
//             "Authorization":"Bearer "+localStorage.getItem("jwt")
//             }
//         })
//         .then(res => res.json())
//         .then(result =>{
//             // console.log(result);
//             setData(result.posts)
//         })
//         .catch(err => console.log(err))
//     }
 
//     const likePost = (id) =>{
//         fetch('http://localhost:5000/like',{
//             method:"put",
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//             },
//             body:JSON.stringify({
//                 postId:id
//             })
//         })
//         .then(res => res.json())
//         .then(result =>{
//             // console.log("result",result.result._id)
//             const newData = data.map(item =>{
//                 if(item._id === result.result._id){
//                     return result.result;//push new array with likes array in the newData array
//                 }else{
//                     return item
//                 }
//             })
//             // console.log("newData",newData)
//             setData(newData)
//         })
//         .catch(err => console.log(err))
//     }

//     const UnlikePost = (id) =>{
//         fetch('http://localhost:5000/unlike',{
//             method:"put",
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//             },
//             body:JSON.stringify({
//                 postId:id
//             })
//         })
//         .then(res => res.json())
//         .then(res =>{
//             // console.log(res.result._id)
//             const newData = data.map(item =>{
//                 // console.log("compare",item._id+"---"+result._id)
//                 if(item._id === res.result._id){
//                     return res.result;
//                 }else{
//                     return item
//                 }
//             })
//             setData(newData)
//         })
//         .catch(err => console.log(err))
//     }

//     const makeComment = (text,postId) =>{
//         fetch('http://localhost:5000/comment',{
//             method:"put",
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//             },
//             body:JSON.stringify({
//                 postId,
//                 text
//             })
//         })
//         .then(res => res.json())
//         .then(result =>{
//             // console.log("result",result)
//             const newData = data.map(item =>{
//                 if(item._id === result.result._id){
//                     return result.result;//push new array with likes array in the newData array
//                 }else{
//                     return item
//                 }
//             })
//             // console.log("newData",newData)
//             setData(newData)
//         })
//         .catch(err => console.log(err))
//     }

//     const deletePost = postId =>{
//         fetch(`http://localhost:5000/deletepost/${postId}`,{
//             method:"delete",
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//             }
//         })
//         .then(res => res.json())
//         .then(result =>{
//             // console.log("result",result)
//             const newData = data.filter(item =>{
//                 return item._id !== result.result._id
//             })
//             // console.log("newData",newData)
//             setData(newData)
//         })
//         .catch(err => console.log(err))  
//     }



//     return (
       
//                     <div className="home">
                        
//                     {
                        
//                         data.map(item =>{
//                             return (
//                                 <div className="card home-card" key={item._id}>
//                                 <h5><Link to={item.postedBy._id!==state._id?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name}</Link>
//                                 {
//                                 item.postedBy._id == state._id
//                                     ?                                 
//                                 <i className="material-icons" style={{float:'right'}} onClick={()=>deletePost(item._id)}>delete</i>
//                                 :
//                                 ""
//                                 }
//                                 </h5>
//                                 <div className="card-image">
//                                 <img src={item.photo} alt={item.title}/>
//                                 </div>
//                                 <div className="card-content">      
//                                 <i className="material-icons" style={{color:"red"}}>favorite</i>
//                                 {
//                                 item.likes.includes(state._id)
//                                 ?
//                                 <i className="material-icons" onClick={()=> UnlikePost(item._id)}>thumb_down</i>
//                                 :
//                                 <i className="material-icons" onClick={()=> likePost(item._id)}>thumb_up</i>
//                                 } 
//                                 <h6>{item.likes.length} likes</h6>
//                                 <h6>{item.title}</h6>
//                                 <p>{item.body}</p>
//                                 {item.comments.map(record =>{
//                                     return(
//                                         <h6 key={record._id} style={{fontWeight:"500"}}>{record.postedBy.name}  <span>{record.text}</span></h6>
//                                     )
//                                 })}
//                                 <form onSubmit={(e)=> {
//                                     e.preventDefault();
//                                     // console.log(e.target[0].value)
//                                     makeComment(e.target[0].value,item._id)
//                                 }
//                                 }>
//                                 <input type="text" placeholder="Add a Comment"/>
//                                 </form>
//                                 </div>
//                                 </div>                                
//                             )
//                         })
//                     }

//                     </div>
//                 );

//     }
 

// export default Home