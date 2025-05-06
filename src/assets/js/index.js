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
      link.setAttribute('target', '_blank');
      link.className = 'project-link';

      if (project.image) {
        link.href = project.imageLink || project.link;
        const image = document.createElement('img');
        image.className = 'project-image';
        image.src = project.image;
        image.alt = project.imageAltText || project.title;
        link.appendChild(image);
      } else {
        link.href = project.link;
        link.textContent = project.linkContent || '_';
      }

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
