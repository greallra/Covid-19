import React, { useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppContext from '../hooks/context';
import LinearProgress from '@material-ui/core/LinearProgress';
import handleSort from '../utils/sort';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        //can use theme responsively
        [theme.breakpoints.down('xs')]: {
          backgroundColor: theme.palette.secondary.main,
        }
      },
    },
    anotherStyle : {
      fontSize: '55px',
      color: (props)=>(props.color ? props.color: 'green')
    },
    table: {
        minWidth: 650,
        [theme.breakpoints.down('xs')]: {
            backgroundColor: theme.palette.secondary.main,
        }
      },
    head: {
        [theme.breakpoints.up('xs')]: {
            backgroundColor: '#e7f7fe',
        }
    },
    cellHead: {
      '&:hover': {
        color: 'rgba(0, 0, 0, 0.57);',
        cursor: 'pointer'
      }
    }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const headCells = [
  { id: 'country_name', numeric: false, disablePadding: true, label: 'Country Name' },
  { id: 'cases', numeric: true, disablePadding: false, label: 'Cases' },
  { id: 'deaths', numeric: true, disablePadding: false, label: 'Deaths' },
  { id: 'new_cases', numeric: true, disablePadding: false, label: 'New Cases' },
  { id: 'new_deaths', numeric: true, disablePadding: false, label: 'New Deaths' },
  { id: 'total_recovered', numeric: true, disablePadding: false, label: 'Total Recovered' },
  { id: 'active_cases', numeric: true, disablePadding: false, label: 'Active Cases' },
  { id: 'serious_critical', numeric: true, disablePadding: false, label: 'Serious Critical' },
  { id: 'total_cases_per_1m_population', numeric: true, disablePadding: false, label: 'Per 1/m' },
];

export default function AppTable() {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState('asc')
  const [selected, setSelected] = useState('country_name')
  const [sortedList, setSortedList] = useState([])
  const {state} = useContext(AppContext)

  useEffect(()=>{
    const stateIsEmpty = Object.keys(state).length === 0 && state.constructor === Object
    if(!stateIsEmpty) {
      const sort = handleSort(state.casesByCountry, 'default', sortBy)
      
      setSortedList(sort)
    }
  },[state])

  function handleFilter(id, numeric) {
   
    let sb = sortBy === 'asc' ? 'desc': 'asc'
    setSortBy(sb)
    setSelected(id)
    const sort = handleSort(state.casesByCountry, id, sb, numeric)
    setSortedList([...sort])
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow>
            {headCells.map((cell)=>{
                return <TableCell onClick={()=>{handleFilter(cell.id, cell.numeric)}} className={classes.cellHead}>
                  <TableSortLabel active={selected === cell.id} direction={sortBy} className={classes.cellHead}>{cell.label}</TableSortLabel>
                  </TableCell>
            })}
          </TableRow>
        </TableHead>
             {!sortedList.length > 0 ? <LinearProgress />:  
             <TableBody>
              {sortedList.map((country)=>{
                  return <TableRow>
                      <TableCell>{country.country_name}</TableCell>
                      <TableCell>{country.cases}</TableCell>
                      <TableCell>{country.deaths}</TableCell>
                      <TableCell>{country.new_cases}</TableCell>
                      <TableCell>{country.new_deaths}</TableCell>
                      <TableCell>{country.total_recovered}</TableCell>
                      <TableCell>{country.active_cases}</TableCell>
                      <TableCell>{country.serious_critical}</TableCell>
                      <TableCell>{country.total_cases_per_1m_population}</TableCell>
                  </TableRow>
              })}
            </TableBody>
            }
        
      </Table>
    </TableContainer>
  );
}
