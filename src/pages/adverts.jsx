import { useEffect,useState } from "react"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {AiOutlineSearch} from 'react-icons/ai'

const Adverts=()=>{
    useEffect(()=>{document.title='Cheretanet | Bid Advertisements'})

 


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

    <div className="mt-3" style={{width:'100%',height:'auto',minHeight:'20rem',backgroundColor:'white'}}>
      <table id="example" class="table table-striped mt-0" style={{width:'100%'}}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Position</th>
        <th>Office</th>
        <th>Age</th>
        <th>Start date</th>
        <th>Salary</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Tiger Nixon</td>
        <td>System Architect</td>
        <td>Edinburgh</td>
        <td>61</td>
        <td>2011/04/25</td>
        <td>$320,800</td>
      </tr>
      <tr>
        <td>Garrett Winters</td>
        <td>Accountant</td>
        <td>Tokyo</td>
        <td>63</td>
        <td>2011/07/25</td>
        <td>$170,750</td>
      </tr>
      <tr>
        <td>Ashton Cox</td>
        <td>Junior Technical Author</td>
        <td>San Francisco</td>
        <td>66</td>
        <td>2009/01/12</td>
        <td>$86,000</td>
      </tr>
      <tr>
        <td>Cedric Kelly</td>
        <td>Senior Javascript Developer</td>
        <td>Edinburgh</td>
        <td>22</td>
        <td>2012/03/29</td>
        <td>$433,060</td>
      </tr>
      <tr>
        <td>Airi Satou</td>
        <td>Accountant</td>
        <td>Tokyo</td>
        <td>33</td>
        <td>2008/11/28</td>
        <td>$162,700</td>
      </tr>
      <tr>
        <td>Brielle Williamson</td>
        <td>Integration Specialist</td>
        <td>New York</td>
        <td>61</td>
        <td>2012/12/02</td>
        <td>$372,000</td>
      </tr>
      <tr>
        <td>Herrod Chandler</td>
        <td>Sales Assistant</td>
        <td>San Francisco</td>
        <td>59</td>
        <td>2012/08/06</td>
        <td>$137,500</td>
      </tr>
      <tr>
        <td>Rhona Davidson</td>
        <td>Integration Specialist</td>
        <td>Tokyo</td>
        <td>55</td>
        <td>2010/10/14</td>
        <td>$327,900</td>
      </tr>
      <tr>
        <td>Colleen Hurst</td>
        <td>Javascript Developer</td>
        <td>San Francisco</td>
        <td>39</td>
        <td>2009/09/15</td>
        <td>$205,500</td>
      </tr>
      <tr>
        <td>Sonya Frost</td>
        <td>Software Engineer</td>
        <td>Edinburgh</td>
        <td>23</td>
        <td>2008/12/13</td>
        <td>$103,600</td>
      </tr>
      <tr>
        <td>Donna Snider</td>
        <td>Customer Support</td>
        <td>New York</td>
        <td>27</td>
        <td>2011/01/25</td>
        <td>$112,000</td>
      </tr>
    </tbody>
   
  </table>
   </div>

    </div> 
    </>
)
}


export default Adverts;