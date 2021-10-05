let form = document.querySelector("form");
let username = document.querySelector(".username");
let joined = document.querySelector(".joined");
let login = document.querySelector(".login");
let repos = document.querySelector(".repos");
let followers = document.querySelector(".followers");
let following = document.querySelector(".following");
let bio = document.querySelector(".bio");
let userLocation = document.querySelector(".location");
let twitter = document.querySelector(".twitter");
let website = document.querySelector(".website");
let company = document.querySelector(".company");
let error = document.createElement("span");
let mode = document.querySelector(".mode");
let avatar = document.querySelector(".avatar");
let body = document.querySelector("body");
let modeName = document.querySelector(".mode span");
let modeImg = document.querySelector(".mode img");
let h1 = document.querySelector("h1");
let section = document.querySelector("section");
let search = document.querySelector("#search");
let rff = document.querySelector(".repo-followers-following");
let infoP = document.querySelectorAll(".info p");
let infoA = document.querySelectorAll(".info a");
let user;

//Light - Dark Mode
mode.addEventListener("click", () => {
	section.classList.toggle("form-section");
	section.classList.toggle("shadow");
	form.classList.toggle("form-section");
	form.classList.toggle("shadow");
	h1.classList.toggle("white");
	username.classList.toggle("white");
	body.classList.toggle("body-dark");
	mode.classList.toggle("white");
	search.classList.toggle("white");
	rff.classList.toggle("body-dark");
	repos.classList.toggle("white");
	followers.classList.toggle("white");
	following.classList.toggle("white");
	infoP.forEach((p) => p.classList.toggle("white"));
	infoA.forEach((a) => a.classList.toggle("white"));

	if (body.classList.contains("body-dark")) {
		modeName.innerText = "LIGHT";
		modeImg.src = "starter-code/assets/icon-sun.svg";
	} else {
		modeName.innerText = "DARK";
		modeImg.src = "starter-code/assets/icon-moon.svg";
	}
});

//prefers-color-scheme
const userPrefersDark =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches;

if (userPrefersDark) {
	console.log("User prefers a dark interface");
	modeName.innerText = "LIGHT";
	modeImg.src = "starter-code/assets/icon-sun.svg";
	section.classList.add("form-section");
	section.classList.add("shadow");
	form.classList.add("form-section");
	form.classList.add("shadow");
	h1.classList.add("white");
	username.classList.add("white");
	body.classList.add("body-dark");
	mode.classList.add("white");
	search.classList.add("white");
	rff.classList.add("body-dark");
	repos.classList.add("white");
	followers.classList.add("white");
	following.classList.add("white");
	infoP.forEach((p) => p.classList.add("white"));
	infoA.forEach((a) => a.classList.add("white"));
}

//Request
let userData = async (user) => {
	let response = await fetch(`https://api.github.com/users/${user}`);
	let data = await response.json();
	return data;
};

//Date transform function
function date(userDate) {
	let date = new Date(`${userDate}`);
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"April",
		"May",
		"June",
		"July",
		"Aug",
		"Sept",
		"Oct",
		"Nov",
		"Dec",
	];
	let transformedDate = `${date.getDate()} ${
		months[date.getMonth()]
	} ${date.getFullYear()}`;

	return transformedDate;
}

//Implementing user data in DOM
function implementingUserData(data) {
	if (data.id == null) {
		form.appendChild(error);
		error.innerText = "No results";
		error.classList.add("no-results");
	} else {
		if (form.childNodes.length > 5) {
			form.removeChild(error);
		}

		avatar.src = `${data.avatar_url}`;

		if (data.name == null) {
			username.innerText = `${data.login}`;
		} else {
			username.innerText = `${data.name}`;
		}

		joined.innerText = `${date(data.created_at)}`;
		login.innerText = `@${data.login}`;

		if (data.bio == null) {
			bio.innerText = "This profile has no bio";
		} else {
			bio.innerText = `${data.bio}`;
		}

		repos.innerText = `${data.public_repos}`;
		followers.innerText = `${data.followers}`;
		following.innerText = `${data.following}`;

		let detailsContainer = [userLocation, twitter, website, company];
		let details = [
			data.location,
			data.twitter_username,
			data.blog,
			data.company,
		];

		for (let i = 0; i < details.length; i++) {
			if (details[i] == null || details[i] == "") {
				detailsContainer[i].innerText = "Not Available";
				detailsContainer[i].href = `#`;
				detailsContainer[i].classList.add("unavailable-a");
				detailsContainer[i].parentElement.classList.add("unavailable");
			} else {
				detailsContainer[i].innerText = `${details[i]}`;
				if (details[i] == data.twitter_username) {
					detailsContainer[i].href = `https://twitter.com/${details[i]}`;
				} else if (details[i] == data.blog) {
					detailsContainer[i].href = `${details[i]}`;
				} else if (details[i] == data.company) {
					detailsContainer[i].href = `https://github.com/${details[i].substring(
						1
					)}`;
				}
				detailsContainer[i].classList.remove("unavailable-a");
				detailsContainer[i].parentElement.classList.remove("unavailable");
			}
		}
	}
}

//Extracting response for default Octocat
userData("octocat")
	.then((data) => implementingUserData(data))
	.catch((reason) => console.log(reason.message));

//Extracting response for searched user
form.addEventListener("submit", (e) => {
	e.preventDefault();
	user = form.search.value.trim();

	if (user != "") {
		userData(user)
			.then((data) => implementingUserData(data))
			.catch((reason) => console.log(reason.message));
	}
});
