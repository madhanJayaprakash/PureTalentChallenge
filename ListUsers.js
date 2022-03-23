import React,{useContext, useEffect, useState, useCallback} from 'react';
import ReactPaginate from 'react-paginate';
import ImageViewer from "react-simple-image-viewer";
import { Link } from "react-router-dom";
import UserContext from '../src/userContext';

/* Below line is used for pagination and user chose how many items are shown per page, by default set to 3   */
const itemsPerPage = 3;

const ListUser = () =>{
    /* Lineno 10 to 11 set state for pagination  */
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    /* Line no 15 and 16  set state for input serach field*/ 
    const [searchBytext,setSearchByTextStatus] = useState(true);
    const [searchByTextVal,setsearchByTextVal] = useState('')
    /* Line18 set the state for data from json to be rendered*/
    const [listUserData,setListUserData] = useState([]);
    /*Line20 to line 22 for image viewer */
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [imgPath, setImgPath] = useState([]);
  
    /* sorting function starts */
    const sortingFunc = (a, b)=>{
       return a.userid-b.userid;
    }
    /* sorting function ends */

    /*Getting the User array from context root component */
    const userData = useContext(UserContext).sort(sortingFunc);

    const openImageViewer = useCallback((e,index) => {
        const temp =[];
        temp.push(e.target.getAttribute('src'));
        setImgPath([...temp])
        setCurrentImage(0);
        setIsViewerOpen(true);
    }, []);

    /* Image viewer close function starts */
    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    /* Image viewer close function ends */

    useEffect(() => {
         doPagination();
      }, [itemOffset, itemsPerPage]);

      
      const doPagination = () =>{
        const endOffset = itemOffset + itemsPerPage;
          setListUserData(userData.slice(itemOffset, endOffset));
          setPageCount(Math.ceil(userData.length / itemsPerPage));
      }

      const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % userData.length;
        setItemOffset(newOffset);
      };

    const searchbyUserName = (e) => {
        
        /* Below line55 to 60 search input field accepts only alphabets */
        const re = /^[A-Za-z]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setsearchByTextVal(e.target.value)
        }else {
            return;
        }
        const searchText = e.target.value;
        let searchedUserData;
          if(searchText){
            setSearchByTextStatus(false);
            searchedUserData = userData.filter(obj => {
                const temp = [obj['username'].toLowerCase()];
                return temp.some(val => val.indexOf(searchText) !== -1)
              });
          } else{
            const endOffset = itemOffset + itemsPerPage;
            searchedUserData = userData.slice(itemOffset, endOffset);
            setSearchByTextStatus(true); 
          }
          setListUserData(searchedUserData);
    }

    return(
        <>
        <div className='userList'>
            <div className='userheader'>
                <h1>User List</h1>
                <div className="search-container">
                  <input onChange={searchbyUserName} value={searchByTextVal} type="text" placeholder="Search by username" name="search" />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </div>
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
                <th role="columnheader">Action</th>
                </tr>
            </thead>
            <tbody role="rowgroup">
                {
                listUserData.map((valObj,key,arr)=>{
            const { userid, fullname, username, email, picture } = valObj;
            return(
                <tr  key={userid+key}>
                    <td >{userid}</td>
                    <td className='usernamecls'>{fullname}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td> 
                        <img
                            src={picture}
                            onClick={(e) => openImageViewer(e,userid)}
                            width="200"
                            height="100"
                            style={{ margin: "2px" }}
                            alt=""
                        />
                    </td>
                    <td><Link to={`/user/${userid}`}>view more</Link></td>
                </tr>
            )
        })
        }
            </tbody>
</table>
        {
          searchBytext && (
            <ReactPaginate
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="previous"
            renderOnZeroPageCount={null}
            activeClassName="active"
        />
          ) 
        }
        {
            isViewerOpen && (
                <div> {imgPath}</div>
            )
        }
        {isViewerOpen && (
            <ImageViewer
            src={imgPath}
            currentIndex={currentImage}
            onClose={closeImageViewer}
            backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)"
            }}
            />
        )}
        </div>
        </div>
        
            
        </>
        )
}

export default ListUser;