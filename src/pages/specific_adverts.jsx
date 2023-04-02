import React from "react";

const data = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male"},
  ]

const Specific_adverts = () => {
    return (
        <div className="container  " style={{padding:'0.1rem'}}>
        <table className=" object-fit-cover" style={{ width: '100%'}}>
        <tr>
            <th>Procurement Information</th>
        </tr>

            <tr >
                <td>Procurement Title</td>
                <td>Invitation Date</td>
                <td>Procurement Reference No</td>
                <td>Procurement Category</td>
                <td>Market Type</td>
                <td>Market Type</td>
                <td>Procurement Classification</td>
                <td>Procuring Entity</td>
                <td>Address</td>
                <td>Invitation Date</td>
                <td>Invitation Date</td>
                <td>Invitation Date</td>
                <td>Invitation Date</td>
                <td>Invitation Date</td>
                <td>Invitation Date</td>
                <td>Invitation Date</td>
            </tr>
            <tr>
            <th>Source of fund</th>
            </tr>
        </table>
      </div>     
    )
}                           
export default Specific_adverts;