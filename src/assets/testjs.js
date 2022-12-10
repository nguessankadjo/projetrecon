let fa_angle_down = document.querySelectorAll(".fa-angle-down");
for (let index = 0; index < fa_angle_down.length; index++) {
    fa_angle_down[index].addEventListener("click", (e) => {
        let element = e.target.parentElement.parentElement;
        element.classList.toggle("showMenu")
        console.log(element)

    });
}
let sidebar = document.querySelector(".sidebar");
const fa_barsBTN = document.querySelector(".fa-bars");
console.log('okk', fa_barsBTN, sidebar)
fa_barsBTN.addEventListener("click", () => {
    sidebar.classList.toggle("close")
});


let myStr = null;

if (myStr.trim().length === 0) {
    console.log("This is an empty string!========");
}