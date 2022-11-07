import { useState, useEffect, useRef } from "react"
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import "./Dropdown.css"
import chevron from "../images/chevron-down.svg"

function Dropdown({selectedFrom, setSelectedFrom, selectedBefore, setSelectedBefore, type}) {
    const [isActive, setIsActive] = useState(false);
    const [open, setOpen] = useState(true);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsActive(false)
            setOpen(true)

          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [wrapperRef]);

    return (
        <div className="dropdown" ref={wrapperRef}>
            <div className="dropdown-btn" 
                onClick={() => {
                    setIsActive(!isActive) 
                    setOpen(!open)
                }}>
                    {
                        (selectedFrom  === "Цена" && selectedBefore  === "Цена") || (selectedFrom  === "Площадь" && selectedBefore  === "Площадь")
                        ? selectedFrom : (
                                selectedFrom  === "Цена" || selectedFrom  === "Площадь"
                                ? `до ${selectedBefore}`
                            : (
                                selectedBefore  === "Цена" || selectedBefore  === "Площадь"
                                ? `от ${selectedFrom}`
                                : `${selectedFrom} - ${selectedBefore}`
                            )
                        )
                    }
                { open ?  <img src={chevron}  alt="" className="chevronItem"/> : <img src={chevron} style={{transform: "rotate(180deg)"}} alt="" className="chevronItem"/> }
            </div>
            {isActive && (
                <div className="dropdown-content">
                    <Form>
                        <Row>
                            <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 1 }}>
                                <InputGroup className="input_price">
                                    { selectedFrom === "Цена" ||  selectedFrom === "Площадь" 
                                        ?  <Form.Control placeholder="от" onChange={ e => setSelectedFrom(e.target.value, type) } /> 
                                        :  <Form.Control placeholder="от" onChange={ e => setSelectedFrom(e.target.value, type) } defaultValue={selectedFrom}/>
                                    }
                                    { type === "price" ?  <InputGroup.Text>₽</InputGroup.Text> : <InputGroup.Text>м <sup><small>2</small></sup></InputGroup.Text> }
                                </InputGroup>
                            </Col>
                            <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 2 }}> 
                                <InputGroup className="input_price">
                                    { selectedBefore === "Цена" ||  selectedBefore === "Площадь" 
                                        ?  <Form.Control placeholder="до" onChange={ e => setSelectedBefore(e.target.value, type) } /> 
                                        :  <Form.Control placeholder="до" onChange={ e => setSelectedBefore(e.target.value, type) } defaultValue={selectedBefore}/>
                                    }
                                    { type === "price" ?  <InputGroup.Text>₽</InputGroup.Text> : <InputGroup.Text>м <sup><small>2</small></sup></InputGroup.Text> }
                                </InputGroup>
                            </Col>
                        </Row>
                    </Form>
                </div>
            )}
        </div>
    )
}

export default Dropdown