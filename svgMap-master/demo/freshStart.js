const url = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php';
let apiData;
let customData = [];
let isoObjectToPush = {}
const options = {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "73b4193dc8msh6e231e05f654c80p1b0db8jsn0c2a8aa64974"
    }
}


//Get Iso and cases and push to customData
function getMap(dataChosen, firstRun){
    console.log("dataChosen", dataChosen);
    
    fetch(url, options)
        .then(res=>res.json())
        .then((res)=>{  
            apiData = res.countries_stat
            console.log("Res",res);
            
            apiData.forEach((obj)=>{
                let iso = getIsoCode(obj.country_name);
                let newVirGravity = getNewVirGravity(iso, obj.cases);
   
                customData.push({
                    isoCode: iso,
                    cases: newVirGravity,
                    totalCases: obj.cases,
                    totalDeaths: obj.deaths,
                    newDeaths: obj.new_deaths
                })
            })
            console.log("customData",customData);
            //sort newData 3
            customData.sort(function(a,b){
            if(a.isoCode > b.isoCode) {return 1}
            if(a.isoCode < b.isoCode) {return -1}
            else { return 0}
            })
    
        //Change data's virusGravity level with customData
        for( ky in data.values){
            //loop array with each key
            //change virusGravity
        const foundObject = customData.filter((obj)=>obj.isoCode === ky);    
        
        const foundObjectExtract = foundObject.length > 0 ? foundObject[0].cases: 0;
            data.values[ky].virusGravity = foundObjectExtract;

        const foundObjectExtract2 = foundObject.length > 0 ? foundObject[0].totalCases: 0;
            data.values[ky].cases = foundObjectExtract2;

    
        }
    

        //data 2 add deaths from custom data
        let max = 0
        for( k in data2.values){
            delete data2.values[k].cases  
            let foundObject = customData.filter((obj)=>obj.isoCode === k);
            let foundObjectExtract = foundObject.length > 0 ? foundObject[0].totalDeaths: '0';
            //convert foundObjectExtract to num
            foundObjectExtract = foundObjectExtract.replace(/\,/g,'');
            foundObjectExtract = parseInt(foundObjectExtract, 10)
            data2.values[k].deaths = foundObjectExtract;
            //get max
            if(data2.values[k].deaths > max){ max = data2.values[k].deaths};     
        }
        //add max and min to data 2
        data2.data.deaths.thresholdMax = max
        console.log("data2",data2);


        //data 3 add deaths from custom data
        let max2 = 0
        //add new applydata
        data3.applyData = "new deaths"
        //change key of all elements to 'new death'
        for( k in data3.values){
            delete data3.values[k].deaths
            data3.values[k]['new deaths'] = '0';
        }
        for( k in data3.values){
            delete data3.values[k].cases  
            delete data3.values[k].population  
            let foundObject = customData.filter((obj)=>obj.isoCode === k);
            let foundObjectExtract = foundObject.length > 0 ? foundObject[0].newDeaths: '0';
            //convert foundObjectExtract to num
            foundObjectExtract = foundObjectExtract.replace(/\,/g,'');
            foundObjectExtract = parseInt(foundObjectExtract, 10)
            data3.values[k]['new deaths'] = foundObjectExtract;
            //get max2
            if(data3.values[k].deaths > max2){ max2 = data3.values[k]['new deaths']};     
        }
        //add max2 and min to data 2
        data3.data['new deaths'].thresholdMax = max2
        console.log("data3", data3);
    
        //remove elements
        var children = document.getElementById('target').children;
        for (var child of children) {
            child.remove();
        }
  
            new svgMap({
                targetElementID: 'target',
                data: dataChosen,
                colorMax: '#fdd835',
                colorMin: '#fffde7',
                flagType: 'image'
                });
            })
}




