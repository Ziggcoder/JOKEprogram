const request = require('request');
const ps= require("prompt-sync");
const fs= require("fs");
const prompt=ps();

/////////////////////////////////////////////check argument /////////////////////////
var myArgs = process.argv.slice(2);

  if(myArgs[0]=="leaderboard")
  {   ///////////progrm for fetch most popular  joke ///////////
      //console.log(myArgs[0]);
      const data =fs.readFileSync("joke.txt","utf8");
      //console.log(data);
      var jokedata=`[${data.slice(0,-1)}]`;
       //console.log(jokedata);
     var jokedata=JSON.parse(jokedata);
     //console.log(jokedata[0].id);
    // console.log(jokedata.length);
      
     ///////////////////////$$$$$$$$$$$$$$//////////////////////////////
     var consume=jokedata;
 
     var temp = [];
     
     var produce = [];
     
     for(var i=0;i<consume.length;i++){
       if(temp.indexOf(consume[i].id) == -1){
               temp.push(consume[i].id);
          var _data = {};
          _data.name = consume[i].id;
          _data.count = 1;
          
          produce.push(_data);
       }else{
         for(var j=0;j<produce.length;j++){
                 if(produce[j].name === consume[i].id){
                    var _x = parseInt(produce[j].count) + 1;
                produce[j].count = _x;
            }
         }
       }
     }
    
    //console.log(produce[0]);
  //////////////////////$$$$$$$$$$//////////////////////////////////
    for(var i=0;i<consume.length;i++){
        if (produce[0].name==consume[i].id)
        {   
            console.log(`\n\n\nThe most popolar joke is :\n ${consume[i].joke}\n\n\n`);
            break;
        }
    }
       

     ///////////progrm for fetch most popular joke close ///////////

  }
  else {
     // console.log("defaut program will exicute ")
/////////////////////////////////////////////check argument close//////////////////////////////

str1='https://icanhazdadjoke.com/search?term=';
str2='';
let search=prompt("search:");
str2=search;

var wurl= str1.concat(str2);
const options = {
    url: wurl,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        
    }
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    if (json.total_jokes==0)
    {
        console.log('No joke found !!');
    }
    else{
 //  console.log(json);
   // console.log(json.results[0].id);
   console.log(json.results[0].joke);

    fs.appendFile('joke.txt', `\r\n{"id":"${json.results[0].id}","joke":"${json.results[0].joke}"},`, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }


});

}

