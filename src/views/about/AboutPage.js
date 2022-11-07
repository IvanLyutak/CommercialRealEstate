import React from 'react';
import Highcharts from 'highcharts/highstock';

import "./AboutPage.css"
import Reviews from "../../components/Reviews"

import ImageOurVision from "../../images/about_image.jpeg"
import { Button } from 'react-bootstrap';

import video from "../../video/video.mp4"

import 'atropos/css'
import Atropos from 'atropos/react';

export default class AboutPage extends React.Component {

    constructor() {
        super()

        this.state = {
            reviews: [
                {"name": "Кирилл", "text": "Классный сервис, нашел офис своей мечты.", "image": "😀"},
                {"name": "Матвей", "text": "В целом неплохой сервис, но есть некоторые минусы.", "image": "🙂"},
                {"name": "Роман", "text": "Плохой сайт, не смог найти подходящее для себя предложение.", "image": "🙁"}
            ],
            facts: [
               {id: "fact1", "title": "5 200 000", "text": "1 200 000 кв. м. - общая площадь объетов недвижимости", "status": false}, 
               {id: "fact2", "title": "5 000", "text": "5000 - объявлений по продаже недвижимости", "status": false},
               {id: "fact3", "title": "3 000", "text": "3000 - объявлений по аренде недвижимости", "status": false}
            ]
        }

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount  = () => {

        this.print_charts()
        window.addEventListener('scroll', this.handleScroll)
        
        return () => {
            window.removeEventListener('scroll', this.handleScroll)
        }
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll)

    }

    handleScroll = () => {

        const containerRectLeft = document.getElementById("leftViewFactsId").getBoundingClientRect()
        const containerRectMain = document.getElementById("ViewMainFactsId").getBoundingClientRect()

        for (let fact of this.state.facts) {
            const containerRect = document.getElementById(fact.id).getBoundingClientRect()

            if (containerRect.top <  containerRectLeft.top && containerRect.bottom + containerRect.height > containerRectLeft.bottom) {
                fact.status = true
                this.setState({facts: this.state.facts})
            } else {
                fact.status = false
                this.setState({facts: this.state.facts})
            }
        }

        if (containerRectLeft.bottom -  containerRectLeft.height / 2 > containerRectMain.top && containerRectLeft.top < containerRectMain.bottom) {
            document.getElementById("leftViewFactsId").style.visibility = "visible";
        } 
        else {
            document.getElementById("leftViewFactsId").style.visibility = "hidden";
        }
    }

    print_charts() {
        Highcharts.chart('container1', {
            chart: {
              type: 'pie',
              options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
              }
            },
            title: {
              text: 'Доли продаж комерческой недвижимости, 2022'
            },
            subtitle: {
              text: 'Source: ' +
                '<a href="https://www.counterpointresearch.com/global-smartphone-share/"' +
                'target="_blank">Counterpoint Research</a>'
            },
            accessibility: {
              point: {
                valueSuffix: '%'
              }
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                  enabled: true,
                  format: '{point.name}'
                }
              }
            },
            series: [{
              type: 'pie',
              name: 'Share',
              data: [
                ['Офисы', 23],
                ['Коворкинги', 18],
                ['Спортивные объекты', 9],
                ['Торговые площади', 8],
                ['Другие', 30]
              ]
            }]
          });

          const chart = Highcharts.chart('container2', {
            title: {
              text: 'Продажи коммерческой недвижимости в 2022'
            },
            xAxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Количеcтво'
                }
        
            },
            series: [{
              type: 'column',
              name: 'Количество',
              colorByPoint: true,
              data: [5412, 4977, 4730, 4437, 3947, 3707, 4143, 3609,
                3311, 3072, 2899, 2887],
              showInLegend: false
            }]
          });

          Highcharts.chart('container3', {
            chart: {
              type: 'column'
            },
            title: {
              text: 'Аренда коммерческой недвижимости'
            },
            xAxis: {
              categories: ['2021/22', '2020/21', '2019/20', '2018/19', '2017/18']
            },
            yAxis: {
              min: 0,
              title: {
                text: 'Доля'
              }
            },
            tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
              shared: true
            },
            plotOptions: {
              column: {
                stacking: 'percent'
              }
            },
            series: [{
              name: 'Офисы',
              data: [4, 4, 2, 4, 4]
            }, {
              name: 'Коворкинги',
              data: [0, 4, 3, 2, 3]
            }, {
              name: 'Торговые площади',
              data: [1, 2, 2, 1, 2]
            }]
          });

          Highcharts.chart('container4', {
            chart: {
              type: 'column'
            },
            title: {
              text: 'Продажа недвижимости'
            },
            xAxis: {
              categories: [
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2020',
                '2021',
                '2022'
              ],
              crosshair: true
            },
            yAxis: {
              title: {
                useHTML: true,
                text: 'Количество'
              }
            },
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
            },
            plotOptions: {
              column: {
                pointPadding: 0.2,
                borderWidth: 0
              }
            },
            series: [{
              name: 'Офисы',
              data: [13, 16, 14, 12, 14, 17, 18,
                20, 22, 19]
          
            }, {
              name: 'Коворкинги',
              data: [5, 12, 11, 14, 15, 16, 10,
                9, 14, 11]
          
            }, {
              name: 'Спортивные объекты',
              data: [10, 9, 11, 15, 14, 18, 10,
                9, 19, 8]
          
            }, {
              name: 'Клубы',
              data: [4, 7, 5, 9, 4, 7, 10, 14,
                19, 17]
          
            }]
          });

          Highcharts.chart('container5', {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
            },
            title: {
              text: 'Где находится наша недвижимость?'
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
              point: {
                valueSuffix: '%'
              }
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
              }
            },
            series: [{
              name: 'Города',
              colorByPoint: true,
              data: [{
                name: 'Москва',
                y: 40
              },  {
                name: 'Санкт-Петербург',
                y: 25
              }, {
                name: 'Нижний Новгород',
                y: 7
              }, {
                name: 'Новосибирск',
                y: 5
              },  {
                name: 'Владивосток',
                y: 3
              }, {
                name: 'Курск',
                y: 10
              }, {
                name: 'Старополь',
                y: 5
              }, {
                name: 'Другие',
                y: 5
              }]
            }]
          });
    }

    render() {
        return (
            <>
                <Atropos
                    activeOffset={5}
                    shadowScale={0.85}
                    className="my_atropos"
                >
                    <div className='backgroundAboutPage' data-atropos-offset="-5">
                    <div className="viewTitleAboutPage" data-atropos-offset="5">
                        <div className="textTitleAboutPage"> О компании </div>
                        <div className="textSubtitleAboutPage"> Создаем условия для успешной работы и процветания бизнесов арендаторов и владельцев недвижимости </div>
                    </div>
                    </div>
                </Atropos>

                <div className="viewOurVision">
                    <div className="viewImageOurVision"> 
                        <img src={ImageOurVision} className="imageOurVision" alt="ImageOurVision"/>
                    </div>
                    <div className="viewTextOurVision">
                        <div className="viewInnerTextOurVision">
                            <div className="viewInnerWithIndentTextOurVision">
                            <div className="textTitleOurVision" id="textTitleOurVision"> Наше видение </div>
                            <div className="textSubtitleOurVision"> Создаем условия для успешной работы и процветания бизнесов арендаторов и владельцев недвижимости </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ViewMainFacts" id="ViewMainFactsId">
                    <div className="leftViewFacts" id="leftViewFactsId">
                        <div className="leftViewFactsLabel">
                                Ключевые факты
                        </div>
                        <div className="leftViewFactsText">
                            Подбираем лучшие по соотношению цена / качество объявления по продаже и аренде недвижимости на рынке.
                        </div>
                    </div>
                    <div className="rightViewFacts" id="rightViewFactsId">
                        {
                            this.state.facts.map((fact) => (
                                fact.status 
                                ?   <div className="rightViewFactsTrue" key={Math.random()} id={fact.id}>
                                        <div className="rightViewFactsTitleTrue">
                                            <div className="rightViewFactsTitleTrueInner">
                                                {fact.title} 
                                            </div>
                                        </div>
                                        <div className="rightViewFactsTextTrue"> {fact.text} </div>
                                    </div>
                                :   <div className="rightViewFactsFalse" key={Math.random()} id={fact.id}> 
                                        <div className="rightViewFactsTitleFalse">
                                            <div className="rightViewFactsTitleFalseInner">
                                                {fact.title} 
                                            </div>
                                        </div>
                                        <div className="rightViewFactsTextFalse"> {fact.text} </div>
                                    </div>  
                            ))
                        }
                    </div>
                </div>

                <video width="100%" autoPlay muted loop className="video_company">
                    <source src={video} type="video/mp4"/>
                </video>

                <div className="reviews"><Reviews reviews={this.state.reviews}/> </div>
                <div className="buttonMoreReviews">  Читать все 39 отзывов </div>
                <Button variant="warning" className="buttonAddReview"> Написать отзыв </Button>
                
                <figure className="highcharts-figure">
                    <div id="container1"></div>
                    <div id="container2"></div>
                    <div id="container3"></div>
                    <div id="container4"></div>
                    <div id="container5"></div>
                </figure>
            </>
        )
    }
}