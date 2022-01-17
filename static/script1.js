// import years from './getYears';

const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");
var chart2, chart;

// console.log(years);
function actualiser(){
    chart.destroy()
    chart2.destroy()
    chart3.destroy()
    stdPerYear()
}
//-------------------------------------students per year---------------------------------------------
stdPerYear();
function stdPerYear() {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", "http://127.0.0.1:5000/api/students/perYear");
  httpRequest.onreadystatechange = doDisplayStdPerYear;
  httpRequest.send();
}
var years = [];

function doDisplayStdPerYear() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      reponse = httpRequest.responseText;

      years = JSON.parse(reponse);

      //   console.log(years[0].nbrstd);
      setChart1();
      stdPerSpec();
    } else {
      alert("Petit soucis");
    }
  }
}
//----------------------------------------------------------------------------------------------

//-------------------------------------students per Speciality---------------------------------------------
// stdPerSpec();
function stdPerSpec() {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", "http://127.0.0.1:5000/api/students/perSpeciality");
  httpRequest.onreadystatechange = doDisplayStdPerSpec;
  httpRequest.send();
}
var specPerYear = [];

function doDisplayStdPerSpec() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      reponse = httpRequest.responseText;

      specPerYear = JSON.parse(reponse);
      //   console.log(specPerYear);
      setChart2("SPECIALITE_1", "SPECIALITE_2", "SPECIALITE_3");
      getGrades();
    } else {
      alert("Petit soucis");
    }
  }
}
//----------------------------------------------------------------------------------------------

//-------------------------------------moyennes---------------------------------------------
function getGrades() {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", "http://127.0.0.1:5000/api/students/grades");
  httpRequest.onreadystatechange = doDisplayGrades;
  httpRequest.send();
}
var grades = [];

function doDisplayGrades() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      reponse = httpRequest.responseText;

      grades = JSON.parse(reponse);
    //   console.log(grades);
      setChart3();
    } else {
      alert("Petit soucis");
    }
  }
}
//----------------------------------------------------------------------------------------------

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabContents.forEach((t) => {
      t.classList.remove("active");
    });
    tabs.forEach((t) => {
      t.classList.remove("active");
    });
    const target = document.querySelector(tab.dataset.tabTarget);
    target.classList.add("active");
    tab.classList.add("active");
  });
});

// var ctx = document.getElementById('canvas1').getContext('2d');

console.log("hello");

function setChart2(sp1, sp2, sp3) {
  const sp1nbr19 = specPerYear.filter(
    (y) => y.specialite === sp1 && y.annee === 2019
  )[0];
  const sp1nbr20 = specPerYear.filter(
    (y) => y.specialite === sp1 && y.annee === 2020
  )[0];
  const sp1nbr21 = specPerYear.filter(
    (y) => y.specialite === sp1 && y.annee === 2021
  )[0];

  const sp2nbr19 = specPerYear.filter(
    (y) => y.specialite === sp2 && y.annee === 2019
  )[0];
  const sp2nbr20 = specPerYear.filter(
    (y) => y.specialite === sp2 && y.annee === 2020
  )[0];
  const sp2nbr21 = specPerYear.filter(
    (y) => y.specialite === sp2 && y.annee === 2021
  )[0];

  const sp3nbr19 = specPerYear.filter(
    (y) => y.specialite === sp3 && y.annee === 2019
  )[0];
  const sp3nbr20 = specPerYear.filter(
    (y) => y.specialite === sp3 && y.annee === 2020
  )[0];
  const sp3nbr21 = specPerYear.filter(
    (y) => y.specialite === sp3 && y.annee === 2021
  )[0];
  var data = {
    labels: ["2019", "2020", "2021"],

    datasets: [
      {
        label: sp1,
        data: [sp1nbr19.nbrstd, sp1nbr20.nbrstd, sp1nbr21.nbrstd],
        tension: 0.3,

        borderColor: "rgba(198, 0, 224, 1)",
        backgroundColor: "rgba(198, 0, 224, 0.1)",
        borderWidth: 4,
        fill: true,
      },
      {
        label: sp2,
        data: [sp2nbr19.nbrstd, sp2nbr20.nbrstd, sp2nbr21.nbrstd],
        tension: 0.3,

        borderColor: "rgba(0, 180, 224, 1)",
        backgroundColor: "rgba(0, 180, 224, 0.1)",
        borderWidth: 4,
        fill: true,
      },
      {
        label: sp3,
        data: [sp3nbr19.nbrstd, sp3nbr20.nbrstd, sp3nbr21.nbrstd],
        tension: 0.3,

        borderColor: "rgba(127, 224, 0, 0.8)",
        backgroundColor: "rgba(127, 224, 0, 0.1)",
        borderWidth: 4,
        fill: true,
      },
    ],
  };
  var options = {
    bezierCurve: true,
  };
  var config = {
    type: "line",
    data: data,
    options: options,
    borderColor: "#00000",
  };
  chart2 = new Chart(document.getElementById("canvas2"), config);
}
function updateChart2(sp1, sp2, sp3) {
  // document.getElementById("canvas2").destroy();
  chart2.destroy();
  setChart2(sp1, sp2, sp3);
}
var vueChk = document.getElementById('vue-generale')
vueChk.addEventListener('change',()=>{
    // console.log(vueChk.checked);
    var elts = document.querySelectorAll('.vue')
    if (vueChk.checked) {
        elts.forEach(element => {
            console.log(element);
            element.classList.remove("vue-tabs")
            element.classList.add("vue-gen")
            actualiser()
        });
    }else{
        elts.forEach(element => {
            element.classList.remove("vue-gen")
            element.classList.add("vue-tabs")
            actualiser()
        });
    }
})
function reloadChart2() {
  var checkedBoxes = document.querySelectorAll(".specialite-choix:checked");
  // console.log(checkedBoxes);
  if (checkedBoxes.length !== 3) {
    alert("veuillez selectionner 3 specialites!!");
  } else {
    var spec = "SPECIALITE_";
    // console.log(spec + checkedBoxes[0].value);
    updateChart2(
      spec + checkedBoxes[0].value,
      spec + checkedBoxes[1].value,
      spec + checkedBoxes[2].value
    );
  }
}

function setChart1() {
  const nbr19 = years.filter((y) => y.annee === 2019)[0].nbrstd;
  const nbr20 = years.filter((y) => y.annee === 2020)[0].nbrstd;
  const nbr21 = years.filter((y) => y.annee === 2021)[0].nbrstd;
  var data = {
    labels: ["2019", "2020", "2021"],

    datasets: [
      {
          label:'Etudiants par année',
        barThickness: 80,
        data: [nbr19, nbr20, nbr21],
        tension: 0.3,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",

          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",

          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };
  var options = {
    bezierCurve: true,
  };
  var config = {
    type: "bar",
    data: data,
    options: options,
    borderColor: "#00000",
  };
  chart = new Chart(document.getElementById("canvas1"), config);
}
var chart3;
function setChart3() {
  const data3 = [[], [], []];
  for (let i = 0; i <= 2; i++) {
    // const element = array[i];
    for (let j = 1; j < 8; j++) {
      // const element = array[j];
      pourcentage =
        grades.filter(
          (e) =>
            e.annee === 2019 + i &&
            e.specialite === "SPECIALITE_" + j &&
            e.moyenne >= 10.0
        ).length /
        grades.filter(
          (e) => e.annee === 2019 + i && e.specialite === "SPECIALITE_" + j
        ).length;
      data3[i].push((pourcentage * 100).toFixed(0));
    //   console.log("annee: " + (i + 2019) + "specialite: " + j);
    //   console.log(data3[i]);
    }
  }

  var data = {
    labels: [
      "SPECIALITE_1",
      "SPECIALITE_2",
      "SPECIALITE_3",
      "SPECIALITE_4",
      "SPECIALITE_5",
      "SPECIALITE_6",
      "SPECIALITE_7",
    ],

    datasets: [
      {
        label: "2019",
        data: data3[0],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "2020",
        data: data3[1],
        fill: true,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      },
      {
        label: "2021",
        data: data3[2],
        fill: true,
        fill: true,
        borderColor: "rgba(127, 224, 0, 0.8)",
        backgroundColor: "rgba(127, 224, 0, 0.1)",
        pointBackgroundColor: 'rgba(127, 224, 0, 0.8)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      },

    ],
  };
  var options = {
    elements: {
        line: {
          borderWidth: 3
        }
      }
  };
  var config = {
    type: "radar",
    data: data,
    options: options,
    borderColor: "#00000",
  };
  chart3 = new Chart(document.getElementById("canvas3"), config);
}
