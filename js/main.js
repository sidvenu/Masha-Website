class URLBuilder {
	constructor() {
		this.urlString = "";
	}

	api() {
		return this.child("api");
	}

	raw() {
		return this.child("raw");
	}

	thumbnails() {
		return this.child("thumbnails");
	}

	photos() {
		return this.child("photos");
	}

	inmedia() {
		return this.child("inmedia");
	}

	paintings(artistName) {
		return this.child("Gallerie Splash").child(artistName);
	}

	artists() {
		return this.child("artists");
	}

	static paintingsThumbnailURL(artistName) {
		return new URLBuilder().raw().thumbnails().paintings(artistName).urlString;
	}

	static paintingsURL(artistName) {
		return new URLBuilder().raw().photos().paintings(artistName).urlString;
	}

	shawls() {
		return this.child("Shawls");
	}

	static shawlsThumbnailURL() {
		return new URLBuilder().raw().thumbnails().shawls().urlString;
	}

	static shawlsURL() {
		return new URLBuilder().raw().photos().shawls().urlString;
	}

	static eventsURL() {
		return new URLBuilder().raw().photos().events().urlString;
	}

	static eventsThumbnailURL() {
		return new URLBuilder().raw().thumbnails().events().urlString;
	}

	static eventsGalleryThumbnailURL() {
		return new URLBuilder().raw().thumbnails().events().child("gallery").urlString;
	}

	static eventsGalleryURL() {
		return new URLBuilder().raw().photos().exhibitions().child("gallery").urlString;
	}

	static exhibitionsGalleryThumbnailURL() {
		return new URLBuilder().raw().thumbnails().exhibitions().child("gallery").urlString;
	}

	static exhibitionsGalleryURL() {
		return new URLBuilder().raw().photos().exhibitions().child("gallery").urlString;
	}

	static exhibitionsURL() {
		return new URLBuilder().raw().photos().exhibitions().urlString;
	}

	static inmediaURL() {
		return new URLBuilder().raw().photos().inmedia().urlString;
	}

	static exhibitionsThumbnailURL() {
		return new URLBuilder().raw().thumbnails().exhibitions().urlString;
	}

	exhibitions() {
		return this.child("exhibitions");
	}

	events() {
		return this.child("events");
	}

	sculptures(artistName) {
		return this.child("Sculptures").child(artistName);
	}

	static sculpturesThumbnailURL(artistName) {
		return new URLBuilder().raw().thumbnails().sculptures(artistName).urlString;
	}

	static artistsThumbnailURL() {
		return new URLBuilder().raw().thumbnails().artists().urlString;
	}

	static artistsURL() {
		return new URLBuilder().raw().photos().artists().urlString;
	}

	static sculpturesURL(artistName) {
		return new URLBuilder().raw().photos().sculptures(artistName).urlString;
	}

	carpets() {
		return this.child("Carpets");
	}

	static carpetsThumbnailURL() {
		return new URLBuilder().raw().thumbnails().carpets().urlString;
	}

	static carpetsURL() {
		return new URLBuilder().raw().photos().carpets().urlString;
	}

	child(field) {
		var url = Object.create(this);
		if (url.urlString)
			url.urlString += `/`;
		url.urlString += field;
		return url;
	}
}

jQuery(document).ready(function ($) {


	// Header fixed and Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn('slow');
			$('#header').addClass('header-fixed');
		} else {
			$('.back-to-top').fadeOut('slow');
			$('#header').removeClass('header-fixed');
		}
	});
	$('.back-to-top').click(function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1500, 'easeInOutExpo');
		return false;
	});

	// Initiate the wowjs
	new WOW().init();

	// Initiate superfish on nav menu
	$('.nav-menu').superfish({
		animation: {
			opacity: 'show'
		},
		speed: 400
	});

	// Mobile Navigation
	if ($('#nav-menu-container').length) {
		var $mobile_nav = $('#nav-menu-container').clone().prop({
			id: 'mobile-nav'
		});
		$mobile_nav.find('> ul').attr({
			'class': '',
			'id': ''
		});
		$('body').append($mobile_nav);
		$('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
		$('body').append('<div id="mobile-body-overly"></div>');
		$('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

		$(document).on('click', '.menu-has-children i', function (e) {
			$(this).next().toggleClass('menu-item-active');
			$(this).nextAll('ul').eq(0).slideToggle();
			$(this).toggleClass("fa-chevron-up fa-chevron-down");
		});

		$(document).on('click', '#mobile-nav-toggle', function (e) {
			$('body').toggleClass('mobile-nav-active');
			$('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
			$('#mobile-body-overly').toggle();
		});
		$(document).click(function (e) {
			var container = $("#mobile-nav, #mobile-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('mobile-nav-active')) {
					$('body').removeClass('mobile-nav-active');
					$('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
					$('#mobile-body-overly').fadeOut();
				}
			}
		});
	} else if ($("#mobile-nav, #mobile-nav-toggle").length) {
		$("#mobile-nav, #mobile-nav-toggle").hide();
	}

	// Smoth scroll on page hash links
	$('a[href*="#"]:not([href="#"])').on('click', function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

			var target = $(this.hash);
			if (target.length) {
				var top_space = 0;

				if ($('#header').length) {
					top_space = $('#header').outerHeight();

					if (!$('#header').hasClass('header-fixed')) {
						top_space = top_space - 20;
					}
				}

				$('html, body').animate({
					scrollTop: target.offset().top - top_space
				}, 1500, 'easeInOutExpo');

				if ($(this).parents('.nav-menu').length) {
					$('.nav-menu .menu-active').removeClass('menu-active');
					$(this).closest('li').addClass('menu-active');
				}

				if ($('body').hasClass('mobile-nav-active')) {
					$('body').removeClass('mobile-nav-active');
					$('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
					$('#mobile-body-overly').fadeOut();
				}
				return false;
			}
		}
	});

	// Porfolio filter
	$("#portfolio-flters li").click(function () {
		$("#portfolio-flters li").removeClass('filter-active');
		$(this).addClass('filter-active');

		var selectedFilter = $(this).data("filter");
		$("#portfolio-wrapper").fadeTo(100, 0);

		$(".portfolio-item").fadeOut().css('transform', 'scale(0)');

		setTimeout(function () {
			$(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
			$("#portfolio-wrapper").fadeTo(300, 1);
		}, 300);
	});

	// jQuery counterUp
	$('[data-toggle="counter-up"]').counterUp({
		delay: 10,
		time: 1000
	});

	// custom code

	// get artists from database and fill it in the navbar dropdown
	// function populateArtistsInNavbar() {
	// 	var numberOfArtists = 3;
	// 	$.get(`${new URLBuilder().api().urlString}/artists.php?num=${numberOfArtists}`, function (data) {
	// 		var listComp = $("#artist-navbar-dropdown"), listMobile = $("#mobile-nav #artist-navbar-dropdown")
	// 		for (var i = 0; i < numberOfArtists; i++) {
	// 			var artistName = data[i].name;
	// 			var listString = `<li><a href="artistdetail.html?artist=${artistName}">${artistName}</a></li>`;
	// 			listComp.prepend(listString);
	// 			listMobile.prepend(listString);
	// 		}
	// 	});
	// };
	// populateArtistsInNavbar();

	$("#mobile-nav #searchText").keyup((ev) => { getProductsFromDatabase($(ev.target).val()) });
	$("#nav-menu-container #searchText").keyup((ev) => { getProductsFromDatabase($(ev.target).val()) });

	//populate artists
	if ($("#artistList").length != 0) {
		populateArtists();
	}

	//populate artist artworks
	if ($("#artistArtworks").length != 0) {
		let params = (new URL(document.location)).searchParams;
		let artist = params.get("artist");

		$("#artistName").html(artist);
		$.get("api/artists.php?name=" + artist, (data) => {
			$("#artistSub").html(data[0].subheading);
			$("#artistDescription").html(data[0].description);
			let thumbnail = URLBuilder.artistsURL() + `/${data[0].thumbnail}`;
			$("#artistPic").attr("src", thumbnail);

			console.log(data[0].featured);
			if (data[0].featured == 'F') {
				$("#portfolio-wrapper").hide();
				$($(".section-title")[0]).html(data[0].name);
			}
		});

		$.ajax(new URLBuilder().api().urlString + `/paintings.php?artist=${artist}`, {
			method: "GET",
			success: (data) => {
				data.forEach((element) => {
					$("#artistArtworks").append(`
					<div class="col-lg-4 col-md-6">
						<div class="member">
							<div class="pic"><a href="product.html?id=${element.item_number}"><img
									src="${URLBuilder.paintingsThumbnailURL(artist) + "/" + element.thumbnail}"
									alt=""></a></div>
							<h4>${element.name}</h4>
							<span>${element.medium}</span>
						</div>	
					</div>
					`);
				});
			}
		});
	}

	//sort control
	$("#portfolio-sortmethods").on("click", "li", (ev) => {
		$("#portfolio-sortmethods li.selected").removeClass("selected");
		$(ev.target).addClass("selected");
		sortProducts($(ev.target).html());
	});

	//custom slider initialisation
	if ($(".gallery-slider").length > 0) {
		globalThis.gallerySliderMaxWidth = 0;
		globalThis.gallerySliderCurrentPosition = 0;

		$(".gallery-slider .control-right").on("click", () => {
			globalThis.gallerySliderMaxWidth = 0;
			$(".gallery-slider-inner img").each((i, e) => {
				globalThis.gallerySliderMaxWidth += $(e).width();
			});

			let move = $(".gallery-slider-inner").width();

			if (globalThis.gallerySliderCurrentPosition > -globalThis.gallerySliderMaxWidth + move)
				globalThis.gallerySliderCurrentPosition -= move;
			$(".gallery-slider-inner").css({ left: globalThis.gallerySliderCurrentPosition });
		});

		$(".gallery-slider .control-left").on("click", () => {
			globalThis.gallerySliderMaxWidth = 0;
			$(".gallery-slider-inner img").each((i, e) => {
				globalThis.gallerySliderMaxWidth += $(e).width();
			});

			let move = $(".gallery-slider-inner").width();

			if (globalThis.gallerySliderCurrentPosition < 0)
				globalThis.gallerySliderCurrentPosition += move;
			$(".gallery-slider-inner").css({ left: globalThis.gallerySliderCurrentPosition });
		});

		//touch listeners
		$(".gallery-slider").on("touchstart", (ev) => {
			globalThis.touchStart = { x: ev.targetTouches[0].screenX, y: ev.targetTouches[0].screenY };
			globalThis.thresholdX = 50;
			globalThis.touchTriggered = false;
		});

		$(".gallery-slider").on("touchmove", (ev) => {
			let dx;
			dx = ev.changedTouches[0].screenX - globalThis.touchStart.x;
			if (Math.abs(dx) > globalThis.thresholdX && !globalThis.touchTriggered) {
				if (dx < 0){
					$(".gallery-slider-control .control-right").trigger("click");
					globalThis.touchTriggered = true;
				}
				else {
					$(".gallery-slider-control .control-left").trigger("click");
					globalThis.touchTriggered = true;
				}
			}
		});

		$(".gallery-slider").on("touchend", (ev)=>{
			globalThis.touchTriggered = false;
		});
	}

	//page specific function calls
	let url = new URL(document.location);

	if (url.pathname == "/Gallery.html") {
		let type = url.searchParams.get("type");
		$("#pagination-control").hide();
		switch (type) {
			case "paintings":
				$("#portfolio-sortmethods").append(`
					<li>Artist</li>
					<li>Name</li>
					<li>Medium</li>
				`);
				break;

			case "handicrafts":
				$("#portfolio-sortmethods").append(`
					<li>Name</li>
					<li>Type</li>
				`);
				break;

			case "sculptures":
				$("#portfolio-sortmethods").append(`
					<li>Artist</li>
					<li>Name</li>
					<li>Medium</li>
				`);
				break;
			case "artists":
				//no sorting options
				$("#allArtistsContainer").show();
				$("#portfolio-sortcontrol").hide();
				fillAllArtists();
				break;
		}

		//attach events to handicraft anchors
		$("#handicrafts-control .options a").click((ev) => {
			$("#handicrafts-control .options a").removeClass("selected");
			$(ev.target).addClass("selected");
			getProductsFromDatabase();
		});
	}
	else if (url.pathname == "/product.html") {
		updateProductDetails();
		$("#sendenquiry-button").click(validateModal);
	}
	else if (url.pathname == "/" || url.pathname == "/index.html") {
		initCarousel1();
		//carousel swipe
		attachTouchToCarousel("#myCarousel");
		curatedCollectionInit();
	}
	else if (url.pathname == "/events.html") {
		populateEvents();

		$("#portfolio-wrapper").on("click", ".portfolio-item", function () {
			window.location = "eventdetail.html?id=" + $(this).attr("data-id") + "&type=" + url.searchParams.get("type");
		});
	}
	else if (url.pathname == "/eventdetail.html") {
		updateEventDetails();
	}
	else if (url.pathname == "/inmedia.html") {
		updateInMedia();
	}
});

function attachTouchToCarousel (div) {
	if (globalThis.sliderTouchData == undefined) {
		globalThis.sliderTouchData = {threshold: 50, triggered: false};
	}

	$(div).on("touchstart", (ev)=>{
		globalThis.sliderTouchData.x = ev.targetTouches[0].screenX;
	});

	$(div).on("touchmove", (ev)=>{
		let dx = globalThis.sliderTouchData.x - ev.changedTouches[0].screenX;
		if (Math.abs(dx) > globalThis.sliderTouchData.threshold) {
			if (dx > 0) {
				//swipe left
				console.log("left");
			}
			else {
				//swipe right
				console.log("right");
			}
			globalThis.sliderTouchData.triggered = true;
		}
	});

	$(div).on("touchend", ()=>{
		globalThis.sliderTouchData.triggered = false;
	});


}