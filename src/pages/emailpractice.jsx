import { useState } from "react"

const Email=()=>{
    const [input,setInput]=useState({to:"fanuelamare7765@gmail.com",subject:'testing',body:'Love Is Blind!'})
    const send=()=>{
        fetch('http://localhost:3001/sendemail',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(input)
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.res=="ok"){
                document.getElementById('result').innerHTML="done"
            }else{
                document.getElementById('result').innerHTML="no way"
            }
        })
        .catch((err)=>{console.log(err)})
    }
return(<div>
    <button onClick={()=>{send()}} className="btn btn-primary mt-3">Send</button>
    <p id="result"></p>
</div>)
}

export default Email;