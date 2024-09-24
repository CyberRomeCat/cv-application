import phoneSVG from '../assets/phone.svg'
import mailSVG from '../assets/mail.svg'
import addressSVG from '../assets/address.svg'

export default function DisplayResume({isSent,text, values}) {
    return( 
        <div className="display-resume">
            <div className="header">
                {isSent.name && <p className="name">{text.name}</p>}
                {isSent.occupation && <p className="occupation">{text.occupation}</p>}
            </div>
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
    )
}