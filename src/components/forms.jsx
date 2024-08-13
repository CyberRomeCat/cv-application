import Input from "./input";

const expForm = (isSent, setIsSent, experience, submitExp, handleChange) => {
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
                            setIsSent({ ...isSent, registerExp: true, expForm: false, inputValue: false});                                        
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
            }
        } className="register-education-ex">
                {isSent.inputValue !== false && Object.keys(education).length > 0 ? 
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
                    }}>cancel</button>
         </form>
    )
}

export {eduForm, expForm}