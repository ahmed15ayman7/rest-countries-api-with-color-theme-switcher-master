let name_page = document.querySelector(".name-page"),
  where = document.querySelector(".where"),
  dark = document.querySelector(".dark"),
  darkMode = document.querySelector('.dark [type="checkbox"]'),
  moon = document.querySelector(".dark .moon"),
  home = document.querySelector(".home"),
  Search = document.querySelector(".Search"),
  inpSearch = document.querySelector(".Search input"),
  dropdown = document.querySelector(".dropdown"),
  dropdown_item = document.querySelectorAll(".dropdown-item"),
  dropdown_toggle = document.querySelector(".dropdown-toggle"),
  all_countrys = document.querySelector(".countrys"),
  country_detail = document.querySelector(".country-detail");

console.log(all_countrys);

//!fun parse api
//?fun parse api
//!fun parse api
let data = async () => {
  try {
    let alldata = await fetch("../data.json");
    let jsondata = await alldata.json();
    window.onload = () => {
      jsondata.forEach((opj) => {
        create_country(opj);
      });
      queryCountries(jsondata);
    };
    darkMode.addEventListener("change", (e) => {
      document.body.classList.toggle("dark-mode");
      e.preventDefault();
    });
    //!fun search
    //?fun search
    //!fun search
    inpSearch.addEventListener("input", (pr) => {
      all_countrys.innerHTML = "";
      jsondata.forEach((opj) => {
        if (inpSearch.value.trim() == "") {
          create_country(opj);
          dropdown_toggle.textContent = "Filter by Region";
          name_page.textContent="Frontend Mentor | Rest-countries-api-with-color-theme-switcher-master"
        } else {
          name_page.textContent = '🔍Search: '+inpSearch.value[0].toUpperCase().concat(inpSearch.value.slice(1))
          if (
            inpSearch.value == opj.name.slice(0, inpSearch.value.length) ||
            inpSearch.value[0].toUpperCase().concat(inpSearch.value.slice(1)) ==
              opj.name.slice(0, inpSearch.value.length)
          ) {

            create_country(opj);
          }
        }
      });
      queryCountries(jsondata);
      pr.preventDefault();
    });
    //!fun filter of resion
    //?fun filter of resion
    //!fun filter of resion
    dropdown_item.forEach((e) => {
      e.addEventListener("click", (pr) => {
        name_page.textContent='🌍'+e.textContent
        dropdown_toggle.textContent = e.textContent;
        all_countrys.innerHTML = "";
        jsondata.forEach((opj) => {
          if (opj.region == e.textContent) {
            create_country(opj);
          }
        });
        queryCountries(jsondata);
        pr.preventDefault();
      });
    });
  } catch (e) {
    alert(e);
  }
};
//!fun get data countries to create country detail
//?fun get data countries create country detail
//!fun get data countries create country detail
let create_details = (e, data) => {
  country_detail.classList.remove("d-none");
  all_countrys.classList.add("d-none");
  home.children[0].classList.add("d-none");

  let divs_border = [];
  data.forEach((opj, index) => {
    if (e.children[1].children[0].textContent.trim() == opj.name) {
      let indexCountry =
        e.children[1].children[0].textContent.trim() == opj.name ? index : 0;
      data.forEach((op) => {
        if (Object.keys(opj).includes("borders")) {
          for (let i = 0; i < data[indexCountry].borders.length; i++) {
            if (op.alpha3Code == data[indexCountry].borders[i]) {
              let div_border = `<div class='ms-2 mb-1 btn-back back w-auto p-2'>${op.name}</div>`;
              divs_border.push(div_border);
              console.log(opj.name);
            }
          }
        }
      });
      create_country_detail(opj, divs_border);
    }
  });
  //!button ⬅️ back
  //?button ⬅️ back
  //!button ⬅️ back
  let btn_back = document.querySelector(".go-back");
  let bord = document.querySelector(".b-c");
  btn_back.addEventListener("click", (pr) => {
    name_page.textContent='Frontend Mentor | Rest-countries-api-with-color-theme-switcher-master'
    country_detail.innerHTML = "";
    console.log(divs_border);
    bord.innerHTML = "";
    console.log(bord);

    divs_border = [];
    console.log(divs_border);
    country_detail.classList.add("d-none");
    all_countrys.classList.remove("d-none");
    home.children[0].classList.remove("d-none");
    pr.preventDefault();
  });
};
//!fun get countries after created
//?fun get countries after created
//!fun get countries after created
let queryCountries = (jsondata) => {
  let country_div = document.querySelectorAll(".country");
  country_div.forEach((e) =>
    e.addEventListener("click", (pr) => {
      create_details(e, jsondata);
      pr.preventDefault();
    })
  );
};
//!create new country
//?create new country
//!create new country
let create_country = (opj) => {
  let country = document.createElement("div");
  country.classList = "card country back col-lg-2 col-md-5 col-11 ms-lg-5 mb-5";
  country.innerHTML = `
            <img
            src="${opj.flags.png}"
            class="card-img-top img-fluid h-50"
            alt="..." />
            <div class="card-body">
            <h5 class="card-title">${" " + opj.name}</h5>
            <span class="d-flex">
            <h6>Population:</h6>
            <p class="card-text">${" " + opj.population}</p>
            </span>
            <span class="d-flex">
    <h6>Region:</h6>
    <p class="card-text">${" " + opj.region}</p>
    </span>
    <span class="d-flex">
    <h6>Capital:</h6>
    <p class="card-text">${" " + opj.capital}</p>
    </span>
    
    </div>`;
  all_countrys.appendChild(country);
};

//!create new country detail
//?create new country detail
//!create new country detail
let create_country_detail = (opj, divs_border) => {
  name_page.textContent=opj.name+' 🌍➡️ '+opj.region;
  country_detail.innerHTML = `<div class="row m-lg-5 ms-md-3 m-1 mt-4 mb-4">
  <div class="ms-lg-5 ms-md-3">
    <div class="btn-back back go-back text-center p-2">
      <i class="fa-solid fa-arrow-left"></i> Back
    </div>
  </div>
</div>
<div class="col-lg-5 col-md-5 col-12 img mb-5">
  <img src="${opj.flags.png}" alt="" class="img-fluid" />
</div>
<div class="col-lg-6 col-md-6 col-11 detail dark">
  <div class="det-row-1">
    <h3>${" " + opj.name}</h3>
    <div class="column-2">
      <span class="d-flex ">
        <h6>Native Name:</h6>
        <p class="ms-1">${" " + opj.nativeName}</p>
      </span>
      <span class="d-flex">
        <h6>Population:</h6>
        <p class="ms-1">${" " + opj.population}</p>
      </span>
      <span class="d-flex">
        <h6>Region:</h6>
        <p class="ms-1">${" " + opj.region}</p>
      </span>
      <span class="d-flex ">
        <h6>Sub Region:</h6>
        <p class="ms-1">${" " + opj.subregion}</p>
      </span>
      <span class="d-flex">
        <h6>Capital:</h6>
        <p>${" " + opj.capital}</p>
      </span>
    </div>
    <div class="column-2">
      <span class="d-flex">
        <h6>Top Level Domain:</h6>
        <p class="ms-1">${" " + opj.topLevelDomain}</p>
      </span>
      <span class="d-flex">
        <h6>Currencies:</h6>
        <p class="ms-1">${" " + opj.currencies.map((e) => e.name).join(",")}</p>
      </span>
      <span class="d-flex">
        <h6>Languages:</h6>
        <p class="ms-1">${"  " + opj.languages.map((e) => e.name).join(",")}</p>
      </span>
    </div>
  </div>
  <div class="det-row-2 text-center">
    <h5 class="me-2 mb-3">Border Countries:</h5>
    <div class="b-c">

      ${divs_border.join(" ")}
    </div>
  </div>
</div>`;
};
data();
