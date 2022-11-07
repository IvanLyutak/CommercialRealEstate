import React from 'react';

import "./AdsPage.css"
import DropdownList from "../../components/DropdownList"
import ListAdvts from "../../components/ListAdvs"


var d = {}
for(var i in window.location.search.replace('?', '').split('&')){
    d[window.location.search.replace('?', '').split('&')[i].split("=")[0]] = window.location.search.replace('?', '').split('&')[i].split("=")[1]
}

export default class AdsPage extends React.Component {
    constructor() {
        super()

        console.log(d)
        this.state = {
            selectedType: "Сортировать",
            options: ["По убыванию цены", "По возрастанию цены", "По убыванию площади", "По возрастанию площади"],
            ads: [ {"id": 1, "img": require("../../images/best_office_1.jpeg"), "name": "Помещение 250 м2", "build": "БЦ Саввинский", "address": "г. Москва Большой Саввинский переулок, 11", "price": "500 000", "square": "250"},
                        {"id": 2, "img": require("../../images/best_office_2.jpeg"), "name": "Помещение 500 м2", "build": "Бизнес Центр Ducat Place 3", "address": "г. Москва ул. Гашека, 6", "price": "800 000", "square": "500"}, 
                            {"id": 3, "img": require("../../images/best_office_3.jpeg"), "name": "Помещение 400 м2", "build": "Бизнес Центр Эрмитаж Плаза", "address": "г. Москва Краснопролетарская ул., 2/4", "price": "700 000", "square": "400"}]
        }

        this.setSelectedType = this.setSelectedType.bind(this);
        this.choiceAdvt = this.choiceAdvt.bind(this);
    }

    setSelectedType(e){
        if (e === "") {
            this.setState({selectedType: "Тип помещения"})
        } else {
            this.setState({selectedType: e})
        }
    }

    choiceAdvt(ad) {
        console.log("Click", ad)

        window.location = window.location.origin + "/advt/?type=office&id=" + ad["id"]
    }

    render() {
        return (
            <>
                <div className="upperElementAdsPage">
                    <h3 className="titleAds"> Арендовать офис </h3>
                    <h5 className="foundView"> 
                        Найдено {this.state.ads.length} объявления
                    </h5>
                </div>
                <div className="sortList">
                    <DropdownList selectedType={this.state.selectedType} setSelectedType={this.setSelectedType} options={this.state.options}/>
                </div>

                <div>
                    <ListAdvts ads={this.state.ads} choiceAdvt={this.choiceAdvt}/>
                </div>
            </>
        )
    }
}