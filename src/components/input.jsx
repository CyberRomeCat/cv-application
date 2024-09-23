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

export default Input

