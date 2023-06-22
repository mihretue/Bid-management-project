import { useEffect} from "react"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {AiOutlineSearch} from 'react-icons/ai'
import StickyHeadTable from "../components/Bid Table";
import Footer from "../components/footer";
const Tenders=()=>{
    useEffect(()=>{document.title='Cheretanet | Tenders'})

return(<>
    <div id="advertss" className="mb-5" >
    <h1 className="text-center">Tenders</h1>
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
    <Footer />
    </>
)
}


export default Tenders;