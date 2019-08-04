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

	sculptures(artistName) {
		return this.child("Sculptures").child(artistName);
	}

	static sculpturesThumbnailURL(artistName) {
		return new URLBuilder().raw().thumbnails().sculptures(artistName).urlString;
	}

	static artistsThumbnailURL() {
		return new URLBuilder().raw().thumbnails().artists().urlString;
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
	function populateArtistsInNavbar() {
		var numberOfArtists = 3;
		$.get(`${new URLBuilder().api().urlString}/artists.php?num=${numberOfArtists}`, function (data) {
			var listComp = $("#artist-navbar-dropdown"), listMobile = $("#mobile-nav #artist-navbar-dropdown")
			console.log(data);
			for (var i = 0; i < numberOfArtists; i++) {
				// console.log(data[i].artist);
				var artistName = data[i].name;
				var listString = `<li><a href="artistdetail.html?artist=${artistName}">${artistName}</a></li>`;
				listComp.prepend(listString);
				listMobile.prepend(listString);
			}
		});
	};
	populateArtistsInNavbar();

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
		$.ajax(new URLBuilder().api().urlString + `/paintings.php?artist=${artist}`, {
			method: "GET",
			success: (data) => {
				data.forEach((element) => {
					$("#artistArtworks").append(`
					<div class="col-lg-4 col-md-6">
						<div class="member">
							<div class="pic"><img
									src="${URLBuilder.paintingsThumbnailURL(artist) + "/" + element.thumbnail}"
									alt=""></div>
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

	//fill sort options
	let url = new URL(documen.location);
	
	if (url.pathname == "/Gallery.html") {
		let type = url.searchParams.type;
		switch (type) {
			case "paintings":
				$("#portfolio-sortmethods").append(`
					<li>Artist</li>
					<li>Name</li>
					<li>Medium</li>
				`);
				break;

			case "carpets":
				$("#portfolio-sortmethods").append(`
					<li>Name</li>
					<li>Type</li>
				`);
				break;

			case "shawls":
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
				$("#portfolio-sortcontrol").hide();
				break;
		}
	}
});