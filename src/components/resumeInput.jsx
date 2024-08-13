/* eslint-disable react/prop-types */
import Input from "./input";
import { eduForm, expForm } from "./forms";

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
    return (
        <div className="resume-input">
        <h1>Personal Details</h1>
           <form className="register-personal-details">
                <Input label={'name'} text={text.name} handleChange={ handleChange }/>
                <Input label={'occupation'} text={text.occupation}  type={'occupation'} handleChange={ handleChange }/>
                <Input label={'number'} text={text.number}  type={'number'} handleChange={ handleChange }/>
                <Input label={'email'} text={text.email} type={'email'} handleChange={ handleChange }/>
                <Input label={'address'} text={text.address}  type={'address'} handleChange={ handleChange }/>
           </form>
           <div>
                {isSent.eduForm && eduForm(isSent,setIsSent, education, handleChangeEdu, submitEdu)}
                {RenderButtons(isSent,setIsSent, education, handleChangeEdu, submitEdu, deleteValues, 'education')}
                <button onClick={() => setIsSent({ ...isSent, eduForm: true })}>Add Education</button>
           </div>
           <div>
                {isSent.expForm && expForm(isSent, setIsSent, experience, submitExp, handleChangeExp)}
                {RenderButtons(isSent,setIsSent, experience, handleChangeExp, submitExp, deleteValues, 'experience')}
                <button onClick={() => setIsSent({ ...isSent, expForm: true })}>Add Experience</button>
           </div>
        </div>        
    )
}

export default ResumeInput

