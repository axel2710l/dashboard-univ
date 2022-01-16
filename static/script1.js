// import years from './getYears';

const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');
// console.log(years);
//-------------------------------------students per year---------------------------------------------
stdPerYear();
function stdPerYear() {

	httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', 'http://127.0.0.1:5000/api/students/perYear');
	httpRequest.onreadystatechange = doDisplayStdPerYear;
	httpRequest.send();
}
var years=[];

function doDisplayStdPerYear(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if (httpRequest.status === 200) {
			reponse = httpRequest.responseText;

			years = JSON.parse(reponse)

			console.log(years[0].nbrstd);
            setChart1();
		} else {
			alert('Petit soucis');
		}
	}
}
//----------------------------------------------------------------------------------------------

tabs.forEach(tab =>{
    tab.addEventListener('click', ()=>{
        
        tabContents.forEach(t=>{
            t.classList.remove('active')
        })
        tabs.forEach(t=>{
            t.classList.remove('active')
        })
        const target = document.querySelector(tab.dataset.tabTarget)
        target.classList.add('active')
        tab.classList.add('active')

    })
})





// var ctx = document.getElementById('chart').getContext('2d');

console.log('hello');

function setChart1(){
    const nbr19=years.filter(y=> y.annee === 2019)[0].nbrstd;
    const nbr20=years.filter(y=> y.annee === 2020)[0].nbrstd;
    const nbr21=years.filter(y=> y.annee === 2021)[0].nbrstd;
var data ={
    labels: ['2019', '2020', '2021' ],
    
    datasets: [{
        barThickness: 100,
        data: [nbr19,nbr20, nbr21],
        tension: 0.3,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
           
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
           
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        
    }]
}
var options = {
    bezierCurve: true,
}
var config = {
    type: 'bar',
    data: data,
    options: options,
    borderColor: '#00000',
};
    var chart = new Chart (document.getElementById('chart'), config);
}
var chartt = new Chart (document.getElementById('chartt'), config);





