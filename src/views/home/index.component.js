import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Header from '../../common/header/index.component';
import DataTable from '../../common/data-table/index.component';

import { useForm } from "react-hook-form";
import { CONTACTS } from "../../mock-data/index.data";
import { getUuid } from "../../utils/uuid.util";
import { validateEmail, validatePhoneNumber,
  validateText } from '../../utils/validation.util';
import { FormControl, OutlinedInput, Button, Dialog, DialogTitle, 
  Box, TextField, InputLabel, Select, MenuItem, Container} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getLocalStorage, setLocalStorage } from '../../utils/local-storage.util';

import "./index.component.scss"

export default function Home() {
  const [query, setQuery] = useState("")
  const [showDialog, setDialog] = useState(false)
  const [contacts, setContacts] = useState([])
  const [contactType, setContactType] = useState('')
  const [activeContact, setActiveContact] = useState(undefined)
  const { register, handleSubmit, errors } = useForm({mode: 'onBlur'})

  const onSubmit = data => {
    const updatedList = [...contacts, {...data, id: getUuid()}]
    setContacts(updatedList)
    setLocalStorage(updatedList)
    toggleDialog()
  };

  const onUpdate = data => {
    let contactsCopy = JSON.parse(JSON.stringify(contacts))
    for(let index=0; index<contactsCopy.length; index++){
      const contactDetails = contactsCopy[index]
      if(contactDetails.id === activeContact.id){
        contactsCopy[index] = {...data, id: activeContact.id}
        break;
      }
    }
    setContacts(contactsCopy)
    setLocalStorage(contactsCopy)
    toggleDialog()
    setActiveContact(undefined)
  }

  const handleQueryChange = (event) => {
    const searchQuery = event.target.value
    const persistedContacts = getLocalStorage()
    const filteredContacts = persistedContacts.filter(contact => Object.values(contact).some((val) => val.toString().startsWith(searchQuery)));
    setContacts(filteredContacts)
    setQuery(searchQuery)
  }

  const handleAddContact = () => {
    toggleDialog()
  }

  const handleDialogClose = () => {
    toggleDialog()
  }

  const toggleDialog = () => {
    setDialog(!showDialog)
  }

  const handleContactTypeChange = (event) => {
    const activeContactType = event.target.value
    setContactType(activeContactType);
    const persistedContacts = getLocalStorage()
    const filteredContacts = persistedContacts.filter(contact => Object.values(contact).some((val) => val.toString().startsWith(query)));
    setContacts(filteredContacts)
  }

  const handleDeleteContact = (contact) => {
    const filteredContacts = contacts.filter(function(item) {
      return item.id != contact.id;
    });
    setLocalStorage(filteredContacts)
    setContacts(filteredContacts)
  }

  const handleEditContact = (contact) => {
    setActiveContact(contact)
    toggleDialog()
  }

  useEffect(()=> {
    const persistedContacts = getLocalStorage()
    if(persistedContacts)
      setContacts(persistedContacts)
    else{
      setContacts(CONTACTS)
      setLocalStorage(CONTACTS)
    }
  }, [])

  return (
    <div className="home-wrapper">
      <Header />
      
      <Container>
        <div className="tool-bar-wrapper">
          <FormControl sx={{ width: '25ch' }}>
            <OutlinedInput
              value={query}
              onChange={handleQueryChange}
              placeholder="Search Contact..."
            />
          </FormControl>
          
          <FormControl variant="outlined">
            <InputLabel id="contact-type-label">Filter By</InputLabel>
            <Select
              id="contact-type"
              value={contactType}
              label="Contact Type"
              className="contact-type-select"
              onChange={handleContactTypeChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="business">Business</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            variant="outlined"
            size="large"
            className="add-contact-button"
            startIcon={<AddIcon />}
            onClick={handleAddContact}
          >
              Add Contact
          </Button>
        </div>

        <div className="contact-list-wrapper">
          <DataTable
            data={contacts}
            showActions={true}
            activeContactType={contactType}
            tableHeaders={['Name', 'Email', 'Contact']}
            editContactCallback={(contact)=> handleEditContact(contact)}
            deleteContactCallback={(contact)=> handleDeleteContact(contact)}
          />
        </div>
      </Container>
        
      <Dialog
        classes={{ paper: "contact-dialog" }}
        onClose={handleDialogClose}
        open={showDialog}
      >
        <div className="dialog-header">
          <DialogTitle style={{textTransform: "uppercase", fontFamily: "OpenSansBold"}}>
            {activeContact ? "Edit Contact" : "Add Contact"}
          </DialogTitle>
          <CloseIcon
            className="close-icon" 
            onClick={handleDialogClose}
          />
        </div>
        <Box
          noValidate
          component="form"
          autoComplete="off"
          className="contact-form"
        >
          <div className="field-row">
            <TextField
              fullWidth
              id="name"
              type="text"
              name="name"
              label="Name"
              variant="outlined"
              error={errors && errors["name"]}
              inputRef={register(validateText())}
              helperText={errors.name && errors.name.message}
              inputProps={{
                defaultValue: activeContact ? activeContact.name : "",
              }}
            />
          </div>
          <div className="field-row">
            <TextField
              fullWidth
              id="email"
              name="email"
              type="email"
              label="Email ID"
              variant="outlined"
              error={errors && errors["email"]}
              inputRef={register(validateEmail())}
              helperText={errors.email && errors.email.message}
              inputProps={{
                defaultValue: activeContact ? activeContact.email : "",
              }}
            />
          </div>
          <div className="field-row">
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              id="personal-contact"
              name="personalContact"
              label="Personal Contact"
              error={errors && errors["personalContact"]}
              inputRef={register(validatePhoneNumber())}
              helperText={errors.personalContact && errors.personalContact.message}
              inputProps={{
                defaultValue: activeContact ? activeContact.personalContact : "",
              }}
            />
          </div>
          <div className="field-row">
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              id="business-contact"
              name="businessContact"
              label="Business Contact"
              error={errors && errors["businessContact"]}
              inputRef={register(validatePhoneNumber())}
              helperText={errors.businessContact && errors.businessContact.message}
              inputProps={{
                defaultValue: activeContact ? activeContact.businessContact : "",
              }}
            />
          </div>
        </Box>
        <div className="dialog-footer">
          <Button
            variant="outlined"
            className="cancel-button"
            onClick={toggleDialog}
          >
            Cancel
          </Button>
          {activeContact ? <Button 
            variant="outlined"
            className="submit-button"
            onClick={handleSubmit(onUpdate)}
          >
            Update Contact
          </Button> : <Button 
            variant="outlined" 
            className="submit-button" 
            onClick={handleSubmit(onSubmit)}
          >
            Add Contact
          </Button>}
        </div>
      </Dialog>
    </div>
  );
}
