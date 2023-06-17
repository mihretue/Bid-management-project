import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SidebarTabsExample from './drawer';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

function AdminPage() {
  const classes = useStyles();
  const {id} =useParams()
  return (
    <div className='container rounded border' style={{height:'30rem'}}>
      <SidebarTabsExample />
    </div>
  );
}

export default AdminPage;
