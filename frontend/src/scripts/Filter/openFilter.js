function openFilter(){
    const filter=document.querySelector('.filter')
    const buttonOpenFilter=document.querySelector('.buttonOpenFilter')
    const buttonCloseFilter=document.querySelector('.buttonCloseFilter')

    buttonOpenFilter.style='display:none;'
    buttonCloseFilter.style='display:block'

    filter.style='transform: translateX(0%);'
}

export default openFilter