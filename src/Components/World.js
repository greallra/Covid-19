import React from 'react';
import { Row, Col,} from 'react-materialize';
// import Moment from 'react-moment';

import './World.css';
import Moment from 'react-moment';
import { checkNumeric, getActiveCases } from './functions';

class World extends React.Component {
    state = {
        date: null,
        affected_countries: []
    }

    componentDidMount(){
        const url = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php';
        const options = {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "73b4193dc8msh6e231e05f654c80p1b0db8jsn0c2a8aa64974"
            }
        }
        fetch(url, options)
            .then(res=>res.json())
            .then((res)=>{
                // console.log("fetch1", res);
                        
                this.setState({
                    total_cases: res.total_cases,
                    total_deaths: res.total_deaths,
                    total_recovered: res.total_recovered,
                    new_cases: res.new_cases,
                    statistic_taken_at: res.statistic_taken_at,
                    active_cases: getActiveCases(res.total_cases, res.total_deaths, res.total_recovered)
                })        
            })
            .catch((err)=>{console.log(err);
            })

        //fetch 2
        fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "73b4193dc8msh6e231e05f654c80p1b0db8jsn0c2a8aa64974"
                }
            })
            .then(response => {
                return response.json();
            })
            .then(response => {
                // console.log("fecth2", response);
                
                 this.setState({
                    affected_countries: response.affected_countries
                 })
                 
            })
            .catch(err => {
                console.log(err);
            });
    }
    getPercent = ()=>{
        
        return Math.round(this.state.affected_countries.length/199 * 100)
    }
    makeIframe = ()=>{
        return {
          __html: this.props.iframe
        }
      }
   
    render() { 
        const dateToFormat = '1976-04-19T12:59-0500';
        return (
        <div className="Comp1">
        <Row>
        <Col s={12}>
            <h6>WorldWide Stats</h6>

            <div className="flex-cont">       
                <span className="stat-key letter-spacing-m">Total Recorded Cases</span><b className="stat-value light-black">{this.state.total_cases}</b>       
                <span className="stat-key letter-spacing-m">Total Deaths</span><b className="red-text stat-value">{this.state.total_deaths}</b>  
                <span className="stat-key letter-spacing-m">Total Recovered</span><b className="green-text stat-value">{this.state.total_recovered}</b>
                <span className="stat-key letter-spacing-m">New Cases</span><b className="blue-text stat-value">{this.state.new_cases}</b>
                <span className="stat-key letter-spacing-m">Total Active Cases</span><b className="brown-text stat-value">{this.state.active_cases}</b>   
                <span className="stat-key letter-spacing-m">Effected Countries</span><b className="grey-text stat-value">{this.state.affected_countries.length} / 199 <i className="grey-text">({this.getPercent()} %)</i></b>
                <span className="last-update">(Last Update<Moment format="DD MMMM YYYY HH:mm">{this.state.statistic_taken_at}</Moment>)</span>      
            </div>   
                    <h6>Overall Cases</h6>
                    <div dangerouslySetInnerHTML={ this.makeIframe() }  className="iframeCont"/>
                   
               
        </Col>
        </Row>
        
        </div>
      );}

}

export default World;
