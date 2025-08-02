const githubUsername = "micha1j";

const repoList = document.getElementById("repo-list");

fetch(`https://api.github.com/users/${githubUsername}/repos`).then(response => {
	if (!response.ok) {
		throw new Error(`Błąd API: ${response.status}`);
	}
	return response.json()
})
.then(repos => {
	repos.forEach(repo => {
		const repoElement = document.createElement("div");
		repoElement.classList.add("repo");
		
		repoElement.innerHTML = `
		<h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
		<p>${repo.description || "Brak opisu"}</p>
		`;
		
		repoList.appendChild(repoElement);
	});
})
.catch( error => { 
	repoList.innerHTML = `<p style="color: red;">Wystąpił błąd: ${error.message}</p>`
});