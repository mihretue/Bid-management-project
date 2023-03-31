import { useState } from "react"
const Pagination=({nPages,currentPage,setCurrentPage})=>{

const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

const nextPage = () => {
    if(currentPage !== nPages) 
        setCurrentPage(currentPage + 1)
}
const prevPage = () => {
    if(currentPage !== 1) 
        setCurrentPage(currentPage - 1)
}

const [data, setData] = useState([])
const [loading, setLoading] = useState(true);

const [recordsPerPage] = useState(10);

const indexOfLastRecord = currentPage * recordsPerPage;

const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

const currentRecords = data.slice(indexOfFirstRecord,indexOfLastRecord);



return(<>
<ul className="pagination justify-content-center">
<li><a className="page-link" onClick={prevPage} href="#">Previous</a></li>
{pageNumbers.map(pgNumber=>{
  <li key={pgNumber} className={`page-item ${currentPage==pgNumber ? 'active':''}`}>
    <a className="page-link" href="#" onClick={()=>{setCurrentPage(pgNumber)}}>{pgNumber}</a>
  </li>
})}
<li className="page-item">
    <a className="page-link" href="#" onClick={nextPage}>Next</a>
  </li>
</ul>
</>)
}

export default Pagination;