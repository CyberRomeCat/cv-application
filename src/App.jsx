/* eslint-disable react/prop-types */
import { useState } from 'react';
import './App.css'

function Input({ label, type = 'text', message, setMessage}) {

  return (
    <label>
      {label}
      {" "}
      <input
        type={type}
        id = {label}
        onChange={setMessage}
        value={message}
      />
    </label>
  )
}

function RenderInput() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState({name:'', email:'', number:'',address:''});

  function isSentTrue() {
    return setIsSent(true);
  }

  return (
    <div className='container-cv'>
      <form onSubmit={(e) => {
          e.preventDefault();
          isSentTrue();
        }}>
        <Input
        label={'Name'}
        message={message.name}
        setMessage={e => {
        setMessage({...message, name: e.target.value})
          isSentTrue();
        }}
        />
          <Input
        label={'Email'}
        type='email'
        message={message.email}
        setMessage={e => {
          setMessage({...message, email: e.target.value})
          isSentTrue();
        }}
        />
          <Input
        label={'Number'}
        type='number'
        message={message.number}
        setMessage={e => {
          setMessage({...message, number: e.target.value})
          isSentTrue();
        }}
        />
          <Input
        label={'Address'}
        message={message.address}
        setMessage={e => {
          setMessage({...message, address: e.target.value})
          isSentTrue();
        }}
        />
        <button type='submit'>submit</button>
      </form> 
      <div className='cv'>
        <div className='personal-details'>
          { isSent &&
          <>
            <h1 className ="text-center ..., pb-1">{document.getElementById('Name').value}</h1>
            <div className='contact-details'>
              <p>{document.getElementById('Email').value}</p>
              <p>{document.getElementById('Number').value}</p>
              <p>{document.getElementById('Address').value}</p>
            </div>
          </>
          }
        </div>
     </div>
    </div>
  )
}

export { RenderInput }