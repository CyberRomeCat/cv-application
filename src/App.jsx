/* eslint-disable react/prop-types */
import { useState } from "react";

const formatLabel = (label) => {
    return label
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};

function Input({ label, type = 'text', text, handleChange,}) {
    
    return (
    <label>
        {formatLabel(label)}
        {" "}
        <input value={text} type={type} onChange={(e) => handleChange(e, label)} id={label}/>
    </label>
    )
}

function RenderCVMaker() {
    let Initialdetails = {
        name:'', 
        number:'', 
        address:'', 
        schoolName: '', 
        study: '',
        educationStart:'',
        educationEnd:'',
        companyName:'',
        positionTitle:'',
        companyStart:'',
        companyEnd:'',
        responsibilities:'',
    }
        
    const [isSent, setIsSent] = useState({});
    const [text, setText] = useState(Initialdetails);

    const handleChange = (e, field) => {
        setText({ ...text, [field]: e.target.value });
        setIsSent({ ...isSent, [field]: true });
    }

    const handleChangeForm = (e, field) => {
        setText({ ...text, [field]: e.target.value });
        setIsSent({ ...isSent, [field]: true });
        setIsSent({ ...isSent, registerEdu: false });
    }
    
    return (
        <div className="parent-container">
            <div className="register-form">
               <form className="register-personal-details">
                    <Input label={'name'} text={text.name} handleChange={ handleChange }/>
                    <Input label={'number'} text={text.number}  type={'number'} handleChange={ handleChange }/>
                    <Input label={'address'} text={text.address}  type={'address'} handleChange={ handleChange }/>
               </form>
               <form onSubmit={
                (e) => {
                    e.preventDefault();
                    setIsSent({ ...isSent, registerEdu: true });
                }
               } className="register-education-ex">
                    <Input label={'schoolName'} text={text.schoolName} handleChange={ handleChangeForm }/>
                    <Input label={'study'} text={text.study} handleChange={ handleChangeForm }/>
                    <Input label={'educationStart'} text={text.educationStart} type="number" handleChange={ handleChangeForm }/>
                    <Input label={'educationEnd'} text={text.educationEnd} type='number' handleChange={ handleChangeForm }/>
                    <button type="submit">submit</button>
               </form>
            </div>
            <div className="cv">
                <div className="personal-details">
                    {isSent.name && <p>{text.name}</p>}
                    {isSent.number && <p>{text.number}</p>}
                    {isSent.address && <p>{text.address}</p>}
                </div>
                {isSent.registerEdu && <>
                    <div className="education">
                    <p>{text.schoolName}</p>
                    <p>{text.study}</p>
                    <p>{text.educationStart}</p>
                    <p>{text.educationEnd}</p>
                </div>
                </>}
            </div>
        </div>
    )
}

export default RenderCVMaker;