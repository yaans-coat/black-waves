const canvas = document.getElementById('grid-bg');
const ctx = canvas.getContext('2d');
let w, h;
const dots = [];
const spacing = 40;
const trail = [];

window.addEventListener('resize', resize);
resize();

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

window.addEventListener('mousemove', (e) => {
    trail.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)` // Cyan/Blue range
    });
});

function draw() {
    ctx.clearRect(0, 0, w, h);
    
    // Draw Static Grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += spacing) {
        for (let y = 0; y < h; y += spacing) {
            ctx.strokeRect(x, y, 1, 1);
        }
    }

    // Draw & Update Color Trails
    for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.age += 0.02; // Speed of fade
        
        if (p.age > 1) {
            trail.splice(i, 1);
            i--;
            continue;
        }

        const size = 30 * (1 - p.age);
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 1 - p.age;
        
        // Snap to grid for the "Blocky" trail look
        const snapX = Math.floor(p.x / spacing) * spacing;
        const snapY = Math.floor(p.y / spacing) * spacing;
        
        ctx.fillRect(snapX, snapY, spacing, spacing);
    }
    
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
}
draw();
