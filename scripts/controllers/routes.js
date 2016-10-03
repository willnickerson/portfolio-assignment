page('/', homeRoute);
page('/about', aboutRoute);
page('/projects', projectsRoute);

function homeRoute() {
  console.log('HOME ROUTE');
  homeController.reveal();
};

function aboutRoute() {
  console.log('ABOUT ROUTE');
  aboutController.reveal();
};

function projectsRoute() {
  console.log('PROJECTS ROUTE');
  projectsController.reveal();
}

page();
