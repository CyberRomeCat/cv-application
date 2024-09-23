import { useState } from "react";
import ResumeInput from "./components/resumeInput.jsx";
import DisplayResume from "./components/displayResume.jsx";

export default function RenderCVMaker() {
    let InitialDetails = {
            name:'',
            occupation:'', 
            email:'',
            number:'', 
            address:'', 
    }
        
    const [isSent, setIsSent] = useState({inputValue: false});
    const [text, setText] = useState(InitialDetails);
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
            <ResumeInput
                text={text} 
                handleChange={handleChange} 
                isSent={isSent} 
                education={education} 
                experience={experience} 
                setIsSent={setIsSent} 
                deleteValues={deleteValues} 
                handleChangeEdu={handleChangeFormEdu} 
                submitEdu={submitEdu} 
                submitExp={submitExp}
                handleChangeExp={handleChangeFormExp}
            />       
            <DisplayResume
                isSent={isSent}
                text={text}
                values={values}
            />
        </div>
    )
}