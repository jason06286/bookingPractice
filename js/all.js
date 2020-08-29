const token='41gSRV92b2mpXiDBb7ulDKRpk4KUE9bChnnIKgMPExVhza4ovF7ubibWvPB5'
const url='https://challenge.thef2e.com/api/thef2e2019/stage6/'
const mouseChange=document.querySelector('.mouseChange')
const mouse=document.querySelectorAll('.mouse')
const reserve=document.querySelector('.reserve')
const finalReserve=document.querySelector('.finalReserve')
const roomData=[]
const singleRoomData=[]
let booking = {
	name: "",
	phone: "",
	startDate: "",
	endDate: "",
	dates: [],
	nights: 0,
	room:""
}

getData()
navBar()
mouseOver()


function getData(params) {
	let path=window.location.pathname
	if(path.match('/index.html')){
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
	}else if(path.match('/reserve.html')){
		let id= window.location.search.split('?').pop()
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
			axios.get(`${url}room/${id}`)
			.then(function (res) {
				console.log(res)
				let data=res.data.room
				singleRoomData.push(...data)
				console.log(singleRoomData)
		        booking.room=singleRoomData[0].name
				finalreserve()
				finalReserve.addEventListener('click',final)
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
	const reserveRoom=document.querySelector('.reserveRoom')
	roomData.forEach(function (item) {
		let dropStr=`<a class="dropdown-item " href="room.html?${item.id}">${item.name}</a>`
		roomName.innerHTML+=dropStr
	})
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
		reserveRoom.setAttribute('href',`reserve.html?${item.id}`)
		offerService()
		
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


// date



let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
$('.date').daterangepicker({
    
    "locale": {
        "format": "MM/DD/YYYY",
        "separator": " - ",
        "applyLabel": "Apply",
        "cancelLabel": "Cancel",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "weekLabel": "W",
        "daysOfWeek": [
            "Su",
            "Mo",
            "Tu",
            "We",
            "Th",
            "Fr",
            "Sa"
        ],
        "monthNames": [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        "firstDay": 0
    },
    "alwaysShowCalendars": true,
    "startDate": today,
    "endDate": "12/31/2020"
}, function(start, end, label) {
console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
getDatesBetween(start,end)
});
    const getDatesBetween = (startDate, endDate) => {
        let reserveDayData=[]
        let result=[]
        let currentDate = startDate
        let holiday=0
        let weekday=0
        console.log(startDate,endDate)
        while(currentDate < endDate){ //dont count the last day (checkout day)
            reserveDayData.push(new Date(currentDate))
            result.push(new Date(currentDate+ 8 * 3600 * 1000).toISOString().split("T")[0])
            currentDate = moment(currentDate).add(1, 'days');
        }
        console.log(reserveDayData)
		console.log(result)
		reserveDayData.pop()
        reserveDayData.forEach(function (item) {
            if(item.getDay()===0 ||item.getDay()===6){
                    return holiday+=1
            }else{
                    return weekday+=1
            }
		})
		booking.dates=result 
		booking.nights=holiday+weekday
		booking.startDate=result[0]
		booking.endDate=result[result.length-1]
        console.log(holiday)  
		console.log(weekday)
		total(weekday,holiday)
		
	}
	function total(weekday,holiday) {
		console.log(weekday)
		console.log(holiday)
		const total =document.querySelector('.total')
		let weekPrice=singleRoomData[0].normalDayPrice*weekday
		let holidayPrice=singleRoomData[0].holidayPrice*holiday
		let charge=Math.round((weekPrice+holidayPrice)*0.1) 
		let all=weekPrice+holidayPrice+charge
		let str=`<div class="card">
		<div class="card-body">
			<div class="d-flex justify-content-between  ">
				<span>平日：${singleRoomData[0].normalDayPrice}元 × ${weekday} night</span>
				<span>$${weekPrice}</span>
			</div>
			<div class="d-flex justify-content-between  ">
				<span>假日：${singleRoomData[0].holidayPrice}元 × ${holiday} night</span>
				<span>$${holidayPrice}</span>
			</div>
			<div class="d-flex justify-content-between  ">
				<span >Service Fee</span>
				<span >$${charge}</span>
			</div>
		</div>
		<div class="card-footer">
			<div class="d-flex justify-content-between">
				<span class="h4">TOTAL</span>
				<span class="h4">$${all}</span>
			</div>
		</div>
	</div>`
	total.innerHTML=str
	}

	function finalreserve(params) {
		const checkRoom=document.querySelector('.checkRoom')
		let str=`<div class="card">
		<div class="card-img-top" >
		<img src="${singleRoomData[0].imageUrl[0]}" alt="" style="height: 204px;" class="w-100">
		</div>
		<div class="card-header">
			<h5 class="text-secondary text-center">${singleRoomData[0].name}</h5>
		</div>
	</div>`
	checkRoom.innerHTML=str
	}

    function final(params) {
		const name=document.querySelector('#account').value
		const phone=document.querySelector('#phone').value
		const reservationInfo ={}
		let postUrl='https://challenge.thef2e.com/api/thef2e2019/stage6/room/'
		if (name === ''||phone===''|| booking.dates.length===0){
			alert('資料未填寫完全')
		}else if(name !== ''&&phone!==''&& booking.dates.length>0){
			booking.name=name
			booking.phone=phone
			reservationInfo.name=booking.name
			reservationInfo.tel=booking.phone
			reservationInfo.date=booking.dates
		}
		console.log(reservationInfo)
		console.log(JSON.stringify(reservationInfo))
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		axios.post(`${postUrl}${singleRoomData[0].id}`,reservationInfo)
		.then(function (res) {
			console.log(res)	
			successful(booking)
			console.log(booking)
			
		})
		.catch(err=>console.log(err	))
	}
	
	function successful(booking) {
		console.log(booking)
		const success=document.querySelector('.success')
	let str=`<div class="modal show" tabindex="-1"id="exampleModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
			<h2 class="modal-title text-secondary"> Reservation <br>
			Received!</h2>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			</div>
			<div class="modal-body">
			<div class=" border-bottom-0 py-3">
					<h6 class=" d-flex">Guest <span class="ml-6">${booking.name}</span></h6>
				</div>
				<div class=" border-bottom-0 py-3">
					<h6 class=" d-flex">Phone <span class="ml-6">${booking.phone}</span></h6>
				</div>
				<div class=" border-bottom-0 py-3">
					<h6 class=" d-flex">Room <span class="ml-6">${booking.room}/${booking.nights}Nights</span></h6>
				</div>
				<div class=" border-bottom-0 py-3">
					<h6 class=" d-flex">Check-in <span class="ml-6">${booking.startDate}</span></h6>
				</div>
				<div class=" border-bottom-0 py-3">
					<h6 class=" d-flex">Check-out <span class="ml-6">${booking.endDate}</span></h6>
				</div>
			</div>
			<div class="modal-footer">
			<a href="#" class="btn btn-primary" data-dismiss="modal">EDIT RESERVATION</a>
            <a href="index.html" class="btn btn-info ">HOMEPAGE</a>
			</div>
		</div>
		</div>
	</div>`
	success.innerHTML=str
	}
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	axios.delete('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms')
	.then(function (res) {
		console.log(res)	
		
		
	})
	.catch(err=>console.log(err	))

	
    
    
    
    

    


    
    
    
    

    