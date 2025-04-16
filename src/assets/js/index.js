function convertProjectsJSONToHTML(projectsJSON) {
  const projectsDiv = document.querySelector('.projects-grid');

  projectsJSON.projects
    .sort((a, b) => b.id - a.id)
    .forEach((project) => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';

      const heading = document.createElement('h2');
      heading.className = 'project-heading';

      const headingLink = document.createElement('a');
      headingLink.className = 'project-heading-link';
      headingLink.href = project.link;
      headingLink.textContent = './' + project.title.toLowerCase();

      const description = document.createElement('p');
      description.className = 'project-description';
      description.textContent = project.description;

      const link = document.createElement('a');
      link.className = 'project-link';
      link.href = project.link;
      link.textContent = '_';

      heading.appendChild(headingLink);
      projectCard.appendChild(heading);
      projectCard.appendChild(description);
      projectCard.appendChild(link);
      projectsDiv.appendChild(projectCard);
    });

  return projectsDiv;
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('./assets/data/projects.json')
    .then((response) => response.json())
    .then((projectsJSON) => {
      convertProjectsJSONToHTML(projectsJSON);
    })
    .catch((error) => console.error('Error loading projects:', error));
});
