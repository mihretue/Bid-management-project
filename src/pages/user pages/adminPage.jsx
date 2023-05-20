import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SidebarTabsExample from './drawer'
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

function AdminPage() {
  const classes = useStyles();
  const {id} =useParams()
  // console.log(id)
  return (
    <div className='container rounded border' style={{height:'30rem'}}>
      <h3 className='text-center mb-3 h3'>Dashboard</h3>
      <SidebarTabsExample />
    </div>
  );
}

export default AdminPage;
