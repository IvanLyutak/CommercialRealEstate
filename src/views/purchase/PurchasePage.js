import React from 'react';
import { Form, Button, Badge, Card, Row, Col } from 'react-bootstrap';

import "./PurchasePage.css"
import Dropdown from "../../components/Dropdown"
import DropdownList from "../../components/DropdownList"
import GridCards from "../../components/GridCards"

import image_1 from "../../images/best_office_1.jpeg"
import image_2 from "../../images/best_office_2.jpeg"
import image_3 from "../../images/best_office_3.jpeg"
import image_4 from "../../images/best_office_4.jpg"
import image_5 from "../../images/best_office_5.jpeg"
import image_6 from "../../images/best_office_6.jpeg"

export default class PurchasePage extends React.Component {

    constructor() {
        super()
        this.state = {
            selectedPriceFrom: "Цена", 
            selectedSquareFrom: "Площадь", 
            selectedPriceBefore: "Цена", 
            selectedSquareBefore: "Площадь", 
            selectedType: "Тип помещения",
            options: ["Офис", "Коворкинг", "Торговая площадь", "Спортивный объект", "Концертный зал", "Клуб"],
            objects: [{"title": 'Бизнес Центр Саввинский', "text": "Респектабельный офисный комплекс Москвы, формирующий пул элитной недвижимости в районе станции метро Киевская.", "image": image_1}, {"title": "Бизнес Центр Ducat Place 3", "text": "Уникальный бизнес-центр класса «А». Среди других бизнес-центров премиум сегмента «Ducat Place III” отличает реализованная в нем система энергоснабжения, которая позволяет экономить до 35% электроэнергии, что значительно понижает коммунальные платежи.", "image": image_2}, {"title": "Бизнес Центр Эрмитаж Плаза", "text": "Потрясающий воображение вид делового комплекса, само качество предлагаемых к аренде площадей, а также близость к основным достопримечательностям столицы обеспечивают постоянный и растущий спрос среди арендаторов.", "image": image_3}, {"title": "Бизнес Центр Новосущевский", "text": "Современная офисная доминанта СВАО города Москвы! Многоэтажное здание бизнес-центра выполнено по эксклюзивному дизайн-проекту известных архитекторов в стиле Hi-Tech и неизменно приковывает взоры с 2004 года в котором здание было возведено.", "image": image_4}, {"title": "Бизнес Центр Моховая", "text": "Бизнес-центр расположен в историческом центре Москвы, в двухстах метрах от Кремля, Библиотеки имени Ленина и рядом с Манежем. Станция метро Библиотека им. Ленина находится в 1 минуте пешком от здания. Бизнес-центр оснащен современными инженерными системами, в помещениях качественная отделка. Хорошо развита инфраструктура здания.","image": image_5}, {"title": "Бизнес Центр Vivaldi Plaza", "text": "один из признанных успешным бизнес-центров в Москве. Но это как раз яркий пример диссонанса: Павелецкий вокзал в его российском проявлении, трамвайные пути, узкие переулочки, пробки.","image": image_6}]
        }
        this.setSelectedFrom = this.setSelectedFrom.bind(this);
        this.setSelectedBefore = this.setSelectedBefore.bind(this);
        this.setSelectedType = this.setSelectedType.bind(this);
        this.search = this.search.bind(this);
    }

    setSelectedFrom(e, type){
        switch(type) {
            case "price":
                if (e === "") {
                    this.setState({selectedPriceFrom: "Цена"})
                } else {
                    this.setState({selectedPriceFrom: e})
                }
                break
          
            case "square":
                if (e === "") {
                    this.setState({selectedSquareFrom: "Площадь"})
                } else {
                    this.setState({selectedSquareFrom: e})
                }
                break

            default:
                break
        }
    }

    setSelectedBefore(e, type){
        switch(type) {
            case "price":
                if (e === "") {
                    this.setState({selectedPriceBefore: "Цена"})
                } else {
                    this.setState({selectedPriceBefore: e})
                }
                break
          
            case "square":
                if (e === "") {
                    this.setState({selectedSquareBefore: "Площадь"})
                } else {
                    this.setState({selectedSquareBefore: e})
                }
                break

            default:
                break
        }
    }

    setSelectedType(e){
        if (e === "") {
            this.setState({selectedType: "Тип помещения"})
        } else {
            this.setState({selectedType: e})
        }
    }

    search() {
        console.log("Click")
        console.log(window.location)

        window.location = window.location.origin + `/ads/?type=Продажа&typeObject=${this.state.selectedType}&price_from=${this.state.selectedPriceFrom}&price_to=${this.state.selectedPriceBefore}&square_from=${this.state.selectedSquareFrom}&square_to=${this.state.selectedSquareBefore}&address=${document.getElementsByClassName('address_input')[0].value}`
    }

    render() {
        return (
            <>
                <div className='backgroundPurchaseImage'>
                    <div className="searchAllField">
                        <div className='searchField'>
                            <div className="searchTypeRoom">
                                <DropdownList selectedType={this.state.selectedType} setSelectedType={this.setSelectedType} options={this.state.options}/>
                            </div>
                            <div className="intermediateElement" />
                            <div className="searchPriceRoom">
                                <Dropdown selectedFrom={this.state.selectedPriceFrom} setSelectedFrom={this.setSelectedFrom} selectedBefore={this.state.selectedPriceBefore} setSelectedBefore={this.setSelectedBefore} type={"price"}/>
                            </div>
                            <div className="intermediateElement" />
                            <div className="searchAreaRoom">
                                <Dropdown selectedFrom={this.state.selectedSquareFrom} setSelectedFrom={this.setSelectedFrom} selectedBefore={this.state.selectedSquareBefore} setSelectedBefore={this.setSelectedBefore} type={"square"}/>
                            </div>
                            <div className="searchRegionRoom">
                                <Form.Control placeholder="Город, район или адрес" className="address_input"/> 
                            </div>
                        </div>
                        <div className="buttonViewSearch">
                            <Button variant="warning" className="buttonSearch" onClick={this.search}> Найти </Button>
                        </div>
                    </div>
                </div>
                <div className="viewBestRealEstate" id="viewBestRealEstateId">
                    <h3 className="textBestRealEstate"> Лучшие объявления для покупки <Badge bg="warning"> Gold </Badge></h3>
                </div>
                <div className="gridCards">
                    <GridCards objects={this.state.objects}/>
                </div>

                <div className="viewPurchaseOptionsMain">
                    <h4 className="textPurchaseOptions"> Разные варианты покупки </h4>
                    
                        <Row xs={1} md={3} className="g-4">
                            <Col>
                                <Card className="cards">
                                    <Card.Body>
                                        <Card.Title>Ипотека от 0,01% для всех</Card.Title>
                                        <Card.Text>
                                            Ипотека с господдержкой на весь срок - до 30 лет. Первый взнос от 15%
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="cards">
                                    <Card.Body>
                                        <Card.Title>Ипотека от 3% без удорожания</Card.Title>
                                        <Card.Text>
                                            Только до 30 сентября 2023 г. будет действовать ипотечная программа на офисную недвидомость
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="cards">
                                    <Card.Body>
                                        <Card.Title>Первоначальный взнос от 0%</Card.Title>
                                        <Card.Text>
                                            Ипотека без первоначального взноса от 4,49%
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                </div>
                

                <div className="orderConsultion">
                    <h4> Закажите бесплатную консультацию у наших специалистов </h4>
                    <br />
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control type="email" placeholder="Ваше имя" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="password" placeholder="+7 987 654 3210" />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="warning" size="lg">
                                Получить консультацию
                            </Button>
                        </div>

                        <div className="agreement"> 
                            Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
                        </div>
                    </Form>
                </div>

                <h5> +7 (915) 175 6404 </h5>
                <div className="agreement"> 
                    Работаем ежедневно с 9:00 - 21:00
                </div>
                </>
        )
    }
}