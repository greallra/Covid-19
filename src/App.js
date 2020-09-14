import React, {useReducer,useEffect} from 'react';
import Nav from './Components/Nav';
import GeneralStats from './Components/GeneralStats'
import './App.css';
import Table from './Components/Table';
import AppContext from './hooks/context';
import AppReducer from './hooks/reducer';
import keys from './keys';
import axios from 'axios';
import {Grid, Box} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const options ={
  method: 'get',
  headers: {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": keys.rapidApiKey
  }
}
//https://stackoverflow.com/questions/62942858/how-to-use-material-ui-grid-for-spa-negative-margin-problem
//weird margin overflow horizontal
const useStyles = makeStyles({
  root: {
    display: "flex",
    backgroundColor: '#fafafa',
    flexGrow: 1,
    "& > div": {
      width: "100vw",
      margin: "0"
    }
  }
});

function App(){
  const [state, dispatch] = useReducer(AppReducer, {})
  const classes = useStyles();

  useEffect(()=>{
    async function getData() {
        try { 
          let req = await axios.get("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", options)
          let req2 = await axios.get("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", options)
          dispatch({type: 'SET_CASES_BY_COUNTRY', data: req.data.countries_stat})
          dispatch({type: 'SET_GENERAL_STATS', stats: req2.data})
        } catch (e) {
         console.log("ee",e); 
        }
    }
    getData();
    
  },[])
    return (
      <AppContext.Provider value={{state, dispatch}}>
          <Nav></Nav>
          <div className={classes.root}>
            <Grid container  justify="center" spacing={5} style={{marginTop: '10px 0'}}>
              <Grid container justify="center" item xs={12} sm={10}>
                <GeneralStats />
              </Grid>
              <Grid item xs={12} sm={10}>
                <Table />
              </Grid>
            </Grid>
          </div>
      </AppContext.Provider>
    );
  
}

export default App;
