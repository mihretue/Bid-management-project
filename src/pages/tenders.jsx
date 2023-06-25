import { useEffect,useState} from "react"
import StickyHeadTable from "../components/Bid Table";
import Footer from "../components/footer";
const Tenders=()=>{
    useEffect(()=>{document.title='Cheretanet | Tenders'})
    const [search,setSearch]=useState('')
return(<>
    <div id="advertss" className="mb-5" >
    <h1 className="text-center">Tenders</h1>
    <div className= " bg-body-tertiary rounded shadow mt-3 border border-info rounded" style={{maxWidth:'100%',height:'auto',minHeight:'3rem',backgroundColor:'white'}}>
      <StickyHeadTable search={search} />
   </div>

    </div> 
    <Footer />
    </>
)
}


export default Tenders;