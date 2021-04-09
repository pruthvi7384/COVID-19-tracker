// Web page styling start

    // Add the page onload option functionality
        let loader = document.getElementById('loading');
        function myloader(){ 
            loader.style.display ='none';
        }
    // End page load functionality

    // Style to nav bar on scroll
        const nav= document.querySelector('nav');
        const firstSection = document.querySelector('#home');
        const sectionOneOption ={
            rootMargin: "-300px 0px 0px 0px"
        }
        const sectionOneObserver = new IntersectionObserver(function(
            entries,
            sectionOneObserver
        ){
            entries.forEach(entry => {
                if(!entry.isIntersecting){
                    nav.classList.add("nav_color");
                }else{
                    nav.classList.remove("nav_color");
                }
            })
        },sectionOneOption);
        sectionOneObserver.observe(firstSection);
    // End nav bar onscroll functionality

// End web page Style

// Acctual Added The Covid-19 app functionality

    const url ="https://disease.sh/v3/covid-19/gov/India"; //Declear the COVID-19 api
    
    //Here Use Java script method to featch api
    fetch(url)
    //Featch the resonse
    .then(response =>{
        getData(response.json());//Call the function
    })
    //Catch the error
    .catch(err =>{
        console.log(err);
    })
    
    //Actual get date using this function call
    function getData(result) {
        //here resolve the data
        Promise.resolve(result).then(value =>{
            //brack the hole function to differnt function
            getDate(value.updated); //call the function for date
            getTotal(value.total); //call the function for total cases
            getState(value.states); //call the function for state wise cases
        })
    }

    // Decleare function for Actual Date for updated data
    function getDate(date){
        var upDa = new Date(date);
        var da = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        var days = da[upDa.getDay()];
        var d = upDa.getDate();
        if(d<10){
            d="0" + d;
        }
        var m = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var mo = m[upDa.getMonth()];
        var y = upDa.getFullYear();
        var h = upDa.getHours();
        var pm="AM";
        if(h == 12){
            h=12;
        }
        if(h>12){
            h=h-12;
            pm='PM';
        }
        if(h<10){
            h="0" + h;
        }
        const min = upDa.getMinutes();
        if(min<10){
            min = "0" + min;
        }

        const sec = upDa.getSeconds();
        if(sec<10){
            sec = "0" + sec;
        }
        document.getElementById("update_date").innerHTML = days+' ' +d +' '+mo+' '+y;
        document.getElementById("update_time").innerHTML = h +' '+':'+' '+min +' '+':' +' '+ sec+' '+pm;
    }

    // Decler the function for India caes featch throw api
    function getTotal(total){
        //show data to front end
        document.getElementById('total_case').innerHTML = total.cases;
        document.getElementById('total_active').innerHTML =total.active;
        document.getElementById('total_recovered').innerHTML=total.recovered;
        document.getElementById('total_deaths').innerHTML=total.deaths;
        document.getElementById('today_case').innerHTML = total.todayCases;
        document.getElementById('today_active').innerHTML =total.todayActive;
        document.getElementById('today_recovered').innerHTML=total.todayRecovered;
        document.getElementById('today_deaths').innerHTML=total.todayDeaths;

        //Insert chart bar to front end
        const ctx1 = document.getElementById('myChart1').getContext('2d');
        const lable = ['CASES', 'ACTIVE CASES','RECOVERED CASES','DEATHS'];
        const data = [{x:'CASES',TOTAL: total.cases, NEW: total.todayCases}, {x:'ACTIVE CASES',TOTAL: total.active, NEW:total.todayActive},{x:'RECOVERED CASES',TOTAL: total.recovered, NEW: total.todayRecovered},{x:'DEATHS',TOTAL: total.deaths, NEW: total.todayDeaths}];
        const mychart1 = new Chart(ctx1,{
            type: 'bar',
        data: {
            labels: lable,
            datasets: [{
                label: 'TOTAL',
                data: data,
                parsing: {
                    yAxisKey: 'TOTAL'
                },
                backgroundColor: 'blue'
            }, {
                label: 'NEW',
                data: data,
                parsing: {
                    yAxisKey: 'NEW'
                },
                backgroundColor:'green'
            }]
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'INDIA COVID-19 CASES',
                }
            },
            
        },
        })
    }

    //Decler the function for state data featch throw api
    function getState(state){
        //featch all data using for loop
        for(let i=0; i<state.length;i++){
            const sr = i+1;
            const name = state[i].state;
            const totalc = state[i].cases;
            const totala = state[i].active;
            const totalr = state[i].recovered;
            const deaths = state[i].deaths;
            const tr = document.createElement('tr');
            tr.innerHTML='<th scope="row">'+sr+'</th>'+ '\n' +'<td>'+name+'</td>'+'\n'+'<td class="text-primary text-bold">'+totalc+'</td>'+'\n'+'<td class="text-warning text-bold">'+totala+'\n'+'</td>'+'\n'+'<td class="text-success text-bold">'+totalr+'</td>'+'\n'+'<td class="text-danger text-bold">'+deaths+'<td>';
            document.getElementById('create_state').appendChild(tr);

            const todayC =  state[i].todayCases;
            const todayA = state[i].todayActive;
            const todayR = state[i].todayRecovered;
            const todayD = state[i].todayDeaths;

            const tTr = document.createElement('tr');
            tTr.innerHTML ='<th scope="row">'+sr+'</th>'+ '\n' +'<td>'+name+'</td>'+'\n'+'<td class="text-primary text-bold">'+todayC+'</td>'+'\n'+'<td class="text-warning text-bold">'+todayA+'\n'+'</td>'+'\n'+'<td class="text-success text-bold">'+todayR+'</td>'+'\n'+'<td class="text-danger text-bold">'+todayD+'<td>';
            document.getElementById('create_todat_state').appendChild(tTr);
         }

         //Insert front end to chart line
        const lable=[];//decler the empty arry for lable of chart
        const data =[]; //decler the empty arry for data of Chart
            //retriw data form api 
            for(let i=0; i<state.length;i++){
                    const d = {x: state[i].state,cases: state[i].cases,active: state[i].active,recovered: state[i].recovered,deathss: state[i].deaths};
                    data.push(d); //puch lable to lable variable
                    const l = state[i].state;
                    lable.push(l); // puch data to data variable
            }
        const ctx = document.getElementById('myChart2').getContext('2d');
        const mychart1 = new Chart(ctx,{
            type: 'line',
            data: {
                labels: lable,
                datasets: [{
                    label: 'CASES',
                    data: data,
                    parsing: {
                        yAxisKey: 'cases',
                    },
                    backgroundColor: 'blue'
                },{
                    label: 'ACTIVE',
                    data: data,
                    parsing: {
                        yAxisKey: 'active'
                    },
                    backgroundColor: 'yellow'
                },{
                    label: 'RECOVERED',
                    data: data,
                    parsing: {
                        yAxisKey: 'recovered'
                    },
                    backgroundColor: 'green'
                },{
                    label: 'DEATHS',
                    data: data,
                    parsing: {
                        yAxisKey: 'deathss'
                    },
                    backgroundColor: 'red'
                }]
            },
            options:{
                responsive: true,
                maintainAspectRatio: false,
                borderColor: '#ccc',
                borderWidth: 1,
                plugins: {
                    title: {
                        display: true,
                        text: 'INDIA COVID-19 STATE WISE CASES',
                    }
                }
            }
            })   
    }
   
// End the Covid-19 api featch 

// Added Here Table Search Funtionality

   function search(){
       const fillter = document.getElementById('search_input').value.toUpperCase();
       const table = document.getElementById('table_search');
       const tr = table.getElementsByTagName('tr');
       for(let i=0; i<tr.length; i++){
           let td= tr[i].getElementsByTagName('td')[0];
           if(td){
               const textvale = td.textContent || td.innerHTML;
               if(textvale.toUpperCase().indexOf(fillter)>-1){
                   tr[i].style.display="";
               }else{
                   tr[i].style.display ="none";
               }
           }
       }
    }

   function search_today(){
        const fillter = document.getElementById('search_input_today').value.toUpperCase();
        const table = document.getElementById('state_today');
        const tr = table.getElementsByTagName('tr');
        for(let i=0; i<tr.length; i++){
            const td= tr[i].getElementsByTagName('td')[0];
            if(td){
                const textvale = td.textContent || td.innerHTML;
                if(textvale.toUpperCase().indexOf(fillter)>-1){
                    tr[i].style.display="";
                }else{
                    tr[i].style.display ="none";
                }
            }
        }
    }

// End the Search Functionality