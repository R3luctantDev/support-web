function goToTool(url) {
  if (url) {
    window.location.href = url;
  }
}

const tools = [
  {
    name: "Landing Page",
    path: "/trainings/"
  },
  {
    name: "Routing Web",
    path: "/trainings/inquiry-routing/"
  },
  {
    name: "Troubleshooting Web",
    path: "/trainings/troubleshooting/"
  }
];

const currentPath = window.location.pathname;

const navContainer = document.getElementById("toolNav");

if (navContainer) {
  const nav = document.createElement("nav");
  nav.className = "tool-nav";

  const label = document.createElement("label");
  label.setAttribute("for", "toolSelect");
  label.textContent = "Select tool:";

  const select = document.createElement("select");
  select.id = "toolSelect";

  tools.forEach(tool => {
    const option = document.createElement("option");
    option.value = tool.path;
    option.textContent = tool.name;

    if (currentPath === tool.path) {
      option.selected = true;
    }

    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    window.location.href = select.value;
  });

  nav.appendChild(label);
  nav.appendChild(select);
  navContainer.appendChild(nav);
}
