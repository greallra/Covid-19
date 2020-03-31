import React from 'react';
import {Icon } from 'react-materialize';
import { Row, Col, Collection, CollectionItem } from 'react-materialize';
import { getISO, convertToReadableString } from '../functions';
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
                console.log("countries",r);
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
                this.setState({countries_stat: convertNumbers,countries_stat_original: convertNumbers},()=>{this.filterList('cases', false)})
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
                    let imgUrl = `https://www.countryflags.io/${ISOlower}/shiny/64.png`
                    if(ISOlower.length > 2){
                        imgUrl = `https://www.countryflags.io/ad/shiny/64.png`
                    };
                    
                    let countryNameOrFlag = width > 700 ? o.country_name : <img src={imgUrl} className="flag"/>;
                return <tr index={i}>
                    <td>{countryNameOrFlag}</td>
                    <td ><span className="cases">{o.cases > 999 ? convertToReadableString(o.cases):o.cases}</span></td>
                    <td className="hide-on-small-only  new-cases">{o.new_cases > 999 ? convertToReadableString(o.new_cases):o.new_cases}</td>
                    <td><span className="deaths">{o.deaths > 999 ? convertToReadableString(o.deaths):o.deaths}</span></td>
                    <td className="hide-on-small-only new-deaths">{o.new_deaths > 999 ? convertToReadableString(o.new_deaths):o.new_deaths}</td>
                    <td><span className="recovered">{o.total_recovered > 999 ? convertToReadableString(o.total_recovered):o.total_recovered}</span></td>
                    <td className="hide-on-small-only active-cases">{o.active_cases > 999 ? convertToReadableString(o.active_cases):o.active_cases}</td>
                    <td className="hide-on-med-and-down">{o.serious_critical > 999 ? convertToReadableString(o.serious_critical):o.serious_critical}</td>
                    <td className="hide-on-med-and-down">{o.total_cases_per_1m_population > 999 ? convertToReadableString(o.total_cases_per_1m_population):o.total_cases_per_1m_population}</td>
                </tr>
            })
            
        }
    }
    searchInput = (e)=>{
        let searchText = e.target.value
        //filter the orignal copy of the array: countries_stat_original
        //Set State on the render copy countries_stat
        //This way, by not changing the copy ever, we always have access to the orignal array
            const filtered = this.state.countries_stat_original.filter((o)=>{
                if(!o.country_name.toLowerCase().startsWith(searchText.toLowerCase())){
                    return false
                } else {
                    return true
                }
            })    
            this.setState({countries_stat: filtered})  
    }
    
    render()     
    {
        
        let width = !this.state.innerWidth ? window.innerWidth: this.state.innerWidth
        let isActive = this.state.filterSettings.filterBy
        return <div className="table-cont">
            <h6>Countries </h6>
            <div class="input-cont">
            <label for="input_text">Search Country</label><input onChange={(e)=>{this.searchInput(e)}} id="input_text" type="text" data-length="10"/>
               
            </div>
        <table style={{tableLayout: 'fixed'}}>
        <tbody>
            <tr>
                <th 
                onClick={()=>{this.filterList('country_name', this.state.filterSettings.default)}}><span className={isActive === "country_name" ? "active": ""}>{width > 1000 ? "Countries": "CN"}</span>
                    {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'country_name' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                
                onClick={()=>{this.filterList('cases', this.state.filterSettings.default)}}
                ><span className={isActive === "cases" ? "active": ""}>{width > 1000 ? "Total Cases": "T Cases"}</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'cases' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                className="hide-on-small-only"
                onClick={()=>{this.filterList('new_cases', this.state.filterSettings.default)}}
                ><span className={isActive === "new_cases" ? "active": ""}>{width > 1000 ? "New Cases": "N Cases"}</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'new_cases' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                onClick={()=>{this.filterList('deaths', this.state.filterSettings.default)}}
                ><span className={isActive === "deaths" ? "active": ""}>{width > 1000 ? "Total Deaths": "Deaths"}</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'deaths' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                className="hide-on-small-only"
                onClick={()=>{this.filterList('new_deaths', this.state.filterSettings.default)}}
                ><span className={isActive === "new_deaths" ? "active": ""}>{width > 1000 ? "New Deaths": "N Deaths"}</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'new_deaths' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                onClick={()=>{this.filterList('total_recovered', this.state.filterSettings.default)}}
                ><span className={isActive === "total_recovered" ? "active": ""}>{width > 1000 ? "Total Recovered": "Recovered"}</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'total_recovered' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                className="hide-on-small-only"
                onClick={()=>{this.filterList('active_cases', this.state.filterSettings.default)}}
                ><span className={isActive === "active_cases" ? "active": ""}>{width > 1000 ? "Active Cases": "Active "}</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'active_cases' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                className="hide-on-med-and-down"
                onClick={()=>{this.filterList('serious_critical', this.state.filterSettings.default)}}
                ><span className={isActive === "serious_critical" ? "active": ""}>Critical</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'serious_critical' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
                <th
                className="hide-on-med-and-down"
                onClick={()=>{this.filterList('total_cases_per_1m_population', this.state.filterSettings.default)}}
                ><span className={isActive === "total_cases_per_1m_population" ? "active": ""}>{width > 1000 ? "Per /1m Pop": "Per 1m "}</span>
                {this.state.filterSettings.default && this.state.filterSettings.filterBy === 'serious_critical' ? <Icon tiny>arrow_drop_down</Icon>:<Icon tiny>arrow_drop_up</Icon>}
                </th>
            </tr>
           
                {this.getList()}
        </tbody>
        </table>
        {/* white space */}
        <div style={{height: '800px'}}></div>
        </div>
    }

}

//Store data in state
