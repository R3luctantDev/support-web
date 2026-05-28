const spider = document.getElementById("spider");
const web = document.getElementById("web");

let dragging = false;

spider.addEventListener("mousedown", () => {
    dragging = true;
    spider.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () => {
    dragging = false;
    spider.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    const rect = web.getBoundingClientRect();
    let x = e.clientX - rect.left - 21;
    let y = e.clientY - rect.top - 21;

    x = Math.max(0, Math.min(x, rect.width - 42));
    y = Math.max(0, Math.min(y, rect.height - 42));

    spider.style.left = x + "px";
    spider.style.top = y + "px";
});

const categories = [
    "login",
    "display",
    "stats",
    "fyp",
    "live",
    "media",
    "uploads",
    "posts",
    "apps",
    "money",
    "notifs",
    "emails",
    "messaging",
    "management",
    "nonFansly"
];

const scores = {
    login: 0,
    display: 0,
    stats: 0,
    fyp: 0,
    live: 0,
    media: 0,
    uploads: 0,
    posts: 0,
    apps: 0,
    money: 0,
    messaging: 0,
    notifs: 0,
    emails: 0,
    management: 0,
    nonFansly: 0
};

const centerX = 350;
const centerY = 350;
const maxRadius = 280;

document.querySelectorAll(".label").forEach(label => {
    label.addEventListener("click", () => {
    const category = label.dataset.category;

    scores[category] = Math.min(scores[category] + 1, 4);
    
    label.classList.remove("level-1", "level-2", "level-3");

    if (scores[category] > 0) {
        label.classList.add(`level-${scores[category]}`);
    }

    updateRadarShape();
    });
});

function updateRadarShape() {
    const points = categories.map((category, index) => {
    const angleStep = 360 / categories.length;
    const angle = (-90 + index * angleStep) * Math.PI / 180;   
    const radius = (scores[category] / 4) * maxRadius;

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    return `${x},${y}`;
    });

    document.getElementById("radarShape").setAttribute("points", points.join(" "));
}

function resetMarker() {
    spider.style.left = "331px";
    spider.style.top = "325px";

    Object.keys(scores).forEach(category => {
    scores[category] = 0;
    });

    document.querySelectorAll(".label").forEach(label => {
    label.classList.remove(
    "level-1",
    "level-2",
    "level-3",
    "level-4"
    );
    });

    updateRadarShape();
}