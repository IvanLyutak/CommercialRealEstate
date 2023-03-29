import React from 'react';

import "./AdsPage.css"
import DropdownList from "../../components/DropdownList"
import ListAdvts from "../../components/ListAdvs"

import { getListObject } from '../../services/ads';
import { interestingInformation } from '../../services/survey';

var d = {}
for(var i in window.location.search.replace('?', '').split('&')){
    d[window.location.search.replace('?', '').split('&')[i].split("=")[0]] = decodeURIComponent(window.location.search.replace('?', '').split('&')[i].split("=")[1])
}


export default class AdsPage extends React.Component {
    constructor() {
        super()

        console.log(d)
        this.state = {
            selectedType: "Сортировать",
            options: ["По убыванию цены", "По возрастанию цены", "По убыванию площади", "По возрастанию площади"],
            ads: []
        }

        this.setSelectedType = this.setSelectedType.bind(this);
        this.choiceAdvt = this.choiceAdvt.bind(this);
    }

    componentDidMount() {
        getListObject(
            d["type"],
            d["typeObject"], 
            d["price_from"], 
            d["price_to"], 
            d["square_from"], 
            d["square_to"], 
            d["address"], 
        (data) => {            
            let a = []
            for (let item in Object.entries(data)) {
                a[item] = {
                    "id": data[item]["id"].toString(),
                    "img": data[item]["image"],
                    "name": data[item]["title"],
                    "build": data[item]["subtitle"],
                    "address": data[item]["address"],
                    "price": data[item]["price"].toString(),
                    "square": data[item]["square"].toString()
                }
            }
            this.setState({ads: a})
        })
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

        console.log(window.location.search)

        window.location = window.location.origin + `/advt/${window.location.search}&id=` + ad["id"]
    }

    render() {
        return (
            <div className='adsPage'>
                {d["type"] === "Аренда" ? (<>
                    <div className="upperElementAdsPage">
                        <h3 className="titleAds"> Арендовать {d["typeObject"].toLowerCase()} </h3>
                        <h5 className="foundView"> 
                            Найдено {this.state.ads.length} объявления
                        </h5>
                    </div>
                    <div className="sortList">
                        <DropdownList selectedType={this.state.selectedType} setSelectedType={this.setSelectedType} options={this.state.options}/>
                    </div>

                    <div>
                        <ListAdvts ads={this.state.ads} choiceAdvt={this.choiceAdvt} type={d["type"]}/>
                    </div>
                </>) : (<>
                    <div className="upperElementAdsPage">
                        <h3 className="titleAds"> Купить {d["typeObject"].toLowerCase()} </h3>
                        <h5 className="foundView"> 
                            Найдено {this.state.ads.length} объявления
                        </h5>
                    </div>
                    <div className="sortList">
                        <DropdownList selectedType={this.state.selectedType} setSelectedType={this.setSelectedType} options={this.state.options}/>
                    </div>

                    <div>
                        <ListAdvts ads={this.state.ads} choiceAdvt={this.choiceAdvt} type={d["type"]}/>
                    </div>
                </>)}
            </div>
        )
    }
}