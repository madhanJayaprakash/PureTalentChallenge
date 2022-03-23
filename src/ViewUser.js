import React,{useContext, useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import UserContext from '../src/userContext';

const ViewUser = (props) => {
    const [listUserData,setListUserData] = useState([]);
    const userData = useContext(UserContext);
    const { id } = useParams();
    useEffect(()=>{
        const filterData = userData.filter((userval) => userval.userid === parseInt(id));
        setListUserData(filterData)
    },[])
    
    return(
        <>
        <div className='singleUserlist'>
            <div className='userTitle'>
                <h1>View user</h1>
            </div>
            <div>
            <table role="table">
            <thead role="rowgroup">
            <tr role="row">
                <th role="columnheader">User Id</th>
                <th role="columnheader">Name</th>
                <th role="columnheader">Username</th>
                <th role="columnheader">Email </th>
                <th role="columnheader">Picture</th>
                <th role="columnheader">Gender</th>
                <th role="columnheader">Address</th>
                <th role="columnheader">Phoneno</th>
                </tr>
            </thead>
            <tbody role="rowgroup">
                {
                listUserData.map((valObj,key)=>{
            const { userid, fullname, username, email, picture,extras:{gender,address,Phoneno} } = valObj;
            return(
                <tr  key={userid+key}>
                    <td>{userid}</td>
                    <td>{fullname}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{picture}</td>
                    <td>{gender}</td>
                    <td>{address}</td>
                    <td>{Phoneno}</td>
                </tr>
            )
        })
        }
            </tbody>
</table>
            </div>
        </div>
        </>        
    )
}

export default ViewUser;