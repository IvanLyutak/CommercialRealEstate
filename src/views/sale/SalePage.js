import React from 'react';
import { Form, Pagination, InputGroup, Button } from 'react-bootstrap';

import "./SalePage.css"
import DropdownList from "../../components/DropdownList"
import CompleteStageIcon from "../../components/CompleteStageIcon"
import uploadAd from '../../services/ads';

export default class SalePage extends React.Component {

    constructor() {
        super()

        this.typeAdvtRef = React.createRef();
        this.nameAdvtRef = React.createRef();
        this.typeObjectAdvtRef = React.createRef();
        this.addressAdvtRef = React.createRef();
        this.squareAdvtRef = React.createRef();
        this.descriptionAdvtRef = React.createRef();
        this.priceAdvtRef = React.createRef();
        this.contactAdvtRef = React.createRef();

        this.state = {
            isActiveSale: true, 
            isActiveRent: false,
            selectedType: "Тип помещения",
            options: ["Офис", "Коворкинг", "Торговая площадь", "Спортивный объект", "Концертный зал", "Клуб"],
            stages: [
                {"fill": "green", "ref": this.typeAdvtRef, "text": "Тип"}, 
                {"fill": "gray", "ref": this.nameAdvtRef, "text": "Название"}, 
                {"fill": "gray", "ref": this.typeObjectAdvtRef, "text": "Объект"},
                {"fill": "gray", "ref": this.addressAdvtRef, "text": "Адрес"}, 
                {"fill": "gray", "ref": this.squareAdvtRef, "text": "Площадь"}, 
                {"fill": "gray", "ref": this.descriptionAdvtRef, "text": "Описание"}, 
                {"fill": "gray", "ref": this.priceAdvtRef, "text": "Цена"}, 
                {"fill": "gray", "ref": this.contactAdvtRef, "text": "Контакты"}]
        }

        this.setSelectedType = this.setSelectedType.bind(this);
        this.scrollToMyRef = this.scrollToMyRef.bind(this);
        this.changeOfActivity = this.changeOfActivity.bind(this);
        this.changeText = this.changeText.bind(this);
        this.publishAd = this.publishAd.bind(this);
    }

    setSelectedType(e){
        if (e === "") {
            this.setState({selectedType: "Тип помещения"})
        } else {
            this.setState({selectedType: e})
            
            this.state.stages.forEach((stage) => {
                if (stage.ref === this.typeObjectAdvtRef) {
                    stage.fill = "green"
                    this.setState({stages: this.state.stages})
                    return
                }
              })
        }
    }

    scrollToMyRef(ref) {
        ref.current.scrollIntoView();
    }

    changeOfActivity(item) {
        if (item === 1) {
            this.setState({isActiveSale: true, isActiveRent: false})
        } else {
            this.setState({isActiveSale: false, isActiveRent: true})
        }
    }

    changeText(e, ref) {
        this.state.stages.forEach((stage) => {
            if (stage.ref === ref) {
                if (e.target.value !== ""){
                    stage.fill = "green"
                } else {
                    stage.fill = "gray"
                }
                this.setState({stages: this.state.stages})
                return
            }
        })
    }

    publishAd() {
        console.log(this.state.isActiveSale)
        console.log(document.getElementsByClassName('valueNameAdvt')[0].value)
        console.log(this.state.selectedType)
        console.log(document.getElementsByClassName('valueAddressAdvt')[0].value)
        console.log(document.getElementsByClassName('valueSquareAdvt')[0].value)
        console.log(document.getElementsByClassName('valueDescriptionAdvt')[0].value)
        console.log(this.state.selectedFile)
        console.log(document.getElementsByClassName('valuePriceAdvt')[0].value)
        console.log(document.getElementsByClassName('valuePhoneAdvt')[0].value)
        console.log(document.getElementsByClassName('valueEmailAdvt')[0].value)

        var typeAd = ""
        if (this.state.isActiveSale === true) {
            typeAd = "Продажа"
        } else {
            typeAd = "Аренда"
        }

        console.log(this.state.selectedFile)
        
        console.log(Array.from(this.state.selectedFile))
        const formData = new FormData();

        for (const image of this.state.selectedFile) {
            formData.append('images', image);
        }

        const data = {
            "typeAd": typeAd,
            "title": document.getElementsByClassName('valueNameAdvt')[0].value,
            "subtitle": document.getElementsByClassName('valueSubtitleAdvt')[0].value,
            "typeObject": this.state.selectedType,
            "address": document.getElementsByClassName('valueAddressAdvt')[0].value,
            "square": Number(document.getElementsByClassName('valueSquareAdvt')[0].value),
            "description": document.getElementsByClassName('valueDescriptionAdvt')[0].value,
            "images": "",
            "price": Number(document.getElementsByClassName('valuePriceAdvt')[0].value),
            "phone": document.getElementsByClassName('valuePhoneAdvt')[0].value,
            "email": document.getElementsByClassName('valueEmailAdvt')[0].value
        }

        console.log(data)
        formData.append(
            "metadata",
            JSON.stringify(data)
        );

        console.log(formData)

        uploadAd(formData, (data) => {
            console.log(data)
        })
    }

    render() {
        return (
            <div className="mainContainerSalePage">
                <div className="viewNewAdvt">
                    <h3 className="textNewAdvt"> Новое объявление </h3>
                </div>
                <div className="containerAdvtMain">
                <div className="containerAdvt">
                    <div id="typeAdvt" ref={this.typeAdvtRef}>
                        <h5 className="textNameAdvt"> Тип объявления </h5>
                        <Pagination>
                            <Pagination.Item active={this.state.isActiveSale} onClick={() => this.changeOfActivity(1)}>
                                Продажа
                            </Pagination.Item>
                            <Pagination.Item active={this.state.isActiveRent} onClick={() => this.changeOfActivity(2)}>
                                Аренда
                            </Pagination.Item>
                        </Pagination>
                    </div>
                    <div id="nameAdvt" ref={this.nameAdvtRef}>
                        <h5 className="textNameAdvt"> Название </h5>
                        <Form.Control placeholder="Название объекта" onChange={e => this.changeText(e, this.nameAdvtRef)} className="valueNameAdvt"/> 
                    </div>
                    <div id="subtitleAdvt">
                        <h5 className="textNameAdvt"> Подзаголовок </h5>
                        <Form.Control placeholder="Подзаголовок"  className="valueSubtitleAdvt"/> 
                    </div>
                    <div id="typeObjectAdvt" ref={this.typeObjectAdvtRef} >
                        <h5 className="textNameAdvt"> Объект </h5>
                        <div className="choiceTypeObject">
                            <DropdownList selectedType={this.state.selectedType} setSelectedType={this.setSelectedType} options={this.state.options}/>
                        </div>
                    </div>
                    <div id="addressAdvt" ref={this.addressAdvtRef}>
                        <h5 className="textNameAdvt"> Адрес помещения </h5>
                        <Form.Control placeholder="Город, район и адрес" onChange={e => this.changeText(e, this.addressAdvtRef)} className="valueAddressAdvt"/> 
                    </div>
                    <div id="squareAdvt" ref={this.squareAdvtRef}>
                        <h5 className="textNameAdvt"> Общая площадь </h5>
                        <InputGroup className="groupSquare">
                            <Form.Control placeholder="" onChange={e => this.changeText(e, this.squareAdvtRef)} className="valueSquareAdvt"/>
                            <InputGroup.Text>м <sup><small>2</small></sup></InputGroup.Text>
                        </InputGroup> 
                    </div>
                    <div id="descriptionAdvt" ref={this.descriptionAdvtRef}>
                        <h5 className="textNameAdvt"> Описание </h5>
                        <Form.Control as="textarea" rows={6} onChange={e => this.changeText(e, this.descriptionAdvtRef)} className="valueDescriptionAdvt"/>
                    </div>
                    <div id="imagesAdvt">
                        <h5 className="textNameAdvt"> Изображения объекта (.jpeg) </h5>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" accept=".jpeg" multiple onChange={e => { this.setState({ selectedFile: e.target.files })}}/>
                        </Form.Group>
                    </div>
                    <div id="priceAdvt" ref={this.priceAdvtRef}>
                    <h5 className="textNameAdvt"> Цена </h5>
                        <InputGroup className="groupSquare">
                            <Form.Control placeholder="" onChange={e => this.changeText(e, this.priceAdvtRef)} className="valuePriceAdvt"/>
                            <InputGroup.Text> ₽ </InputGroup.Text>
                        </InputGroup> 
                    </div>
                    <div id="contactAdvt" ref={this.contactAdvtRef} onChange={e => this.changeText(e, this.contactAdvtRef)}>
                        <h5 className="textNameAdvt"> Контакты </h5>

                        <h6 className="textNameAdvt"> Номер телефона </h6>
                        <Form.Control placeholder="+7 915 175 6404" className="valuePhoneAdvt"/> 
                        <br />
                        <h6 className="textNameAdvt"> Email </h6>
                        <Form.Control placeholder="lyutakivan802@gmail.com" className="valueEmailAdvt"/> 
                    </div>

                    <Button variant="primary" size="lg" className="buttonPublish" onClick={this.publishAd}>
                        Опубликовать
                    </Button>
                </div>
                <div className="listAdvt">
                    {this.state.stages.map(stage => (
                        <div className="stageAdvtContainer" key={Math.random()} onClick={() => this.scrollToMyRef(stage.ref)}>
                            <CompleteStageIcon fill={stage.fill} className="stageAdvtIcon"/>
                            <div className="viewstageAdvtText">
                                <div className="stageAdvtText"> {stage.text} </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        )
    }
}