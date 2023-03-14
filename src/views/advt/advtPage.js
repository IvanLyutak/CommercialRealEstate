import React from 'react';
import { Button } from 'react-bootstrap';

import Slider from "../../components/slider/Slider"
import "./advtPage.css"

import { getDataOfObject } from '../../services/ads';

var d = {}
for(var i in window.location.search.replace('?', '').split('&')){
    d[window.location.search.replace('?', '').split('&')[i].split("=")[0]] = decodeURIComponent(window.location.search.replace('?', '').split('&')[i].split("=")[1])
}

export default class AdvtPage extends React.Component {
    constructor() {
        super()

        console.log(d["id"])

        this.state = {
            data: {},
            images: [ require("../../images/best_office_1.jpeg"), require("../../images/best_office_2.jpeg"), require("../../images/best_office_3.jpeg") ]
        }

        this.cancel = this.cancel.bind(this);

        console.log(d["type"])
    }

    componentDidMount() {
        getDataOfObject(
            d["id"], 
        (data) => {            
            this.setState({data: {
                "name": data["title"],
                "build": data["subtitle"],
                "price": data["price"].toString(),
                "square": data["square"].toString(),
                "text": data["description"],
                "images": data["images"]
            }})

            console.log("data = ", this.state.data)
        })
    }

    cancel () {

        window.location = window.location.origin + '/ads/' + window.location.search.split("&id=")[0]
    }

    render() {
        return (
            <>
                <div className="viewButtonCancel"> 
                    <Button variant="warning" onClick={this.cancel}> Назад </Button>
                </div>
                <div className="viewAdvtPage" key={Math.random()}>
                    <div className="ImageAdvtPage">
                        <Slider images={this.state.data["images"]} />
                    </div>
                    <div className="contentAdvtPage">
                        <div className="nameAdvtPage"> 
                            <div className="nameAdvtTextPage">
                                {this.state.data["name"]}
                            </div>
                        </div>
                        <div className="buildAdvtPage">  {this.state.data["build"]} </div>
                        <div className="addressAdvtPage">  {this.state.data["address"]} </div>

                        {d["type"] === 'Аренда' ? (<>
                            <div className="priceAdvtPage"> 
                                <div className="priceAdvtTextPage">
                                    {this.state.data["price"]} ₽/мес.
                                </div>
                            </div>
                        </>) : (<>
                            <div className="priceAdvtPage"> 
                                <div className="priceAdvtTextPage">
                                    {this.state.data["price"]} ₽.
                                </div>
                            </div>
                        </>)}
                        <div className="squareAdvtPage"> {this.state.data["square"]} м <sup><small>2</small></sup> </div>

                        <div className="viewButtonCall">
                            <div className="d-grid gap-2">
                                <Button variant="warning" className="ButtonCall"> Позвонить </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="labelDescriptionAdvtPage"> Описание </div>
                <div className="descriptionAdvtPage">
                    {this.state.data["text"]}
                </div>
            </>
        )
    }
}