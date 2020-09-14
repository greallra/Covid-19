import numeral from 'numeral'

export default (caseByCountry, id, sortBy, numeric)=>{
    if(!numeric && sortBy === 'asc') {
        const sorted = caseByCountry.sort((a,b)=>{
            if(a[id] > b[id]){
                return 1
            }else {
                return -1
            }
        })
        return sorted
    }
    else if(!numeric && sortBy === 'desc') {
        const sorted = caseByCountry.sort((a,b)=>{
            if(a[id] > b[id]){
                return -1
            }else {
                return 1
            }
        })
        return sorted
    }
    else if(sortBy === 'asc') {
        const sorted = caseByCountry.sort((a,b)=>{

            if(numeral(a[id]).value() > numeral(b[id]).value()){
                return 1
            }else {
                return -1
            }
        })
        return sorted
    } else if(sortBy === 'desc') {
        const sorted = caseByCountry.sort((a,b)=>{
            if(numeral(a[id]).value() > numeral(b[id]).value()){
                return -1
            }else {
                return 1
            }
        })
        return sorted
    }else
    {
        return []
    }
    
  }