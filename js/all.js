function navBar (){
    let nav=document.querySelector('nav')
	document.addEventListener('scroll', ()=>{
		if (document.body.scrollTop > 100 || 
			document.documentElement.scrollTop > 100) {
			nav.style.top = 0
		} else {
			nav.style.top = '-72px'
		}
	})
}
navBar()