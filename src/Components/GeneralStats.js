import React, {useContext, useEffect} from 'react';
import { Grid, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppContext from '../hooks/context';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 475,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardHeader: {
      background: '#e7f7fe'
  }
});

const headCells = [
    { id: 'total_cases', numeric: true, disablePadding: false, label: 'Total Cases', color: 'green' },
    { id: 'total_deaths', numeric: true, disablePadding: false, label: 'Deaths',  color: 'red' },
    { id: 'total_recovered', numeric: true, disablePadding: false, label: 'Recovered',  color: 'blue' },
    { id: 'new_cases', numeric: true, disablePadding: false, label: 'New Cases', color: 'orange' },
    { id: 'active_cases', numeric: true, disablePadding: false, label: 'Active Cases', color: 'purple' },
  ];

export default function GeneralStats() {

    const { state } = useContext(AppContext);
    const stateIsEmpty = Object.keys(state).length === 0 && state.constructor === Object;
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const statsLoaded = !!state.generalStats

    useEffect(()=>{
    },[statsLoaded])
    
  return (
      <>
    <Card className={classes.root}>
        <CardHeader title="Worldwide Statistics" className={classes.cardHeader}/>
        <CardContent>
        {headCells.map((cell)=>{
            return <Grid container justify="space-between">
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>{cell.label}:</Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>{statsLoaded ? <span style={{color: `${cell.color}`}}>{state.generalStats[cell.id]}</span> : <CircularProgress size={8}/>}</Typography>
                    </Grid>
                </Grid>
        })}
        </CardContent>
    </Card>
  </>
   );
}
// const x = <Card className={classes.root}>
// <CardHeader title="Worldwide Statistics" className={classes.cardHeader}/>
// <CardContent>
//     <Grid container justify="space-between">
//         <Grid item>
//             <Typography className={classes.title} color="textSecondary" gutterBottom>Total Cases:</Typography>
//         </Grid>
//         <Grid item>
//             <Typography className={classes.title} color="textSecondary" gutterBottom>{state.generalStats.total_cases}</Typography>
//         </Grid>
//     </Grid>
//     <Grid container justify="space-between">
//         <Grid item>
//             <Typography className={classes.title} color="textSecondary" gutterBottom>Total Deaths:</Typography>
//         </Grid>
//         <Grid item>
//             <Typography className={classes.title} color="textSecondary" gutterBottom>{state.generalStats.total_deaths}</Typography>
//         </Grid>
//     </Grid>
//     <Grid container justify="space-between">
//         <Grid item>
//             <Typography className={classes.title} color="textSecondary" gutterBottom>Recovered:</Typography>
//         </Grid>
//         <Grid item>
//             <Typography className={classes.title} color="textSecondary" gutterBottom>{state.generalStats.total_recovered}</Typography>
//         </Grid>
//     </Grid>
//     <Grid container justify="space-between">
//         <Grid item>
//             <Typography className={classes.title} color="textSecondary" gutterBottom>New Cases:</Typography>
//         </Grid>
//         <Grid item>
//             <Typography className={classes.title} color="textSecondary" gutterBottom>{state.generalStats.new_cases}</Typography>
//         </Grid>
//     </Grid>
//     <Grid container justify="space-between">
//         <Grid item>
//             <Typography className={classes.title} color="textSecondary" gutterBottom>Active Cases:</Typography>
//         </Grid>
//         <Grid item>
//             <Typography className={classes.title} color="textSecondary" gutterBottom>{state.generalStats.active_cases}</Typography>
//         </Grid>
//     </Grid>
// </CardContent>
// <CardActions>
//     <Button size="small">Learn More</Button>
// </CardActions>
// </Card>