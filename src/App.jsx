/* eslint-disable react/prop-types */
import { useState } from "react";
import phoneSVG from './assets/phone.svg'
import mailSVG from './assets/mail.svg'
import addressSVG from './assets/address.svg'

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
    }
        
    const [isSent, setIsSent] = useState({inputValue: false});
    const [text, setText] = useState(Initialdetails.personalDetails);
    const [education, setEducation] = useState({});
    const [experience, setExperience] = useState({});
    const [index, setIndex] = useState({education :0, experience: 0});

    const handleChange = (e, field) => {
        setText({ ...text, [field]: e.target.value });
        setIsSent({ ...isSent, [field]: true });
    }

    const handleChangeFormEdu = (e, field) => {
        const values = isSent.inputValue;
            setEducation({ ...education, [values]:  {
                ...education[values], [field]: e.target.value 
            }});
    }

    const handleChangeFormExp = (e, field) => {
        const values = isSent.inputValue;
        setExperience({ ...experience, [values]:  {
            ...experience[values], [field]: e.target.value 
        }});
    }

    const submitEdu = () => {
        const values = isSent.inputValue;
        if(!values) {
            setEducation({ ...education, [index.education]: {
                schoolName: document.getElementById('schoolName').value,
                study: document.getElementById('study').value,
                start: document.getElementById('start').value,
                end: document.getElementById('end').value,
            } });
            setIndex({...index, education: index.education + 1});
        } else {
            setEducation({ ...education, [values]: {
                schoolName: document.getElementById('schoolName').value,
                study: document.getElementById('study').value,
                start: document.getElementById('start').value,
                end: document.getElementById('end').value,
            } });
        }
    }

    const submitExp = () => {
        const values = isSent.inputValue;
        if(!values) {
            setExperience({ ...experience, [index.experience]: {
                companyName: document.getElementById('companyName').value,
                positionTitle: document.getElementById('positionTitle').value,
                tasks: document.getElementById('tasks').value,
                start: document.getElementById('start').value,
                end: document.getElementById('end').value,
            } });
            setIndex({...index, experience: index.experience + 1});
        } else {
            setExperience({ ...education, [values]: {
                companyName: document.getElementById('companyName').value,
                positionTitle: document.getElementById('positionTitle').value,
                tasks: document.getElementById('tasks').value,
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
                    {isSent.inputValue !== false && Object.keys(education).length > 0 ? 
                    <>
                        <Input label={'schoolName'} text={education[isSent.inputValue].schoolName} handleChange={ handleChangeFormEdu } />
                        <Input label={'study'} text={education[isSent.inputValue].study}  handleChange={ handleChangeFormEdu }/>
                        <Input label={'start'} text={education[isSent.inputValue].start}  handleChange={handleChangeFormEdu}/>
                        <Input label={'end'} text={education[isSent.inputValue].end}  handleChange={handleChangeFormEdu}/>
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

    const expForm = () => {
        return (
            <form onSubmit={
                (e) => {
                    e.preventDefault();
                    submitExp();
                    setIsSent({ ...isSent, registerExp: true, expForm: false});
                }
            } className="register-education-ex">
                    {isSent.inputValue !== false ? 
                    <>
                        <Input label={'companyName'} text={experience[isSent.inputValue].companyName} handleChange={ handleChangeFormExp } />
                        <Input label={'positionTitle'} text={experience[isSent.inputValue].positionTitle}  handleChange={ handleChangeFormExp }/>
                        <Input label={'tasks'} text={experience[isSent.inputValue].tasks}  handleChange={handleChangeFormExp}/>
                        <Input label={'start'} text={experience[isSent.inputValue].start}  handleChange={handleChangeFormExp}/>
                        <Input label={'end'} text={experience[isSent.inputValue].end}  handleChange={handleChangeFormExp}/>
                    </> :
                    <>
                        <Input label={'companyName'}/>
                        <Input label={'positionTitle'}/>
                        <Input label={'tasks'}/>
                        <Input label={'start'}/>
                        <Input label={'end'}/>
                    </>
                     }
                    <button type="submit">submit</button>
                    <button onClick={() => {
                                setIsSent({ ...isSent, expForm: false, inputValue: false})
                            }}>
                        cancel
                    </button>
             </form>
        )
    }

    const deleteValues = (k, details) => {
       let newState;
       if(details === 'education') {
        newState = {...education}
        delete newState[k];
        setEducation(newState);
       } else  {
        newState = {...experience}
        delete newState[k];
        setExperience(newState);
       }
       setIsSent({ ...isSent, eduForm: false, expForm: false, inputValue: false });
    }

    const values = {education: Object.values(education), experience: Object.values(experience)}

    return (
        <div className="parent-container">
            <div className="register-form">
            <h1>Personal Details</h1>
               <form className="register-personal-details">
                    <Input label={'name'} text={text.name} handleChange={ handleChange }/>
                    <Input label={'occupation'} text={text.occupation}  type={'occupation'} handleChange={ handleChange }/>
                    <Input label={'number'} text={text.number}  type={'number'} handleChange={ handleChange }/>
                    <Input label={'email'} text={text.email} type={'email'} handleChange={ handleChange }/>
                    <Input label={'address'} text={text.address}  type={'address'} handleChange={ handleChange }/>
               </form>
               <div>
                    {isSent.eduForm && eduForm()}
                    {Object.keys(education).length > 0 && 
                        <div>
                            {Object.keys(education).map((key) => (
                                <button key={key} onClick={(e) => {
                                    e.preventDefault();
                                    eduForm();
                                    setIsSent({ ...isSent, eduForm: true, inputValue: key });     
                                }}>
                                {education[key].schoolName}
                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    deleteValues(key, 'education')
                                    }}>Trash</div>
                                </button>
                              ))
                            }
                        </div>
                    }
                    <button onClick={() => setIsSent({ ...isSent, eduForm: true })}>Add Education</button>
               </div>
               <div>
               {isSent.expForm && expForm()}
                    {Object.keys(experience).length > 0 && 
                        <div>
                            {Object.keys(experience).map((key) => (
                                <button key={key} onClick={(e) => {
                                    e.preventDefault();
                                    expForm();
                                    setIsSent({ ...isSent, expForm: true, inputValue: key });     
                                }}>
                                {experience[key].companyName}
                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    deleteValues(key, 'experience');
                                    }}>Trash</div>
                                </button>
                              ))
                            }
                        </div>
                 }
                    <button onClick={() => setIsSent({ ...isSent, expForm: true })}>Add Experience</button>
               </div>
            </div>
            
            <div className="cv">
                <header className="header">
                    {isSent.name && <p className="name">{text.name}</p>}
                    {isSent.occupation && <p className="occupation">{text.occupation}</p>}
                </header>
                <div className="content">
                    <div className="personal-details">
                        <h1 className="font-semibold text-xl pb-4">Personal Details:</h1>
                        {isSent.number && <div>
                            <img src={ phoneSVG }/>
                            <p>{text.number}</p> 
                        </div>}
                        {isSent.email && <div>
                            <img src={ mailSVG }/>
                            <p>{text.email}</p> 
                        </div>}
                        {isSent.address && <div>
                            <img src={ addressSVG }/>
                            <p>{text.address}</p> 
                        </div>}
                    </div>
                    <div className="more-details" >
                        <h1>Education</h1>
                        <div className="line"></div>
                        {isSent.registerEdu && 
                         <>
                            {values.education.map((value, index) => (                    
                                <div className="educational-details" key={index}>
                                    <div>
                                        <h1 className="title">{value.schoolName}</h1>
                                        <h2 className="sub-title">{value.study}</h2>
                                    </div>
                                    <div className="education-date"> 
                                        <h2>{value.start}-{value.end}</h2>
                                    </div>
                                </div>        
                        ))}   
                        </>}
                        <h1>Experience</h1>
                        <div className="line"></div>
                        {isSent.registerExp && 
                            <>
                                {values.experience.map((value, index) => (               
                                    <div className="experience-details" key={index}>
                                        <div>
                                            <div>
                                                <h1 className="title">{value.companyName}</h1>
                                                <h2 className="sub-title">{value.positionTitle}</h2>
                                            </div>
                                            <div>
                                                <h2>{value.start}-{value.end}</h2>
                                            </div>
                                        </div>                                        
                                        <p className="tasks">{value.tasks}</p>
                                    </div>        
                            ))}
                            </>}
                    </div>
                </div>
                
            </div>
        </div>
    )
}