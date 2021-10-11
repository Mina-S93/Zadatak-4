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
let avatar = document.querySelector(".avatar");
let body = document.querySelector("body");
let user;

let lightMode = document.querySelector("#light-mode");
let darkMode = document.querySelector("#dark-mode");

lightMode.addEventListener("click", () => {
	body.classList.replace("light", "dark");
});

darkMode.addEventListener("click", () => {
	body.classList.replace("dark", "light");
});

//prefers-color-scheme
const userPrefersDark =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches;

if (userPrefersDark) {
	body.classList.replace("light", "dark");
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
