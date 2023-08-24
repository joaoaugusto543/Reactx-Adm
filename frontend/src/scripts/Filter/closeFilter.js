function closeFilter(){
    const filter=document.querySelector('.filter')
    const buttonOpenFilter=document.querySelector('.buttonOpenFilter')
    const buttonCloseFilter=document.querySelector('.buttonCloseFilter')

    buttonOpenFilter.style='display:block;'
    buttonCloseFilter.style='display:none'

    filter.style='transform: translateX(110%);'
}

export default closeFilter