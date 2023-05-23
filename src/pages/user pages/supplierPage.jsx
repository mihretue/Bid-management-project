import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useEffect,useState } from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

function SupplierPage() {
  const classes = useStyles();
  const {id,uid} =useParams();
  const [user,setUser]=useState({})
  


  useEffect(()=>{
    fetchUserData()
 },[])
 const fetchUserData=()=>{
    //  setIsFetching(true)
     fetch(`http://localhost:3001/userbyid/${uid}`)
     .then((res)=>res.json())
     .then((res)=>{
       setUser(res)
       console.log(res)
      //  setIsFetching(false)
     })
    //  .catch((err)=>{setIsFetching(false);setErrorFetching(true)})
   }
  return (
    <Container fluid>
        <h1>HI </h1>
      <Row>
        <Col md={9}>
          <Paper className={classes.root}>
            <Typography variant="h5"></Typography>
            
          </Paper>
          <Paper style={{}}>
            
          </Paper>
        </Col>
      </Row>
    </Container>
  );
}

export default SupplierPage;
