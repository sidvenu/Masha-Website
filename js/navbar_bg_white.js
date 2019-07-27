document.write(`
    <header id="header">
		<div class="container">

			<div id="logo" class="pull-left" style="margin-top:-13px;">
				<a href="index.html"><img src="img/MashaBranding.png" alt="" title="" /></img></a>
			</div>

			<nav id="nav-menu-container">
				<ul class="nav-menu">
					<li class="menu-has-children">
						<a href="Gallery.html">Gallery</a>
						<ul>
							<li><a href="#">Paintings</a></li>
							<li><a href="#">Sculptures</a></li>
							<li><a href="#">Shawls</a></li>
							<li><a href="#">Carpets</a></li>
							<!--li><a href="theme.html">Themes</a></li-->
						</ul>
					</li>
					<li class="menu-has-children">
						<a href="artist.html">Artist</a>
						<ul id="artist-navbar-dropdown">
							<li><a href="#">All Artists</a></li>
						</ul>
					</li>
					<li class="menu-has-children">
						<a href="#">Show Case</a>
						<ul>
							<li><a href="events.html">Upcoming Events</a></li>
							<li><a href="#">Exhibitions</a></li>
						</ul>
					</li>
					<li><a href="masha.html">Masha Support</a></li>
					<li><a href="about.html">About Us</a></li>
					<li><a href="contact.html">Contact</a></li>
					<li><a href="inmedia.html">In Media</a></li>

				</ul>
				<ul class="nav-menu nav-menu-right">
					<li id="searchGroup">
						<i class="glyphicon glyphicon-search"></i>
						<input class="ml-auto" type="text" id="searchText" placeholder="Search">
					</li>
				</ul>
			</nav><!-- #nav-menu-container -->
		</div>
	</header>
`);
