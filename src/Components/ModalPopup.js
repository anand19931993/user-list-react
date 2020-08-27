import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Label, FormGroup } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { editData } from '../Helper/help';

const ModalPopup = ({edname,edusername,edid,edemail,reload=undefined, setReload=f=>f}) => {
  
  const [data, setData] = useState({
    name:"",
    email: "",
    username: "",
    id:""
});

const {
    name,
    username,
    email,
    id
  } = data;
useEffect(() => {
    setData({...data, name:edname, email:edemail, id:edid, username:edusername})
    // eslint-disable-next-line
}, [])
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  
  const submitData = () => {
      if(name === '' || email === '' || username === ''){
         toast.error("Fields cannot be empty!.",{toast:"error"})
         return false;
      } 
      if(username.length <= 3){
         toast.error("Username should have more than 3 letters!.",{toast:"error1"})
         return false;
      }
      // eslint-disable-next-line
      if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)){
        toast.error("Not a valid email address!.",{toast:"error2"})
        return false;
      }
      editData(id,data)
      .then((result)=>{
          toggle()
          toast.success("Record has been updated!",{toastId:"success"})
          setReload(!reload)
      })
      .catch((err)=>{
          toast.error("Something went wrong!",{toastId:"error4"})
      })
    
  }
  return (
    <div>
      <Button color="danger" onClick={toggle}><FaEdit />  </Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Edit</ModalHeader>
        <ModalBody>
          <Form>
          <FormGroup>
            <Label>Name:</Label>
            <Input type="text" name="name" value={name}
            onChange={e=>{setData({...data,name:e.target.value})}}
            placeholder="with a placeholder" />
         </FormGroup>
         <FormGroup>
            <Label>Username:</Label>
            <Input type="text" name="username" value={username}
            onChange={e=>{setData({...data,username:e.target.value})}}
            placeholder="with a placeholder" />
         </FormGroup>
         <FormGroup>
            <Label>Email:</Label>
            <Input type="email" name="email" value={email}
            onChange={e=>{setData({...data,email:e.target.value})}}
            placeholder="with a placeholder" />
         </FormGroup>
         
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>Cancel</Button>
          <Button color="secondary" onClick={()=>{submitData()}}>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalPopup;