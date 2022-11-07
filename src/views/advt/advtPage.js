import React from 'react';
import { Button } from 'react-bootstrap';

import Slider from "../../components/slider/Slider"
import "./advtPage.css"

var d = {}
for(var i in window.location.search.replace('?', '').split('&')){
    d[window.location.search.replace('?', '').split('&')[i].split("=")[0]] = window.location.search.replace('?', '').split('&')[i].split("=")[1]
}
export default class AdvtPage extends React.Component {
    constructor() {
        super()

        console.log(d["id"])

        this.state = {

            data: [{1: {
                "name": "Помещение 250 м2", "build": "БЦ Саввинский", "address": "г. Москва Большой Саввинский переулок, 11", "price": "500 000", "square": "250", "text": "Предлагается  просторный офисный блок  250 м 2 в Бизнес-Центр  класса 'А', 'Саввинский'.  Офис расположен на 1м этаже что дает преимущество быстрого доступа.\n Планировка: кабинетная, 6 кабинетов различной площади, рецепшн с зоной ожидания для посетителей, переговорной комнаты, выведена мокрая точка и организована мини-кухня, санузлы.\n Качественный ремонт, большие панорамные окна.  Система вентиляции и кондиционирования, разводка тел. и интернет коммуникаций проведены к рабочим местам. Офис полностью готов к въезду. Особенности БЦ Саввинский: комплекс из трех подъездов  с отдельными входными группами Техническое оснащение: центральное кондиционирование, приточно-вытяжная вентиляция, отопление Телекоммуникации: Авиател, Вымпелком, Мегафон, МТС, Центральный Телеграф\nЛифты: 6 грузопассажирских лифтов Sigma \n Престижное расположение БЦ. В шаговой доступности находятся станции метро 'Киевская' и 'Фрунзенская'. Бизнес-центр Саввинский представляет собой комплекс из 2-х строений, в который входит 9-ти этажное офисное здание и отдельно расположенный блок ресторана. Оба здания образуют уютный внутренний двор, что придает комплексу яркие индивидуальные черты. Презентабельная входная группа, просторная зона ресепшн, а также современные лифты. На первом этаже здания расположены уютные кафе и кофе-точка, а также шикарный ресторан с верандами. Бизнес-центр оснащен двухуровневым паркингом на 295 машино-мест. От метро Киевская до Бизнес-центра курсируют бесплатные шаттлы. Здание также имеет прекрасную транспортную доступность благодаря близкому расположению Саввинской набережной, улицы Плющиха, Комсомольского проспекта", "images": [ require("../../images/advt_1/advt_1_1.jpeg"), require("../../images/advt_1/advt_1_2.jpeg"), require("../../images/advt_1/advt_1_3.jpeg"), require("../../images/advt_1/advt_1_4.jpeg"), require("../../images/advt_1/advt_1_5.jpeg") ]
            }, 2: {
                "name": "Помещение 500 м2", "build": "Бизнес Центр Ducat Place 3", "address": "г. Москва ул. Гашека, 6", "price": "800 000", "square": "500", "text": "Уважаемые арендаторы! Собственником сдается в аренду офис ПРЕМИУМ уровня! Цена за все ПОД КЛЮЧ. Возможна аренда частями. \n\nПоказ возможен сразу после звонка! \n\nОбсуждаемый ТОРГ при быстром подписании договора аренды!\n\nТекущая рассадка сотрудников на 100 рабочих мест. \n\nПрямая аренда. Пешая доступность от м. Маяковская (5 мин пешком) / м. Белорусская (14 мин пешком) / м. Пушкинская (15 мин пешком). Охрана и доступ 24 часа в сутки. Показ в любое удобное Вам время. \n\nОплачиваем вознаграждение при заключении договора аренды! \n\nВ бизнес центре 467 машиномест наземного паркинга, 27 машиномест наземного паркинга, гостевая парковка.\n\nПространства органично зонированы стеклянными перегородками. Текущая рассадка на 150 СОТРУДНИКОВ + ПЕРЕГОВОРНЫЕ КОМНАТЫ + КУХНЯ + РЕЦЕПЦИЯ + СЕРВЕРНАЯ + ГАРДЕРОБ. \n\nМощная система кондиционирования; приточно-вытяжная вентиляция.Система пожарной сигнализации с выводом на пост охраны и возможностью внешнего оповещения. Компьютерные и телефонные слаботочные сети полностью разведены до рабочих мест. \n\nРядом многочисленные точки общественного питания, рестораны, кафе, бары. \n\nЗвоните по любым вопросам.", "images": [ require("../../images/advt_2/advt_2_1.jpeg"), require("../../images/advt_2/advt_2_2.jpeg"), require("../../images/advt_2/advt_2_3.jpeg"), require("../../images/advt_2/advt_2_4.jpeg"), require("../../images/advt_2/advt_2_5.jpeg") ]
            }, 3: {
                "name": "Помещение 400 м2", "build": "Бизнес Центр Эрмитаж Плаза", "address": "г. Москва Краснопролетарская ул., 2/4", "price": "700 000", "square": "400", "text": "Офисное здание с качественным ремонтом и отличной инсоляцией. Общая площадь - 2 523 кв. м. Здание расположено в историческом центре Москвы, в пешей доступности от станции метро 'Новослободская'. Удобный выезд на Садовое и Бульварное кольцо. Современное техническое оснащение: система центрального кондиционирования, приточно-вытяжной вентиляции, современные системы видеонаблюдения, сигнализации и контроля доступа. Охраняемый подземный паркинг. Звоните и мы ответим на все интересующие Вас вопросы!", "images": [ require("../../images/advt_3/advt_3_1.jpeg"), require("../../images/advt_3/advt_3_2.jpeg"), require("../../images/advt_3/advt_3_3.jpeg"), require("../../images/advt_3/advt_3_4.jpeg"), require("../../images/advt_3/advt_3_5.jpeg") ]
            }}],
            images: [ require("../../images/best_office_1.jpeg"), require("../../images/best_office_2.jpeg"), require("../../images/best_office_3.jpeg") ]
        }

        console.log(this.state.data[0][1])

        this.cancel = this.cancel.bind(this);
    }

    cancel () {
        window.location = window.location.origin + '/ads/?type=' + d["type"]
    }

    render() {
        return (
            <>
                <div className="viewButtonCancel"> 
                    <Button variant="warning" onClick={this.cancel}> Назад </Button>
                </div>
                <div className="viewAdvtPage" key={Math.random()}>
                    <div className="ImageAdvtPage">
                        <Slider images={this.state.data[0][d["id"]]["images"]} />
                    </div>
                    <div className="contentAdvtPage">
                        <div className="nameAdvtPage"> 
                            <div className="nameAdvtTextPage">
                                {this.state.data[0][d["id"]]["name"]}
                            </div>
                        </div>
                        <div className="buildAdvtPage">  {this.state.data[0][d["id"]]["build"]} </div>
                        <div className="addressAdvtPage">  {this.state.data[0][d["id"]]["address"]} </div>
                        <div className="priceAdvtPage"> 
                            <div className="priceAdvtTextPage">
                                {this.state.data[0][d["id"]]["price"]} ₽/мес.
                            </div>
                        </div>
                        <div className="squareAdvtPage"> {this.state.data[0][d["id"]]["square"]} м <sup><small>2</small></sup> </div>

                        <div className="viewButtonCall">
                            <div className="d-grid gap-2">
                                <Button variant="warning" className="ButtonCall"> Позвонить </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="labelDescriptionAdvtPage"> Описание </div>
                <div className="descriptionAdvtPage">
                    {this.state.data[0][d["id"]]["text"]}
                </div>
            </>
        )
    }
}