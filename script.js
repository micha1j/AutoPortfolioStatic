const githubUsername = "micha1j";

const repoList = document.getElementById("repo-list");

fetch(`https://api.github.com/users/${githubUsername}/repos`).then(response => {
	if (!response.ok) {
		throw new Error(`Błąd API: ${response.status}`);
	}
	return response.json()
})
.then(repos => {
	function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric"
	});
	}
	repos.filter(repo => {
    const lastUpdated = new Date(repo.updated_at);
    return lastUpdated.getFullYear() >= 2025;
  })
.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
	
.forEach(repo => {
		const repoElement = document.createElement("li");
		repoElement.classList.add("repo");
		
		repoElement.innerHTML = `
		<h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
		<p>${repo.description || "Brak opisu"}</p>
		<p>${formatDate(repo.updated_at)}</p>
		`;
		
		repoList.appendChild(repoElement);
	});
})
.catch( error => { 
	repoList.innerHTML = `<p style="color: red;">Wystąpił błąd: ${error.message}</p>`
});