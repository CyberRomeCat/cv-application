import Input from "./input";
import { eduForm, expForm } from "./forms";
import { useState } from "react";

function RenderButtons(isSent,setIsSent, field, handleChange, submit,deleteValues, string) {
    return (
        Object.keys(field).length > 0 && 
            <div>
                {Object.keys(field).map((key) => (
                    <button key={key} onClick={(e) => {
                        e.preventDefault();
                        if (string == 'education') {
                            eduForm(isSent,setIsSent, field, handleChange, submit);
                            setIsSent({ ...isSent, eduForm: true, inputValue: key });    
                        } else {
                            expForm(isSent,setIsSent, field, handleChange, submit);
                            setIsSent({ ...isSent, expForm: true, inputValue: key });    
                        }
                    }}>
                    {string === 'education' ? field[key].schoolName : field[key].companyName}
                    <div onClick={(e) => {
                        e.stopPropagation();
                        deleteValues(key, string)
                        }}>Trash</div>
                    </button>
                ))
                }
            </div>    
    )
}

function ResumeInput({text, handleChange, isSent, education,experience, setIsSent,deleteValues, handleChangeEdu, submitEdu, submitExp, handleChangeExp}) {

    const [dropDown, setDropDown] = useState({});

    const onButtonClick = (field) => () => {
        if(field === 'personal' && dropDown.personal != true) {
            setDropDown({...dropDown, personal: true});
        }else if(field === 'education' && dropDown.education != true){
            setDropDown({...dropDown, education: true});
        }else if(field === 'experience' && dropDown.experience != true){
            setDropDown({...dropDown, experience: true});
        } else {
            setDropDown({...dropDown, personal: false, education: false, experience: false});
        }
    }

    return (
        <div className="resume-input">
            <div className="dropdown">
                <button className="link" onClick={onButtonClick('personal')}>Personal Details</button>
                <div className={dropDown.personal == true ? 'dropdown-input' : 'none'}>
                    <form className="register-personal-details">
                        <Input label={'name'} text={text.name} handleChange={ handleChange }/>
                        <Input label={'occupation'} text={text.occupation}  type={'occupation'} handleChange={ handleChange }/>
                        <Input label={'number'} text={text.number}  type={'number'} handleChange={ handleChange }/>
                        <Input label={'email'} text={text.email} type={'email'} handleChange={ handleChange }/>
                        <Input label={'address'} text={text.address}  type={'address'} handleChange={ handleChange }/>
                    </form>
                </div>
            </div> 
           <div className="dropdown">
                <button className="link" onClick={onButtonClick('education')}>Education</button>
                <div className={dropDown.education == true ? 'dropdown-input' : 'none'}>
                    {isSent.eduForm && eduForm(isSent,setIsSent, education, handleChangeEdu, submitEdu)}
                    {RenderButtons(isSent,setIsSent, education, handleChangeEdu, submitEdu, deleteValues, 'education')}
                    <button onClick={() => setIsSent({ ...isSent, eduForm: true })}>Add Education</button>
                </div>
           </div>
           <div className="dropdown">
                <button className="link" onClick={onButtonClick('experience')}>Experience</button>
                <div className={dropDown.experience == true ? 'dropdown-input' : 'none'}>
                    {isSent.expForm && expForm(isSent, setIsSent, experience, submitExp, handleChangeExp)}
                    {RenderButtons(isSent,setIsSent, experience, handleChangeExp, submitExp, deleteValues, 'experience')}
                    <button onClick={() => setIsSent({ ...isSent, expForm: true })}>Add Experience</button>
                </div>
           </div>
        </div>        
    )
}

export default ResumeInput

