import React from 'react';
import Highcharts from 'highcharts/highstock';

import "./AboutPage.css"
import Reviews from "../../components/Reviews"

import ImageOurVision from "../../images/about_image.jpeg"
import { Button, Form } from 'react-bootstrap';

import video from "../../video/video.mp4"

import 'atropos/css'
import Atropos from 'atropos/react';

import Survey from '../../components/survey/Survey';
import ReviewModal from '../../components/modals/ReviewModal';
import insertReview, { listReview } from '../../services/reviews';


import getSurvey, {insertResult, selectionСriteriaRealty, agencySelectionCriteria, interestingInformation} from "../../services/survey"


export default class AboutPage extends React.Component {

    constructor() {
        super()

        this.state = {
            price: 0,
            reviews: [],
            facts: [
               {id: "fact1", "title": "5 200 000", "text": "1 200 000 кв. м. - общая площадь объетов недвижимости", "status": false}, 
               {id: "fact2", "title": "5 000", "text": "5000 - объявлений по продаже недвижимости", "status": false},
               {id: "fact3", "title": "3 000", "text": "3000 - объявлений по аренде недвижимости", "status": false}
            ],
            questions: [],
            question: {},
            counter: 0,
            reviewModalShow: false,
            countReviews: 0
        }

        this.handleScroll = this.handleScroll.bind(this);
        this.vote = this.vote.bind(this);
        this.count = this.count.bind(this);
    }

    rename(obj, oldName, newName) {
        if(!obj.hasOwnProperty(oldName)) {
            return false;
        }
      
        obj[newName] = obj[oldName];
        delete obj[oldName];
        return true;
    }

    setReviewModalShow(e) {
      this.setState({reviewModalShow: e})
    }

    componentDidMount  = () => {

        selectionСriteriaRealty((data) =>{         
            this.print_charts_selectionСriteriaRealty(data)
        })

        agencySelectionCriteria((data) =>{         
          this.print_charts_agencySelectionCriteria(data)
        })

        interestingInformation((data) =>{         
          this.print_charts_interestingInformation(data)
        })

        listReview((data) => {

            if (data !== "error" && data !== null && Object.keys(data).length > 0) {
              console.log("true")
              this.setState({countReviews: Object.keys(data).length})
              for (const [key, value] of Object.entries(data)) {
                console.log(value)
                if (value["emotion"] === "positive") {
                    value["emotion"] = "😀"
                } else if (value["emotion"] === "negative") {
                    value["emotion"] = "🙁"
                }
                else {
                    value["emotion"] = "🙂"
                }
            }
            this.setState({reviews: data})
            }
        })
        

        getSurvey((data) =>{      
          
            console.log(Object.keys(data[this.state.counter])[0])

            this.rename(data[this.state.counter], Object.keys(data[this.state.counter])[0], (this.state.counter+1) + ") " + Object.keys(data[this.state.counter])[0])

            this.setState({
              questions: data,
              question: data[this.state.counter]
            })
          
        })

        window.addEventListener('scroll', this.handleScroll)
        return () => {
          window.removeEventListener('scroll', this.handleScroll)
        }
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll)

    }

    vote(e) {
        console.log("vote", e)

        console.log("Вопрос:", Object.keys(this.state.questions[this.state.counter])[0])
        console.log("Ответ:", e)

        if (this.state.counter < Object.keys(this.state.questions).length - 1) {
            insertResult(Object.keys(this.state.questions[this.state.counter])[0].split(') ')[1], e, (data) =>{      
          
                this.setState({counter: this.state.counter+1})

                this.rename(this.state.questions[this.state.counter + 1], Object.keys(this.state.questions[this.state.counter + 1])[0], (this.state.counter+2) + ") " + Object.keys(this.state.questions[this.state.counter + 1])[0])            
                this.setState({question: this.state.questions[this.state.counter + 1]})
          
            })
        } else {
            insertResult(Object.keys(this.state.questions[this.state.counter])[0].split(') ')[1], e, (data) => {      
                console.log("Результат")
                this.setState({question: "result"})
            })
        }
    }


    count() {

      console.log(document.getElementById("price_square").value)

      let price_square = document.getElementById("price_square").value
      let square = document.getElementById("square").value
      let price_place = document.getElementById("price_place").value
      let count_place = document.getElementById("count_place").value
      var price = price_square * square + price_place * count_place

      if (isNaN(price)) {
        price = "Введите числа"
      }
      this.setState({price: price})
    }

    sendReview = (text) => {
        this.setReviewModalShow(false)
        insertReview(text, (data) => {
            if (data !== "error" && data !== null && Object.keys(data).length > 0) {
              this.setState({countReviews: Object.keys(data).length})
              for (const [key, value] of Object.entries(data)) {
                console.log(value)
                if (value["emotion"] === "positive") {
                    value["emotion"] = "😀"
                } else if (value["emotion"] === "negative") {
                    value["emotion"] = "🙁"
                }
                else {
                    value["emotion"] = "🙂"
                }
             }
             this.setState({reviews: data})
            }
        })
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

    print_charts_selectionСriteriaRealty(data) {
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
              text: 'Главный критерий при выборе недвижимости'
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
              data: data
            }]
          });
    }

    print_charts_agencySelectionCriteria(data) {

          const chart = Highcharts.chart('container2', {
            title: {
              text: 'Главный критерий при выборе агентства недвижимости'
            },
            xAxis: {
              categories: data["categories"]
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
              data: data["data"],
              showInLegend: false
            }]
          });
      }

      print_charts_interestingInformation(data) {
          Highcharts.chart('container5', {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
            },
            title: {
              text: 'Самые популярные запросы'
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
              data: data
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
                <div className="buttonMoreReviews">  Читать все {this.state.countReviews} отзыва </div>
                <Button variant="warning" className="buttonAddReview" onClick={ () => this.setReviewModalShow(true)}> Написать отзыв </Button>
                
                <ReviewModal
                  show={this.state.reviewModalShow}
                  onHide={() => this.setReviewModalShow(false)}
                  sendReview={this.sendReview}
                />

                <figure className="highcharts-figure">
                    <div id="container1"></div>
                    <div id="container2"></div>
                    <div id="container5"></div>
                </figure>

                <div className="classNeed">
                <h5>Расчитайте стоимость</h5>
                <div >
                        <h5 className="textNameAdvt" style={{marginTop: "30px"}}> Стоимость квадратного метра </h5>
                        <Form.Control placeholder="Введите цену квадратного метра" onChange={() => this.count()} id="price_square"/> 
                </div>
                <div>
                        <h5 className="textNameAdvt" style={{marginTop: "30px"}}> Площадь офиса </h5>
                        <Form.Control placeholder="Введите площадь" onChange={() => this.count()} id="square"/> 
                </div>
                <div>
                        <h5 className="textNameAdvt" style={{marginTop: "30px"}}> Стоимость парковочного места </h5>
                        <Form.Control placeholder="Введите цену парковочного места" onChange={() => this.count()} id="price_place"/> 
                </div>
                <div>
                        <h5 className="textNameAdvt" style={{marginTop: "30px"}}> Количество парковочных мест </h5>
                        <Form.Control placeholder="Введите количество машиномест" onChange={() => this.count()} id="count_place"/> 
                </div>

                <div>
                        <h5 className="textNameAdvt" style={{marginTop: "30px", marginBottom: "30px"}}> Итоговая цена</h5>
                        <h4 className="textNameAdvt"> {this.state.price} руб.</h4>
                </div>

                <h5 className="surveyNameAdvt" style={{marginTop: "40px"}}> Пройдите опрос </h5>
                    <Survey vote={(e) => this.vote(e)} questions={this.state.question}/>
                </div>

            </>
        )
    }
}