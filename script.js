function advFuncToggler(){
    let hiddenFunc = document.querySelectorAll('.visually-hidden');
    let visFunc = document.querySelectorAll('.visible')
    for(let i = 0; i<hiddenFunc.length; i++){
        hiddenFunc[i].classList.remove("visually-hidden");
        hiddenFunc[i].classList.add('visible') 
        visFunc[i].classList.add('visually-hidden')
        visFunc[i].classList.remove('visible')
    }
}