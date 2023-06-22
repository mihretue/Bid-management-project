import Footer from "../components/footer"
import StickyHeadTable from '../components/Bid Awards Table'
import { useEffect } from "react"
const BidAwards=()=>{
useEffect(()=>{
   document.title="Cheretanet | Bid Awards"
},[])
return(<>
<div className="container mb-5">
<h1 className="text-center">Bid Awards</h1>
<div className= " bg-body-tertiary rounded shadow mt-3 border border-info rounded" style={{maxWidth:'100%',height:'auto',minHeight:'3rem',backgroundColor:'white'}}>
      <StickyHeadTable />
   </div>
</div>
<Footer />
</>
)
}

export default BidAwards