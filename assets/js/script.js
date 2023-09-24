//getting all required elements fitst time it apperas in the html with querySelector

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");

//If start quiz button is clicked

start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
};