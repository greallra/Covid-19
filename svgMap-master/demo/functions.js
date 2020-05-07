//Change gravity Level of newData

function getNewVirGravity(iso, n = 0) {
    //REMOVE COMMAS
    n = n.replace(',', '');
    //10: 80,000 +
    if(n > 80000){
        return 10
         
    }
    //9: 70,000 +
    else if(n > 70000){
        return 9
         
    }
    //8: 60,000 +
    else if(n > 60000){
        return 8
         
    }
    //7: 50,000 +
    else if(n > 50000){
        return 7
         
    }
    //6: 10,000 - 50,000
    else if(n > 10000 && n < 50000){
        return 6
         
    }
    //5: 5000 - 10,000
    else if(n > 5000 && n < 10000){
        return 5
         
    }
    //4: 1000 - 5000
    else if(n > 1000 && n < 5000){
        return 4
         
    }
    //3: 100 - 1000
    else if(n > 100 && n < 1000){
        return 3
         
    }
    //2: 10 - 100
    else if(n > 10 && n < 100){
        return 2
         
    }
    //1: 1 - 10
    else if(n > 0 && n < 11){
        return 1
         
    }
    //0: 0
   else {
        return 0;
    }
}
