import Input from "./input";

const expForm = (isSent, setIsSent, experience, handleChange, submitExp) => {
    return (
        <form onSubmit={
            (e) => {
                e.preventDefault();
                submitExp();
                setIsSent({ ...isSent, registerExp: true, expForm: false});
                document.getElementById('addExperience').style.display = 'block'  
                document.getElementById('fieldButtonsExp').style.display = 'block'  
            }
        } className="register-experience-ex">
                {isSent.inputValue !== false && Object.keys(experience).length > 0 ? 
                <>
                    <Input label={'companyName'} text={experience[isSent.inputValue].companyName} handleChange={ handleChange } />
                    <Input label={'positionTitle'} text={experience[isSent.inputValue].positionTitle}  handleChange={ handleChange }/>
                    <Input label={'tasks'} text={experience[isSent.inputValue].tasks}  handleChange={handleChange}/>
                    <Input label={'start'} text={experience[isSent.inputValue].start}  handleChange={handleChange}/>
                    <Input label={'end'} text={experience[isSent.inputValue].end}  handleChange={handleChange}/>
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
                            setIsSent({ ...isSent, expForm: false, inputValue: false});        
                            document.getElementById('addExperience').style.display = 'block';
                            document.getElementById('fieldButtonsExp').style.display = 'block'                                 
                        }}>
                    cancel
                </button>
         </form>
    )
}

const eduForm = (isSent,setIsSent,education, handleChange, submitEdu) => {
    return (
        <form onSubmit={
            (e) => {
                e.preventDefault();
                submitEdu();
                setIsSent({ ...isSent, registerEdu: true, eduForm: false});
                document.getElementById('addEducation').style.display = 'block';
                document.getElementById('fieldButtonsEdu').style.display = 'block';
            }
        } className="register-education-ex">
                {isSent.inputValue !== false && Object.keys(education).length > 0? 
                <>
                    <Input label={'schoolName'} text={education[isSent.inputValue].schoolName} handleChange={ handleChange } />
                    <Input label={'study'} text={education[isSent.inputValue].study}  handleChange={ handleChange }/>
                    <Input label={'start'} text={education[isSent.inputValue].start}  handleChange={handleChange}/>
                    <Input label={'end'} text={education[isSent.inputValue].end}  handleChange={handleChange}/>
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
                        document.getElementById('addEducation').style.display = 'block';
                        document.getElementById('fieldButtonsEdu').style.display = 'block';
                    }}>cancel</button>
         </form>
    )
}

export {eduForm, expForm}