// nav-bar active state change without reloading webpage
$(".nav-item").on("click", function () {
    $(".nav-item").removeClass("active");
    $(this).addClass("active");
});

//Navigation Buttons

document.addEventListener('DOMContentLoaded', WireUpEvents);

function WireUpEvents() {
    var about = document.getElementById('about'),
        rockets = document.getElementById('rockets');
    missions = document.getElementById('missions');
    launches = document.getElementById('launches');


    about.addEventListener('click', aboutClick);
    rockets.addEventListener('click', rocketsClick);
    missions.addEventListener('click', missionsClick);
    launches.addEventListener('click', launchesClick);

}
function aboutClick() {
    callAbout()
}
function rocketsClick() {
    callRockets()
}
function missionsClick() {
    callMissions()
}
function launchesClick() {
    callLaunches()
}

// Variables

const app = document.getElementById("data");
const api = "https://api.spacexdata.com/v3/";

let btnValue = {}

function getValue(value) {
    btnValue = value;
}


//Clear data div 

function clearData() {
    app.innerHTML = "";
}


// API function

upcomingLaunch()

function upcomingLaunch() {
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("bg");

    axios.get(api + "launches/upcoming").then(response => {
        data = response.data
        
        $("#loader").addClass("hide-loader");
    });
}



// calls spacex rocket url - all rockets

function callRockets() {
    clearData()
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("bg");

    axios.get(api + "rockets").then(response => {
        data = response.data
        let title = document.createElement("div");
        title.setAttribute("class", "title")
        app.appendChild(title)
        title.innerHTML = `<h1><strong>SpaceX Rockets</strong></h1>`
        console.log(data);
        data.forEach(item => {
            $("#loader").addClass("hide-loader");

            let info = document.createElement("div");
            info.setAttribute("class", "card");
            app.appendChild(info);

            info.innerHTML = `
                            <div class="card-header">
                                <h3>${item.rocket_name}</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h5 class="card-title">ID: ${item.id} - Active: ${item.active}</h5>
                                        <p class="card-text">${item.description}</p>
                                        Wikipedia: <a href="${item.wikipedia}" target="_blank">${item.wikipedia}</a>
                                        <br>
                                        <button onclick="getValue(value), rocketSpec()" value="rockets/${item.rocket_id}" class="more btn btn-primary">More</button>
                                    </div>
                                    <div class="col-md-6 text-center">
                                        <img class="rocket-image" src="${item.flickr_images[0]} alt="Rocket-Image">
                                    </div>
                                </div>
                            </div>`;


        });
    })
}



function callMissions() {
    clearData()
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("bg");

    axios.get(api + "missions").then(response => {
        data = response.data
        console.log(data.manufacturers)
        let title = document.createElement("div");
        title.setAttribute("class", "title")
        app.appendChild(title)
        title.innerHTML = `<h1><strong>Missions</strong></h1>`
        
        data.forEach(item => {
            $("#loader").addClass("hide-loader");
            item.manufacturers[1] = {}
            item.manufacturers[2] = {}
            item.manufacturers[3] = {}
            let info = document.createElement("div");
            info.setAttribute("class", "card");
            app.appendChild(info);
            
            info.innerHTML = `
                            <div class="card-header">
                                <h3>${item.mission_name}</h3>
                            </div>
                            <div class="card-body">
                                
                                   
                                        <h5 class="card-title">Mission ID: ${item.mission_id} - Active: ${item.active}</h5>
                                        <h6>Manufacturers: ${item.manufacturers[0]} - ${item.manufacturers[1]} - ${item.manufacturers[2]} - ${item.manufacturers[3]} </h6>
                                        <p class="card-text">${item.description}</p>
                                        Website: <a href="${item.website}" target="_blank">${item.website}</a> 
                                        <br>

                                        <a href="${item.wikipedia}" target="_blank"><i class="fab fa-wikipedia-w"></i> </a>
                                    

                                        <a href="${item.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                                     
                                        
                            
                            </div>`;

        });
         
    })
}

function callLaunches() {
    clearData()
    $("#loader").removeClass("hide-loader");
    $("#data").addClass("bg");

    axios.get(api + "launches/past").then(response => {
        data = response.data
        console.log(data)
        $("#loader").addClass("hide-loader");
    });
}



// calls spacex url

function callAbout() {
    clearData()
    $("#loader").removeClass("hide-loader");
    $("#data").removeClass("bg");


    axios.get(api).then(response => {
        data = response.data
        $("#loader").addClass("hide-loader");

        let info = document.createElement("div");
        info.setAttribute("class", "card");
        app.appendChild(info);

        info.innerHTML = `<div class="card-header">
                                <h3>${data.project_name}</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <p>All Information about SpaceX, Launches, Rockets and Missions are provided by the SpaceX API.</p>
                                        <p>${data.description}</p>
                                        <p><strong>Version: </strong>${data.version}</p>
                                            <div class="row">
                                                <a href="${data.project_link}" target="_blank">
                                                <img class="github" src="assets/images/Octocat.png">GitHub</a>
                                                <a href="${data.docs}" target="_blank">
                                                <img class="docs" src="assets/images/postman.png">Documentation</a>
                                            </div>
                                    </div>
                                    <div class="col-md-6 center-img">
                                        <img class="spacexwhite" src="assets/images/spacexwhite.png" alt="SpaceX">
                                    </div>
                                </div>
                            </div>`
        let aboutMe = document.createElement("div");
        aboutMe.setAttribute("class", "card");
        app.appendChild(aboutMe);
        aboutMe.innerHTML = `<div class="card-header">
                                <h3>Created By Tom Jones</h3>
                            </div>
                            <div class="card-body">
                                <p>This site was created as a Project for the Code Institutes Diploma in Software Development.
                                <br> To see the repository Click Here!</p>
                                <p><strong>Version: </strong>${data.version}</p>
                                <h5>Contact Me</h5>
                                <p><strong>Phone: </strong>07449 670 750</br>
                                <strong>Email: </strong>kushberrycream@hotmail.com</p>
                                <div class="row">
                                    <a href="https://github.com/kushberrycream" target="_blank">
                                        <img class="github" src="assets/images/Octocat.png" alt="Octocat">Github
                                    </a>
                                    <a href="" target="_blank">
                                        <img class="facebook" src="assets/images/facebook.png" alt="Facebook">Facebook
                                    </a>
                                </div>
                            </div>`;
    });
}



// calls a specific spacex rocket api url

function rocketSpec() {
    clearData()
    $("#loader").removeClass("hide-loader");
    $("#data").removeClass("bg");

    axios.get(api + btnValue).then(response => {
        data = response.data
        $("#loader").addClass("hide-loader");

        let aboutRocket = document.createElement("div");

        aboutRocket.setAttribute("class", "about-rockets");

        app.innerHTML = `<h1 class="text-center p-4"><strong>${data.rocket_name}</strong></h1>`
        app.appendChild(aboutRocket);


        aboutRocket.innerHTML = `<div class="row">
                                    <div id="about" class="col-md-7">                                     
                                        <div class="card">
                                            <div class="card-header">
                                                <h4>About</h4>
                                            </div>
                                            <div class="card-body">

                                                <p class="card-text">${data.description}</p>
                                                   </br>

                                                <h6>Active: ${data.active}</h6>
                                                <h6>First Flight: ${data.first_flight}  </h6>
                                                <h6>Cost Per Launch: $${data.cost_per_launch}  </h6>
                                                <progress max="100" value="${data.success_rate_pct}"><span>${data.success_rate_pct}</span></progress>

                                                </br>

                                                Wikipedia: <a href="${data.wikipedia}" target="_blank">${data.wikipedia}</a>
                                        
                                             

                                                
                                
                                            </div>
                                        </div>
                                        <div id="photos">
                                        </div>
                                    </div>
                                    <div id="rocketstats" class="col-md-5">
                                    </div>
                                </div`;

        photos = document.getElementById("photos");
        photos.innerHTML = `<div class="card">
                                            <div class="card-header">
                                                <h4>Photos</h4>
                                            </div>
                                                <div class="card-body">
                                                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                                        <ol id="data-slide" class="carousel-indicators">
                                                            
                                                        </ol>
                                                        <div id="flickr-images" class="carousel-inner">
                                                            
                                                            
                                                        </div>
                                                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                            <span class="sr-only">Previous</span>
                                                        </a>
                                                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                            <span class="sr-only">Next</span>
                                                        </a>
                                                    </div>
                                                </div>
                                        </div>`;


        data.flickr_images.forEach(item => {

            let a = data.flickr_images.indexOf(item);
            
            flickrImages = document.getElementById("flickr-images");
            indicators = document.getElementById("data-slide");
            
            photos = document.createElement("div");
            slide = document.createElement("li");

            photos.setAttribute("class", "carousel-item");
            slide.setAttribute("data-slide-to", a);
            slide.setAttribute("data-target","#carouselExampleIndicators");

            flickrImages.appendChild(photos);
            indicators.appendChild(slide);

            photos.innerHTML = `<img src="${item}" class="d-block w-100" alt="...">`;
            
            activePhoto = document.getElementsByTagName("div").item(16);
            activePhoto.setAttribute("class", "carousel-item active");

            activePhoto = document.getElementsByTagName("li").item(5);
            activePhoto.setAttribute("class", "active");

        })

        rocketStats = document.getElementById("rocketstats");
        rocketStats.innerHTML = `
                                            <div class="card">
                                                <div class="card-header">
                                                    <h4>Statistics</h4>
                                                </div>
                                            <div class="card-body">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Stages: ${data.stages}</li>
                                                    <li class="list-group-item">Boosters: ${data.boosters}</li>
                                                    <li class="list-group-item">Height: ${data.height.meters}m</li>
                                                    <li class="list-group-item">Diameter: ${data.diameter.meters}m</li>
                                                    <li class="list-group-item">Mass: ${data.mass.kg}kg</li>
                                                    <li class="list-group-item">Landing Legs: ${data.landing_legs.number}</li>
                                                    <li class="list-group-item">Payload:
                                                        <ul>
                                                            <li id="payload-name" class="list-item"></li>
                                                        </ul>
                                                    </li>
                                                    <li class="list-group-item">Engines:
                                                        <ul>
                                                            <li class="list-item">Type: ${data.engines.type}</li>
                                                            <li class="list-item">No. of Engines: ${data.engines.number}</li>
                                                            <li class="list-item">Engine Version: ${data.engines.version}</li>
                                                            <li class="list-item">Layout: ${data.engines.layout}</li>
                                                            <li class="list-item">Propellants:
                                                                <ul>
                                                                    <li class="list-item">1: ${data.engines.propellant_1}</li>
                                                                    <li class="list-item">2: ${data.engines.propellant_2}</li>
                                                                </ul>
                                                            </li>
                                                            <li class="list-item">Thrust at Sea Level: ${data.engines.thrust_sea_level.kN}kN</li>
                                                            <li class="list-item">Thrust Vaccum: ${data.engines.thrust_vacuum.kN}kN</li>
                                                        </ul>
                                                    </li>
                                                    <li class="list-group-item">First Stage:
                                                        <ul>
                                                            <li class="list-item">No. of Engines: ${data.first_stage.engines}</li>
                                                            <li class="list-item">Resuable: ${data.first_stage.reusable}</li>
                                                            <li class="list-item">Fuel Amount: ${data.first_stage.fuel_amount_tons}t</li>
                                                            <li class="list-item">Burn Time: ${data.first_stage.burn_time_sec}secs</li>
                                                        </ul>
                                                    </li>
                                                    <li class="list-group-item">Second Stage:
                                                        <ul>
                                                            <li class="list-item">No. of Engines: ${data.second_stage.engines}</li>
                                                            <li class="list-item">Resuable: ${data.second_stage.reusable}</li>
                                                            <li class="list-item">Fuel Amount: ${data.second_stage.fuel_amount_tons}t</li>
                                                            <li class="list-item">Burn Time: ${data.second_stage.burn_time_sec}secs</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
        data.payload_weights.forEach(item => {

            payloadName = document.getElementById("payload-name");
            listitem = document.createElement("li")
            payloadName.appendChild(listitem);

            listitem.innerHTML = `${item.name} - ${item.kg}kg`

        })
    })

}
