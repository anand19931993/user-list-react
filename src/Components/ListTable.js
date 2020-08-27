import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import {FaEdit} from "react-icons/fa";
import {dbJson} from "./../Helper/help";
import ModalPopup from './ModalPopup';
import 'react-toastify/dist/ReactToastify.css';
import Base from '../Layout/Base';
const ListTable = () => {
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false)
    useEffect(() => {
      dbJson().then((data)=>{
        setData(data)
      }).catch((error)=>{
        console.log(error)
      })
  }, [reload]);
  
  const TextField = styled.input`
        height: 32px;
        width: 200px;
        border-radius: 3px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border: 1px solid #e5e5e5;
        padding: 0 32px 0 16px;

        &:hover {
        cursor: pointer;
        }
        `;
        

        const FilterComponent = ({ filterText, onFilter, onClear }) => (
          <>
            <TextField style={{position:"relative"}} id="search" type="text" placeholder="Filter By Name" value={filterText} onChange={onFilter} autoFocus/>
            <button type="button" className = "btn-danger" onClick={onClear} >X</button>
            
          </>
          );


        const columns = [
          {
            name: 'ID',
            selector: 'id',
            sortable: true
          },

          {
            name: 'Name',
            selector: 'first_name',
            sortable: true,
          },
          {
              name: 'Username',
              selector: 'username',
              sortable: true,
            }
           ,{
            name: 'Email',
            selector: 'email',
            sortable: true,
          }
           ,{
            cell: row => (
              <>
              <ModalPopup edname={row?.first_name} edusername={row?.username} edid={row?.id} edemail={row?.email}  
              reload={reload} setReload={setReload}
              >
                <FaEdit />
              </ModalPopup>
              
              </>
           )
            ,
            button:true}    
          ];

          const [filterText, setFilterText] = useState('');
          const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
          const filteredItems = data?.filter(item => item?.first_name && item?.first_name.toLowerCase().includes(filterText.toLowerCase()));

          const subHeaderComponentMemo = useMemo(() => {
          const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
          }
};



return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
}, [filterText, resetPaginationToggle]);

  return (
   <Base>
   <div className="container mb-5">
      <div className="row">
    <div className = "col-md-10 offset-md-1">   
    <div className="card mt-5">
    <DataTable
        title="List Of Users"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} 
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
      />
    </div>
      </div>
      </div>
   </div>
   </Base>
  );
}

export default ListTable;
