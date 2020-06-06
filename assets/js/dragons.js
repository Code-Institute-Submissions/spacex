// Variables
const dragonData = document.getElementById("data");

callDragons();

// calls spacex dragons api

function eachDragon() {

    $("#data").addClass("container");

    dragons.forEach(item => {
        $("#loader").addClass("hide-loader");

        let info = document.createElement("div");
        let cardHead = document.createElement("div");
        let cardBody = document.createElement("div");
        let row = document.createElement("div");
        let column1 = document.createElement("div");
        let column2 = document.createElement("div");
        let cardInfo1 = document.createElement("h5");
        let cardInfo2 = document.createElement("h6");
        let cardInfo3 = document.createElement("h6");
        let wiki = document.createElement("a");
        let button = document.createElement("button");
        let image = document.createElement("img");

        info.setAttribute("class", "card");
        cardHead.setAttribute("class", "card-header");
        cardBody.setAttribute("class", "card-body");
        row.setAttribute("class", "row");
        column1.setAttribute("class", "col-md-6");
        column2.setAttribute("class", "col-md-6 text-center");
        cardInfo1.setAttribute("class", "card-title");
        cardInfo2.setAttribute("class", "card-title");
        cardInfo3.setAttribute("class", "card-text");
        wiki.setAttribute("href", item.wikipedia);
        wiki.setAttribute("target", "_blank");
        button.setAttribute("onclick", "getValue(value)");
        button.setAttribute("value", `dragons/${item.id}`)
        button.setAttribute("class", "more btn btn-primary");
        image.setAttribute("class", "rocket-image");
        image.setAttribute("src", item.flickr_images[2]);
        image.setAttribute("alt", "dragon-image");

        dragonData.appendChild(info);
        info.appendChild(cardHead);
        info.appendChild(cardBody);
        cardBody.appendChild(row);
        row.appendChild(column1);
        row.appendChild(column2);
        column1.appendChild(cardInfo1);
        column1.appendChild(cardInfo2);
        column1.appendChild(cardInfo3);
        column1.appendChild(wiki);
        column1.appendChild(button);
        column2.appendChild(image);

        cardHead.innerHTML = `<h3>${item.name}</h3>`;
        cardInfo1.innerText = `Type: ${item.type} - Active: ${item.active}`;
        cardInfo2.innerText = `First Flight: ${item.first_flight}`;
        cardInfo3.innerText = item.description;
        wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;
        button.innerText = "More";
    });
}

function dragonSpec() {
   
    $("#loader").addClass("hide-loader");
    
    let aboutDragon = document.createElement("div");
    let row = document.createElement("div");
    let column1 = document.createElement("div");
    let column2 = document.createElement("div");
    let card = document.createElement("div");
    let card2 = document.createElement("div");
    let cardHeader = document.createElement("div");
    let cardHeader2 = document.createElement("div");
    let cardBody = document.createElement("div");
    let cardBody2 = document.createElement("div");
    let cardText = document.createElement("p");
    let active = document.createElement("h6");
    let type = document.createElement("h6");
    let crewCapacity = document.createElement("h6");
    let orbit = document.createElement("h6");
    let wiki = document.createElement("a");
    let photos = document.createElement("div");
    let carousel = document.createElement("div");
    let flickr = document.createElement("div");
    let prev = document.createElement("a");
    let next = document.createElement("a");

    aboutDragon.setAttribute("class", "about-rockets");
    row.setAttribute("class", "row no-gutters");
    column1.setAttribute("class", "col-md-7");
    column2.setAttribute("class", "col-md-5");
    column2.setAttribute("id", "rocketstats");
    card.setAttribute("class", "card");
    card2.setAttribute("class", "card")
    cardHeader.setAttribute("class", "card-header");
    cardHeader2.setAttribute("class", "card-header");
    cardBody.setAttribute("class", "card-body");
    cardBody2.setAttribute("class", "card-body");
    cardText.setAttribute("class", "card-text");
    wiki.setAttribute("href", specificDragon.wikipedia);
    wiki.setAttribute("target", "_blank");
    photos.setAttribute("id", "photos");
    carousel.setAttribute("id", "carouselExampleIndicators");
    carousel.setAttribute("class", "carousel slide");
    carousel.setAttribute("data-ride", "carousel");
    flickr.setAttribute("id", "flickr-images");
    flickr.setAttribute("class", "carousel-inner");
    prev.setAttribute("class", "carousel-control-prev");
    prev.setAttribute("href", "#carouselExampleIndicators");
    prev.setAttribute("role", "button");
    prev.setAttribute("data-slide", "prev");
    next.setAttribute("class", "carousel-control-next");
    next.setAttribute("href", "#carouselExampleIndicators");
    next.setAttribute("role", "button");
    next.setAttribute("data-slide", "next");

    dragonData.innerHTML = `<h1 class="title">${specificDragon.name}</h1>`;

    dragonData.appendChild(aboutDragon);
    aboutDragon.appendChild(row);
    row.appendChild(column1);
    row.appendChild(column2);
    column1.appendChild(card);
    card.appendChild(cardHeader);
    cardHeader.innerHTML = `<h4>About</h4>`;

    card.appendChild(cardBody);
    cardBody.appendChild(cardText);
    cardText.innerHTML = `<p class="card-text">${specificDragon.description}</p>`;

    cardBody.appendChild(active);
    active.innerText = `Active: ${specificDragon.active}`;

    cardBody.appendChild(type);
    type.innerText = `Type: ${specificDragon.type}`;


    cardBody.appendChild(crewCapacity);
    crewCapacity.innerText = `Crew Capacity: ${specificDragon.crew_capacity}`;

    cardBody.appendChild(orbit);
    orbit.innerText = `Orbit Duration: ${specificDragon.orbit_duration_yr} Yrs`;

    cardBody.appendChild(wiki);
    wiki.innerHTML = `<i class="fab fa-wikipedia-w"></i>`;

    column1.appendChild(photos);
    photos.appendChild(card2);
    card2.appendChild(cardHeader2);
    cardHeader2.innerHTML = `<h4>Photos</h4>`;

    card2.appendChild(cardBody2);
    cardBody2.appendChild(carousel);
    carousel.innerHTML = `<ol id="data-slide" class="carousel-indicators"></ol>`;

    carousel.appendChild(flickr);

    flickr.appendChild(prev);
    prev.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>`
    flickr.appendChild(next);
    next.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
                           <span class="sr-only">Next</span>`;


    specificDragon.flickr_images.forEach(item => {

        let a = specificDragon.flickr_images.indexOf(item);

        let flickrImages = document.getElementById("flickr-images");
        let indicators = document.getElementById("data-slide");

        photos = document.createElement("div");
        let slide = document.createElement("li");

        photos.setAttribute("class", "carousel-item");
        slide.setAttribute("data-slide-to", a);
        slide.setAttribute("data-target", "#carouselExampleIndicators");

        flickrImages.appendChild(photos);
        indicators.appendChild(slide);

        photos.innerHTML = `<img src="${item}" class="d-block w-100" alt="...">`;

        let activeItem = document.getElementsByTagName("div").item(16);
        activeItem.setAttribute("class", "carousel-item active");

        let activePhoto = document.getElementsByTagName("li").item(7);
        activePhoto.setAttribute("class", "active");

    });

    let rocketStats = document.getElementById("rocketstats");
    rocketStats.innerHTML = `
                                            <div class="card">
                                                <div class="card-header">
                                                    <h4>Statistics</h4>
                                                </div>
                                            <div class="card-body">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Diameter: ${specificDragon.diameter.meters}m</li>
                                                    <li class="list-group-item">Height With Trunk: ${specificDragon.height_w_trunk.meters}m</li>
                                                    <li class="list-group-item">Trunk Volume: ${specificDragon.trunk.trunk_volume.cubic_meters}&#13221;</li>
                                                    <li class="list-group-item">Dry Mass: ${specificDragon.dry_mass_kg}kg</li>
                                                    <li class="list-group-item">Launch Payload:
                                                        <ul>
                                                            <li class="list-item">Mass: ${specificDragon.launch_payload_mass.kg}kg</li>
                                                            <li class="list-item">Volume: ${specificDragon.launch_payload_vol.cubic_meters}&#13221;</li>
                                                        </ul> 
                                                    </li>
                                                    <li class="list-group-item">Return Payload: 
                                                        <ul>
                                                            <li class="list-item">Mass: ${specificDragon.return_payload_mass.kg}kg</li>
                                                            <li class="list-item">Volume: ${specificDragon.return_payload_vol.cubic_meters}&#13221;</li>
                                                        </ul>
                                                    </li>
                                                    <li class="list-group-item">Pressurized Capsule Payload Volume: ${specificDragon.pressurized_capsule.payload_volume.cubic_meters}&#13221;</li>
                                                    <li class="list-group-item">Solar Arrays: ${specificDragon.trunk.cargo.solar_array}</li>
                                                    <li class="list-group-item">Sidewall Angle: ${data.sidewall_angle_deg}&deg;</li>
                                                    <li class="list-group-item">Heat Shield:
                                                        <ul>
                                                            <li class="list-item">Development Partner: ${specificDragon.heat_shield.dev_partner}</li>
                                                            <li class="list-item">Material: ${specificDragon.heat_shield.material}</li>
                                                            <li class="list-item">Size: ${specificDragon.heat_shield.size_meters}m</li>
                                                            <li class="list-item">Temperature: ${specificDragon.heat_shield.temp_degrees}&deg;</li>
                                                        </ul>
                                                    </li>
                                                    <li id="thrusters" class="list-group-item">Thrusters:
                                                        
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
    specificDragon.thrusters.forEach(item => {

        let payloadName = document.getElementById("thrusters");
        let listitem = document.createElement("ul");
        payloadName.appendChild(listitem);

        listitem.innerHTML = `<li class="list-item">${item.type}:
                                    <ul>
                                        <li class="list-item">${item.thrust.kN}kN Thrust</li>
                                        <li class="list-item">${item.amount} Thrusters</li>
                                        <li class="list-item">${item.pods} Pods</li>
                                        <li class="list-item">Fuel: 
                                            <ul>
                                                <li class="list-item">${item.fuel_1}</li>
                                                <li class="list-item">${item.fuel_2}</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                    `;

    });



}


