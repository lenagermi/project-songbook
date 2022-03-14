/* eslint-env browser */

//Theme der Website kann geändert werden
function changeTheme(){
    let themeInput = document.querySelector("#theme-input");
    document.body.setAttribute("data-theme", themeInput.value);
}
export {changeTheme};