import React from 'react';
import {Icon } from 'react-materialize';
import { Row, Col, Collection, CollectionItem } from 'react-materialize';
import { getISO } from '../functions';
import './Countries.css';
export default class Countries extends React.Component {
    state = {
        width: null,
        lastUpdate: null,
        countries_stat: [],
        countries_stat_original: [],
        filterSettings: {filterBy: 'cases',
                         default: true
                        }
    }
    componentDidMount() {
        fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "73b4193dc8msh6e231e05f654c80p1b0db8jsn0c2a8aa64974"
	}
            })
            .then(r=>r.json())
            .then(r=>{
                // console.log("countries",r);
                const convertNumbers = r.countries_stat.map((o)=>{
                    return {...o,
                            cases: this.checkNumeric(o.cases),
                            new_cases: this.checkNumeric(o.new_cases),
                            deaths: this.checkNumeric(o.deaths),
                            new_deaths: this.checkNumeric(o.new_deaths),
                            total_recovered: this.checkNumeric(o.total_recovered),
                            active_cases: this.checkNumeric(o.active_cases),
                            serious_critical: this.checkNumeric(o.serious_critical),
                            total_cases_per_1m_population: this.checkNumeric(o.total_cases_per_1m_population),
                    }
                })
                // console.log(convertNumbers);
                this.setState({countries_stat: convertNumbers,countries_stat_original: convertNumbers})
            })
            .catch(err => {
                console.log(err);
            });

        //set screen width
        window.addEventListener("resize", ()=>{
            
            this.setState({width: window.innerWidth},()=>{this.forceUpdate()});
        });

    }
     checkNumeric = (objName) =>
        {
            var lstLetters = objName;

            var lstReplace = lstLetters.replace(/\,/g,'');
            return Number(lstReplace);
        }  
    filterList = (filterBy, def)=>{
        const copy = this.state.countries_stat.slice();

        //Same filter option clicked, default is true
        if(filterBy === this.state.filterSettings.filterBy && def) {
            def = false
        }
        //Same filter option clicked, default is false
        else if(filterBy === this.state.filterSettings.filterBy && !def) {
            def = true
        }
        //Different filter option clicked, set default to true
        else if(filterBy !== this.state.filterSettings.filterBy) {
            def = true
        }
        
            this.setState({
                filterSettings: {
                    filterBy,
                    default: def
                }
            },()=>{
                if(def){
                    
                    copy.sort((a, b)=>{
                        if (a[filterBy] < b[filterBy]) {
                            return 1;
                            }
                            if (a[filterBy] > b[filterBy]) {
                            return -1;
                            }
                            return 0;
                        })
                        this.setState({countries_stat: copy})
                }
                if(!def){
                    //sorts alpha a - z (lowest to highest)
                    //sorts nums 1 - 10 (low to high)
                    copy.sort((a, b)=>{
                        if (a[filterBy] > b[filterBy]) {
                            return 1;
                            }
                            if (a[filterBy] < b[filterBy]) {
                            return -1;
                            }
                            return 0;
                        })
                        this.setState({countries_stat: copy})
                }
            })
    }

//https://www.countryflags.io/es/shiny/64.png
    getList = ()=>{
        if(this.state.countries_stat.length === 0) {
            return <div>Loading...</div>
        }else {
            return this.state.countries_stat.map((o, i)=>{
                    let ISO = getISO(o.country_name, this.state.countries_stat.length)
                    if(!ISO) {ISO = o.country_name}
                    let ISOlower = ISO.toLowerCase();
                    let width = !this.state.innerWidth ? window.innerWidth: this.state.innerWidth
                    let countryNameOrFlag = width > 700 ? o.country_name : <img src={`https://www.countryflags.io/${ISOlower}/shiny/64.png`} className="flag"/>;
                return <tr index={i}>
                    <td>{countryNameOrFlag}</td>
                    <td >{o.cases}</td>
                    <td className="hide-on-small-only">{o.new_cases}</td>
                    <td>{o.deaths}</td>
                    <td className="hide-on-small-only">{o.new_deaths}</td>
                    <td>{o.total_recovered}</td>
                    <td className="hide-on-small-only">{o.active_cases}</td>
                    <td className="hide-on-small-only">{o.serious_critical}</td>
                    <td className="hide-on-small-only">{o.total_cases_per_1m_population}</td>
                </tr>
            })
            
        }
    }
    searchInput = (e)=>{
        let searchText = e.target.value
        if(searchText.length === 0) {
           return this.state.countries_stat_original 
        } else {
            console.log("not empty");
            this.setState({countries_stat: []})
            //get original state and return array 
            return this.state.countries_stat.filter((o)=>{
                if(!o.country_name.startsWith(searchText)){
                    return false
                } else {
                    return true
                }
            })
        }
        // const copy = this.state.countries_stat.slice();
        // console.log()
        // this.setState({countries_stat: copy[3]})
    }
    
    render()     
    {
        
        let width = !this.state.innerWidth ? window.innerWidth: this.state.innerWidth
        let isActive = this.state.filterSettings.filterBy
        return <div>
            <h6>Countries </h6>
            <div class="input-cont">
            <label for="input_text">Search Country</label><input onChange={(e)=>{this.searchInput(e)}} id="input_text" type="text" data-length="10"/>
               
            </div>
        <table style={{tableLayout: 'fixed'}}>
        <tbody>
            <tr>
                <th 
                onClick={()=>{this.filterList('country_name', this.state.filterSettings.default)}}><span className={isActive === "country_name" ? "active": ""}>{width > 500 ? "Countries": "CN"}</span>
                    {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'country_name' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                
                onClick={()=>{this.filterList('cases', this.state.filterSettings.default)}}
                ><span className={isActive === "cases" ? "active": ""}>{width > 700 ? "Total Cases": "T Cases"}</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'cases' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                className="hide-on-small-only"
                onClick={()=>{this.filterList('new_cases', this.state.filterSettings.default)}}
                ><span className={isActive === "new_cases" ? "active": ""}>New Cases</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'new_cases' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                onClick={()=>{this.filterList('deaths', this.state.filterSettings.default)}}
                ><span className={isActive === "deaths" ? "active": ""}>{width > 700 ? "Total Deaths": "Deaths"}</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'deaths' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                className="hide-on-small-only"
                onClick={()=>{this.filterList('new_deaths', this.state.filterSettings.default)}}
                ><span className={isActive === "new_deaths" ? "active": ""}>New Deaths</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'new_deaths' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                onClick={()=>{this.filterList('total_recovered', this.state.filterSettings.default)}}
                ><span className={isActive === "total_recovered" ? "active": ""}>{width > 700 ? "Total Recovered": "Recovered"}</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'total_recovered' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                className="hide-on-small-only"
                onClick={()=>{this.filterList('active_cases', this.state.filterSettings.default)}}
                ><span className={isActive === "active_cases" ? "active": ""}>Active Cases</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'active_cases' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                className="hide-on-small-only"
                onClick={()=>{this.filterList('serious_critical', this.state.filterSettings.default)}}
                ><span className={isActive === "serious_critical" ? "active": ""}>Critical</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'serious_critical' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                className="hide-on-small-only"
                onClick={()=>{this.filterList('total_cases_per_1m_population', this.state.filterSettings.default)}}
                ><span className={isActive === "total_cases_per_1m_population" ? "active": ""}>Total Cases Per 1m Pop</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'serious_critical' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
            </tr>
           
                {this.getList()}
        </tbody>
        </table>
        </div>
    }

}

//Store data in state
