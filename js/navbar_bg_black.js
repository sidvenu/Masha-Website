document.write(`
    <header id="header">
		<div class="container">

			<div id="logo" class="pull-left">
				<a href="index.html"><img src="img/FinalLogoEditWhite@2x.png" alt="" title=""/></img></a>
				<span class="title" style="top: 0px;"><b style="color: white;">masha</b> <span style="color: #f26522">art</span></span>
			</div>

			<nav id="nav-menu-container" stylel:"position: relative; top: 4px;">
				<ul class="nav-menu">
					<li class="menu-has-children">
						<a href="#" onmouseover="this.style.color='#fafafa'">Gallery</a>
						<ul>
							<li><a href="Gallery.html?type=paintings">Paintings</a></li>
							<li><a href="Gallery.html?type=sculptures">Sculptures</a></li>
							<li><a href="Gallery.html?type=handicrafts">Handicrafts</a></li>
						</ul>
					</li>
					<li><a href="Gallery.html?type=artists"  onmouseover="this.style.color='#fafafa'">Artists</a></li>
					<li class="menu-has-children">
						<a href="#" onmouseover="this.style.color='#fafafa'">Showcase</a>
						<ul>
							<li><a href="events.html?type=events" >Upcoming Events</a></li>
							<li><a href="events.html?type=exhibitions">Exhibitions</a></li>
						</ul>
					</li>
					<li><a href="masha_support.html"  onmouseover="this.style.color='#fafafa'">Masha Support</a></li>
					<li><a href="about.html"  onmouseover="this.style.color='#fafafa'">About Us</a></li>
					<li><a href="contact.html"  onmouseover="this.style.color='#fafafa'">Contact</a></li>
					<li><a href="inmedia.html"  onmouseover="this.style.color='#fafafa'">In Media</a></li>
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
