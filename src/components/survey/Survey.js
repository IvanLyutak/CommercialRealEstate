import { useState } from "react"
import "./Survey.css"
import { Button } from "react-bootstrap"

function Survey({vote, questions}) {

    const [choice, setChoice] = useState("")

    return(
        <>
        {   Object.keys(questions).length === 0 ?
                    <></>
                :
                    <div className="main_survey">
                        { questions === "result" ? 
                        <div className="resultSurvey">
                            <div className="text">
                                Благодарим вас за пройденный опрос
                            </div>
                        </div> : 
                            <div className="survey">
                            <form>
                                <div>
                                    <label className="questionSurvey">{Object.keys(questions)}</label>
                                    {Object.values(questions)[0].map((val) => {
                                        return(
                                        <div key={val} >
                                            <input
                                                type="radio"
                                                value={choice}
                                                checked={val === choice}
                                                onChange={() => setChoice(val)}
                                                className="radioSurvey"
                                            />
                                            {val}
                                        </div>)
                                    })}
                                </div>
                                <Button variant="warning" className="buttonVote" type="button" onClick={() => { if(Object.values(questions)[0].includes(choice)) {vote(choice)}}}> Ответить </Button>
                            </form>
                            </div>
                        }
                    </div>
            }
        </>
    )
}

export default Survey