let searchButton = document.querySelector("#searchButton")
let dateBox = document.querySelector("#searchTerm")


//Add an event listener to the button that runs the function sendApiRequest when it is clicked
searchButton.addEventListener("click", ()=>{

    let str = new Date(dateBox.value).toISOString();
    var rawDate = str.substring(0, 10);

    sendApiRequest(rawDate)
})


//An asynchronous function to fetch data from the API.
async function sendApiRequest(date){
    let API_KEY = "SAah6C0uGcZ7AATFJn8UbuyXjpGnZGXkbgdKwJ99"
    // let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);

    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${date}&end_date=${date}`);
    
    let data = await response.json();
    //console.log(data[0]);
    useApiData(data[0]);
}


//function that does something with the data received from the API. The name of the function should be customized to whatever you are doing with the data
function useApiData(data){
    document.querySelector("#image-title").innerHTML = data.title;

    var date = setDate(data);

    document.querySelector("#subtitle").innerHTML = data.copyright + " &#183; " +  date;
    document.querySelector("#image").innerHTML = `
        <div>
            <img src="${data.url}" alt="retreived-image" class="retreived-image">
        </div>`
    document.querySelector("#details").innerHTML = data.explanation;


}

function setDate(data){

    var d = new Date(data.date);
    var year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var month = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    var day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    
    var formattedDate = (`${month} ${day}, ${year}`);
    return formattedDate;
}

function setToday(){

    var today = new Date();
    var todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    //console.log(todayDate);



    sendApiRequest(todayDate);
}


/*  -------------- */

particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 355,
        "density": {
          "enable": true,
          "value_area": 789.1476416322727
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.48927153781200905,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 0.2,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 0,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 0.2,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 83.91608391608392,
          "size": 1,
          "duration": 3,
          "opacity": 1,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
