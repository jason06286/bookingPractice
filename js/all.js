const token='41gSRV92b2mpXiDBb7ulDKRpk4KUE9bChnnIKgMPExVhza4ovF7ubibWvPB5'
const url='https://challenge.thef2e.com/api/thef2e2019/stage6/'
const mouseChange=document.querySelector('.mouseChange')
const mouse=document.querySelectorAll('.mouse')
const roomData=[]
const singleRoomData=[]
getData()
navBar()
mouseOver()

function getData(params) {
	let path=window.location.pathname
	if(path!='/room.html'){
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		axios.get(`${url}rooms`)
		.then(
			function (res) {
				let data=res.data.items
				roomData.push(...data)
				console.log(roomData)
				indexrender()
				swiper()
			}
		).catch(function (err) {
			console.log(err)
		})
	}else if(path.match('/room.html')){
			getRoomData()
			let id= window.location.search.split('?').pop()
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
			axios.get(`${url}room/${id}`)
			.then(function (res) {
				console.log(res)
				let data=res.data.room
				singleRoomData.push(...data)
				console.log(singleRoomData)
				roomRender()
			}).catch(function (err) { console.log(err) })
	}
}
function getRoomData(params) {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		axios.get(`${url}rooms`)
		.then(
			function (res) {
				let data=res.data.items
				roomData.push(...data)
				console.log(roomData)
			}
		).catch(function (err) {
			console.log(err)
		})
}
// navBar 滾動
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
//swipper
function swiper(params) {
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 3,
		spaceBetween: 30,
		freeMode: true,
	});
}

// mouse over
mouseOver()
function mouseOver(params) {
	mouse.forEach((item,index)=>{
		console.log(item,index)
	})
}

// render

function indexrender(params) {
	const roomName=document.querySelectorAll('.roomName')
	const roomSwiper=document.querySelector('.roomSwiper')
	roomData.forEach(function (item) {
	let dropStr=`<a class="dropdown-item " href="room.html?${item.id}">${item.name}</a>`
	let swiperStr=`<div class="swiper-slide">
	<a href="room.html?${item.id}" class="d-block w-100  text-decoration-none">
		<div class="card">
			<div class="card-header bg-cover" style="height: 240px;background-image: url(${item.imageUrl});"></div>    
			<div class="card-body text-right">
				<h4>${item.name}</h4>
				<p class="mb-0">$${item.normalDayPrice} NTD / night</p>
			</div>
		</div>
	</a>
	</div>`
	roomName[0].innerHTML+=dropStr
	roomName[1].innerHTML+=dropStr
	roomSwiper.innerHTML+=swiperStr
	})
	roomData.forEach(function (item) {
		const single=document.querySelector('.single')
		const double=document.querySelector('.double')
		const twin=document.querySelector('.twin')
		if(item.name.match('Single')){
			let str=`<div class="col-4">
			<a href="room.html?${item.id}" class="d-block w-100  text-decoration-none">
				<div class="card">
					<div class="card-header bg-cover" style="height: 240px;background-image: url(${item.imageUrl});"></div>    
					<div class="card-body text-right">
						<h4>${item.name}</h4>
						<p class="mb-0">$${item.normalDayPrice} NTD / night</p>
					</div>
				</div>
			</a>
		</div>`
		single.innerHTML+=str
		}else if(item.name.match('Double')){
			let str=`<div class="col-4">
			<a href="room.html?${item.id}" class="d-block w-100  text-decoration-none">
				<div class="card">
					<div class="card-header bg-cover" style="height: 240px;background-image: url(${item.imageUrl});"></div>    
					<div class="card-body text-right">
						<h4>${item.name}</h4>
						<p class="mb-0">$${item.normalDayPrice} NTD / night</p>
					</div>
				</div>
			</a>
		</div>`
		double.innerHTML+=str
		}else if(item.name.match('Twin')){
			let str=`<div class="col-4">
			<a href="room.html?${item.id}" class="d-block w-100  text-decoration-none">
				<div class="card">
					<div class="card-header bg-cover" style="height: 240px;background-image: url(${item.imageUrl});"></div>    
					<div class="card-body text-right">
						<h4>${item.name}</h4>
						<p class="mb-0">$${item.normalDayPrice} NTD / night</p>
					</div>
				</div>
			</a>
		</div>`
		twin.innerHTML+=str
		}
	})
	
}

function roomRender(param) {
	const roomName=document.querySelector('.roomName')
	const bannerPic=document.querySelector('.bannerPic')
	const bannerText=document.querySelector('.bannerText')
	const singleText=document.querySelector('.singleText')
	singleRoomData.forEach(function (item) {
		let picStr=`<div class="bg-cover mouseChange" style="height: 480px;background-image: url(${item.imageUrl[0]});">
		<h1 class="title text-secondary m-0 bg-white py-2">${item.name}</h1>
		</div>
		<ul class="list-unstyled d-flex mt-3">
			<li class=" mr-3 w-25 bg-cover mouse"style="height: 94px;background-image: url(${item.imageUrl[0]});" ></li>
			<li class=" mr-3 w-25 bg-cover mouse"style="height: 94px;background-image: url(${item.imageUrl[1]});" ></li>
			<li class=" mr-3 w-25 bg-cover mouse"style="height: 94px;background-image: url(${item.imageUrl[2]});" ></li>
		</ul>`

		let textStr=`<h3 class="text-secondary">$${item.normalDayPrice} NTD / night</h3>
		<p>holiday price - $${item.holidayPrice} NTD / night</p>`

		let singleStr=`<p >${item.descriptionShort.GuestMax} Guest・${item.descriptionShort.GuestMin} Bed (${item.descriptionShort.Bed[0]})・${item.descriptionShort["Private-Bath"]} Private Bath・${item.descriptionShort.Footage} m²</p>
		<p class="my-4 w-50">${item.description}</p>
		<ul class="list-unstyled">
			<li>Check-in is from ${item.checkInAndOut.checkInEarly} to ${item.checkInAndOut.checkInLate} </li>
			<li>Check-out is before ${item.checkInAndOut.checkOut}</li>
		</ul>`
		bannerPic.innerHTML+=picStr
		bannerText.innerHTML+=textStr
		singleText.innerHTML+=singleStr
		offerService()
		roomData.forEach(function (item) {
			let dropStr=`<a class="dropdown-item " href="room.html?${item.id}">${item.name}</a>`
			roomName.innerHTML+=dropStr
		})
	})
	
}

function offerService(){
    let offer=document.querySelectorAll('.offer')
    let offerList = document.querySelectorAll(".offer p")
	let service = singleRoomData[0].amenities;
    offerList.forEach((item, index) => {
        if(service[item.textContent] == true){
            offer[index].classList.add("active");
        }else{
            offer[index].classList.remove("active");
        }
    });
};
