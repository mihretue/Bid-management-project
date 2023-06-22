import { useParams } from 'react-router-dom';
import Footer from '../components/footer'
import SidebarTabsExample from '../pages/user pages/messagedrawer';

const Messages=()=>{
const {uid}=useParams()
return(<>
<div className='container mb-5 border rounded'>
     <SidebarTabsExample />
  </div>
{JSON.parse(localStorage.getItem('user')).role!=="ppa it officer"&&<Footer />}
</>)
}

export default Messages;