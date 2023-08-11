import React, { useEffect, useState } from "react"

const Ookla = (props) => {
    const data = props.data;
   
    if(data){
        const json_data = JSON.parse(data);
        const ookla = json_data.ooklaData;
        return (
            <>
                <table className="table table-striped table-bordered align-middle mt-3 mb-2" style={{width:"60%"}}>
                    <thead>
                        <tr style={{textAign:"center"}}>
                            <th colSpan={2}><h3>Ookla upload and download speed</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>4G Upload Speed</th>
                            <td>{ookla.UL}</td>
                        </tr>
                        <tr>
                            <th>4G Download Speed</th>
                            <td>{ookla.DL}</td>
                        </tr>
                    </tbody>
                    
                </table>
            </>
        )
    }else{
        return (
            <><p>No Data Found!</p></>

        )
    }
}

export default Ookla
