import { useParams } from 'react-router-dom';
import Footer from '../components/footer'
import SidebarTabsExample from '../pages/user pages/messagedrawer';

const Messages=()=>{
const {uid}=useParams()
return(<>
<div className='container mb-5 border rounded'>
     <SidebarTabsExample />
  </div>
<Footer />
</>)
}

export default Messages;