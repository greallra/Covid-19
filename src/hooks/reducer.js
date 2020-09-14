const AppReducer = (state, action)=>{
   
    switch (action.type) {
        case 'SET_CASES_BY_COUNTRY':
            return {...state, casesByCountry : [...action.data]}
        case 'SET_GENERAL_STATS':
            return {...state, generalStats : {...state.generalStats, ...action.stats}}
        return state
            break;
    }
}


// const notesReducer = (state, action) => {
//     switch(action.type) {
//         case 'POPULATE_NOTES':
//         return action.notes
//         case 'ADD_NOTE':
//         return [...state, {title: action.title, body: action.body}]
//         case 'REMOVE_NOTE':
//         return state.filter((note)=> note.title !==action.title)
//         default:
//         return state
//     }
//   }
  
export default AppReducer;