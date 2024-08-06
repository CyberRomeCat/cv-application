/* eslint-disable react/prop-types */
import { useState } from "react";

const formatLabel = (label) => {
    return label
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};

function Input({ label, type = 'text', text, handleChange}) {

    if(text == undefined && handleChange == undefined) {
        return (
            <label>
                {formatLabel(label)}
                {" "}
                <input  type={type} id={label}/>
            </label>
        )
    }
    
    return (
    <label>
        {formatLabel(label)}
        {" "}
        <input value={text} type={type} onChange={(e) => handleChange(e, label)} id={label}/>
    </label>
    )
}

export default function RenderCVMaker() {
    let Initialdetails = {
        personalDetails: {
            name:'', 
            email:'',
            number:'', 
            address:'', 
        },
        educationDetails: {}
    }
        
    const [isSent, setIsSent] = useState({inputValue: false});
    const [text, setText] = useState(Initialdetails.personalDetails);
    const [education, setEducation] = useState(Initialdetails.educationDetails);
    const [index, setIndex] = useState(0);

    const handleChange = (e, field) => {
        setText({ ...text, [field]: e.target.value });
        setIsSent({ ...isSent, [field]: true });
    }

    const handleChangeForm = (e, field) => {
        const values = isSent.inputValue;
        setEducation({ ...education, [values]:  {
            ...education[values], [field]: e.target.value 
        }});
    }

    const submitEdu = () => {
        const values = isSent.inputValue;
        if(!values) {
            setEducation({ ...education, [index]: {
                schoolName: document.getElementById('schoolName').value,
                study: document.getElementById('study').value,
                start: document.getElementById('start').value,
                end: document.getElementById('end').value,
            } });
            setIndex(index + 1);
        } else {
            setEducation({ ...education, [values]: {
                schoolName: document.getElementById('schoolName').value,
                study: document.getElementById('study').value,
                start: document.getElementById('start').value,
                end: document.getElementById('end').value,
            } });
        }
    }

    const eduForm = () => {
        return (
            <form onSubmit={
                (e) => {
                    e.preventDefault();
                    submitEdu();
                    setIsSent({ ...isSent, registerEdu: true, eduForm: false});
                }
            } className="register-education-ex">
                    {isSent.inputValue !== false ? 
                    <>
                        <Input label={'schoolName'} text={education[isSent.inputValue].schoolName} handleChange={ handleChangeForm } />
                        <Input label={'study'} text={education[isSent.inputValue].study}  handleChange={ handleChangeForm }/>
                        <Input label={'start'} text={education[isSent.inputValue].start}  handleChange={handleChangeForm}/>
                        <Input label={'end'} text={education[isSent.inputValue].end}  handleChange={handleChangeForm}/>
                    </> :
                    <>    
                        <Input label={'schoolName'} />
                        <Input label={'study'}/>
                        <Input label={'start'} />
                        <Input label={'end'} />
                    </>
                     }
                    <button type="submit">submit</button>
                    <button onClick={() => {
                        setIsSent({ ...isSent, eduForm: false, inputValue: false})
                        }}>cancel</button>
             </form>
        )
    }

    const deleteValues = (k) => {
       const newState = {...education}
       delete newState[k];
       setEducation(newState);
       setIsSent({ ...isSent, eduForm: false, inputValue: false });
       setIndex(index - 1);
    }

    const values = Object.values(education)

    return (
        <div className="parent-container">
            <div className="register-form">
               <form className="register-personal-details">
                    <Input label={'name'} text={text.name} handleChange={ handleChange }/>
                    <Input label={'number'} text={text.number}  type={'number'} handleChange={ handleChange }/>
                    <Input label={'email'} text={text.email} type={'email'} handleChange={ handleChange }/>
                    <Input label={'address'} text={text.address}  type={'address'} handleChange={ handleChange }/>
               </form>
               <div>
                    {isSent.eduForm && eduForm()}
                    {Object.keys(education).length > 0 && 
                        <div>
                            {Object.keys(education).map((key) => (
                                <button key={key} id={key} onClick={(e) => {
                                    e.preventDefault();
                                    eduForm();
                                    setIsSent({ ...isSent, eduForm: true, inputValue: key });     
                                }}>
                                {education[key].schoolName}
                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    deleteValues(key)
                                    }}>Trash</div>
                                </button>
                              ))
                            }
                        </div>
                    }
                    <button onClick={() => setIsSent({ ...isSent, eduForm: true })}>Add Education</button>
               </div>
            </div>
            <div className="cv">
                <div className="personal-details">
                    {isSent.name && <p>{text.name}</p>}
                    {isSent.number && <p>{text.number}</p>}
                    {isSent.email && <p>{text.email}</p>}
                    {isSent.address && <p>{text.address}</p>}
                </div>
                {isSent.registerEdu && 
                <>
                    {values.map((value, index) => (                    
                        <div key={index}>
                            <p>{value.schoolName}</p>
                            <p>{value.study}</p>
                            <p>{value.start}</p>
                            <p>{value.end}</p>
                        </div>        
                ))}   
                </>}
            </div>
        </div>
    )
}