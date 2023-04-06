import { useEffect,useState } from "react"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {AiOutlineSearch} from 'react-icons/ai'
import StickyHeadTable from "../components/Table";
import countriesData from "../data/countries";
const Tenders=()=>{
    useEffect(()=>{document.title='Cheretanet | Bid Advertisements'})

    const [countries] = useState([...countriesData]);


return(<>
    <div id="advertss" >
    <div className="container text-center">
    <div className="row align-items-start border" >    
    <div className="col-lg-2 col-md-3 border col-sm-4 d-flex flex-column ">
      <p className="m-0 text-start" style={{fontSize:'1rem'}}>50</p>
      <p className="m-0 text-start" style={{fontSize:'0.8rem'}}>Total Active Tenders</p>
    </div>
    <div className="col-lg-2 col-md-3 border col-sm-4 d-flex flex-column">
      <p className="m-0 text-start" style={{fontSize:'1rem'}}>23</p>
      <p className="m-0 text-start" style={{fontSize:'0.8rem'}}>Tenders published Today</p>
    </div>
    <div className="col-lg-2 col-md-3 border col-sm-4 d-flex flex-column">
      <p className="m-0 text-start"style={{fontSize:'1rem'}}>2</p>
      <p className="m-0 text-start" style={{fontSize:'0.8rem'}}>Tenders closing Today</p>
    </div>
    <div className="col-lg-2 col-md-3 border col-sm-4 d-flex  flex-column">
      <p className="m-0 text-start"style={{fontSize:'1rem'}}>1</p>
      <p className="m-0 text-start" style={{fontSize:'0.8rem'}}>Tenders Opening Today</p>
    </div>
    <div className="col-lg-2 col-md-3 border col-sm-4 d-flex flex-column">
      <p className="m-0 text-start"style={{fontSize:'1rem'}}>1023</p>
      <p className="m-0 text-start" style={{fontSize:'0.8rem'}}>Total Tenders Published</p>
    </div>
    <div className="col-lg-2 col-md-3 border col-sm-4 d-flex flex-column">
      <p className="m-0 text-start"style={{fontSize:'1rem'}}>10</p>
      <p className="m-0 text-start" style={{fontSize:'0.8rem'}}>Tenders cancelled</p>
    </div>
  </div>
    </div>
    <div className="mt-3 rounded border" style={{width:'100%',height:'auto',minHeight:'2.5rem'}}>
        <TextField
          placeholder="Search"
          id="outlined-start-adornment"
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="end">
                <AiOutlineSearch  />
            </InputAdornment>,
          }}
          style={{width:'100%'}}
        />
    </div>

    <div className= " bg-body-tertiary rounded shadow mt-3 border border-info rounded" style={{maxWidth:'100%',height:'auto',minHeight:'3rem',backgroundColor:'white'}}>
      <StickyHeadTable />
   </div>

    </div> 
    </>
)
}


export default Tenders;