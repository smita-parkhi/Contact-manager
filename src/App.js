import { useState } from 'react';
// import { CONTACTS } from './mock-data';

import Home from './views/home/index.component';

function App() {
  // const [query, setQuery] = useState("")
  // const [contacts, setContacts] = useState(CONTACTS)

  // const contactHeaderData = Object.keys(contacts[0])

  // const handleColoumnClick = (coloumn) => {
  //   let filteredList = []
  //   for(let index=0; index<CONTACTS.length; index++){
  //     const contactDetails = CONTACTS[index]
  //     filteredList.push({[coloumn]: contactDetails[coloumn]})
  //   }
    
  //   setContacts(filteredList)
  // }

  // const handleChange = (event) => {
  //   const searchQuery = event.target.value
  //   const filteredContacts = CONTACTS.filter(contact => Object.values(contact).some((val) => val.toString().startsWith(searchQuery)));
  //   setContacts(filteredContacts)
  //   setQuery(searchQuery)
  // }

  // const renderContactListHeader = () => {
  //   return(
  //     <tr className="list-header">
  //       {contactHeaderData.map(coloumn => <th key={coloumn} className="coloumn" onClick={()=> handleColoumnClick(coloumn)}>
  //         {coloumn}
  //       </th>)}
  //     </tr>
  //   )
  // }

  // const renderContactListData = (contact) => {
  //   const contactDetails = Object.values(contact)
  //   return(
  //     <tr className="list-data" key={contact.id}>
  //       {contactDetails.map((coloumnData, index) => <td key={index} className="coloumn">{coloumnData}</td>)}
  //     </tr>
  //   )
  // }

  return(
    <Home />
  )

  // return (
  //   <div className="app">
  //     <header className="header"></header>

  //     <div className="contact-list-wrapper">
  //       <table>
  //         {renderContactListHeader()}

  //         {contacts.map(contact => renderContactListData(contact))}
  //       </table>
  //     </div>


  //     <input
  //       type="text"
  //       value={query}
  //       onChange={handleChange}
  //     />
  //   </div>
  // );
}

export default App;
