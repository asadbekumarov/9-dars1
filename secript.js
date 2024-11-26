
let Elcard = document.querySelector(".card"); 
let Elinput = document.querySelector("input"); 
let Eldark = document.querySelector(".dark"); 
let Elsvg = document.querySelector("svg");
let Elmode = document.querySelector(".mode");
let Eltitle = document.querySelector(".title");
let dropdownMenu = document.querySelector(".dropdown-menu"); 
let dataCache = [];


Eldark.addEventListener("click", function () {
  document.body.classList.toggle("light");
  Elcard.classList.toggle("light");
  Eltitle.classList.toggle("light");
  Elmode.classList.toggle("light");
  Elsvg.style.fill = document.body.classList.contains("light") ? "#000" : "#fff";
});


async function GetData(url) {
  try {
    let res = await fetch(url);
    if (!res.ok) {
      console.error("API bilan bog‘liq muammo:", res.statusText);
      return;
    }
    let data = await res.json();
    dataCache = data; 
    RenderData(data);
  } catch (err) {
    console.error("Xatolik yuz berdi:", err);
  }
}

function RenderData(data) {
  Elcard.innerHTML = ""; 
  if (data.length === 0) {
 
    Elcard.innerHTML = "<p>Hech narsa topilmadi!</p>";
    return;
  }
  data.forEach((item) => {
    let countryCard = document.createElement("div");
    countryCard.classList.add("country-card", "p-3", "mb-3", "shadow");

    
    let Newimg = document.createElement("img");
    Newimg.src = item.flags.png;
    Newimg.alt = `${item.name.common} flag`;
    Newimg.style.width = "100%";
    Newimg.style.height = "auto";
    Newimg.classList.add("mb-3");

    let NewpName = document.createElement("p");
    NewpName.innerHTML = `<strong>Name:</strong> ${item.name.common}`;
    NewpName.classList.add("mb-1");

    let NewpPopulation = document.createElement("p");
    NewpPopulation.innerHTML = `<strong>Population:</strong> ${item.population.toLocaleString()}`;
    NewpPopulation.classList.add("mb-1");

   
    let NewpRegion = document.createElement("p");
    NewpRegion.innerHTML = `<strong>Region:</strong> ${item.region}`;
    NewpRegion.classList.add("mb-1");

   
    let NewpCapital = document.createElement("p");
    NewpCapital.innerHTML = `<strong>Capital:</strong> ${item.capital}`;
    NewpCapital.classList.add("mb-1");

   
    countryCard.appendChild(Newimg);
    countryCard.appendChild(NewpName);
    countryCard.appendChild(NewpPopulation);
    countryCard.appendChild(NewpRegion);
    countryCard.appendChild(NewpCapital);
    Elcard.appendChild(countryCard);
  });
}


dropdownMenu.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    let selectedRegion = e.target.textContent.trim(); 
    let filteredData =
      selectedRegion === "All"
        ? dataCache
        : dataCache.filter((country) => country.region === selectedRegion);
    RenderData(filteredData);
  }
});


Elinput.addEventListener("input", function () {
  let searchValue = Elinput.value.toLowerCase(); 
  let filteredData = dataCache.filter((country) =>
    country.name.common.toLowerCase().includes(searchValue)
  )
  RenderData(filteredData); 
});

GetData(
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
);







function CreateRegionDropdown() {
  let filterWrapper = document.createElement("div");
  filterWrapper.classList.add("filter-wrapper", "mb-3");

  let regionLabel = document.createElement("label");
  regionLabel.textContent = "Filter by Region:";
  regionLabel.classList.add("form-label", "me-2");

  let regionDropdown = document.createElement("select");
  regionDropdown.classList.add("form-select");
  regionDropdown.id = "regionDropdown";

  let regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
  regions.forEach((region) => {
    let option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionDropdown.appendChild(option);
  });

  filterWrapper.appendChild(regionLabel);
  filterWrapper.appendChild(regionDropdown);

  document.body.insertBefore(filterWrapper, Elcard); 

  regionDropdown.addEventListener("change", function () {
    let selectedRegion = this.value;
    let filteredData =
      selectedRegion === "All"
        ? dataCache
        : dataCache.filter((country) => country.region === selectedRegion);
    RenderData(filteredData);
  });
}


async function GetData(url) {
  try {
    let res = await fetch(url);
    if (!res.ok) {
      console.error("API bilan bog‘liq muammo:", res.statusText);
      return;
    }
    let data = await res.json();
    dataCache = data;
    RenderData(data);
  } catch (err) {
    console.error("Xatolik yuz berdi:", err);
  }
}


Elinput.addEventListener("input", function () {
  let searchValue = Elinput.value.toLowerCase();
  let filteredData = dataCache.filter((country) =>
    country.name.common.toLowerCase().includes(searchValue)
  );
  RenderData(filteredData);
});


CreateRegionDropdown();
GetData(
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
);
