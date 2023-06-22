import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SidebarTabsExample from './drawer';
import Footer from '../../components/footer'
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

function AdminPage() {
  const classes = useStyles();
  const {id} =useParams()
  return (<>
    <div style={{height:'30rem'}}>
      <SidebarTabsExample />
      <Footer />
    </div>
    </>
  );
}

export default AdminPage;
