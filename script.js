class RGBMixer {
    constructor() {
        this.colorDisplay = document.getElementById('colorDisplay');
        this.rgbValues = document.getElementById('rgbValues');
        this.hexValue = document.getElementById('hexValue');
        this.xCoord = document.getElementById('xCoord');
        this.yCoord = document.getElementById('yCoord');
        this.blueValue = document.getElementById('blueValue');
        this.redValue = document.getElementById('redValue');
        this.greenValue = document.getElementById('greenValue');
        this.blueValue2 = document.getElementById('blueValue2');
        this.redFill = document.getElementById('redFill');
        this.greenFill = document.getElementById('greenFill');
        this.blueFill = document.getElementById('blueFill');
        this.currentRGB = { r: 128, g: 128, b: 128 };
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.init();
    }
    init() {
        document.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
        window.addEventListener('resize', () => {
            this.screenWidth = window.innerWidth;
            this.screenHeight = window.innerHeight;
        });
        this.updateDisplay();
    }
    handleMouseMove(event) {
        const x = event.clientX;
        const y = event.clientY;
        const red = Math.round((x / this.screenWidth) * 255);
        const green = Math.round((y / this.screenHeight) * 255);
        const centerX = this.screenWidth / 2;
        const centerY = this.screenHeight / 2;
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const currentDistance = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        const blue = Math.round((currentDistance / maxDistance) * 255);
        this.currentRGB = {
            r: Math.max(0, Math.min(255, red)),
            g: Math.max(0, Math.min(255, green)),
            b: Math.max(0, Math.min(255, blue))
        };
        this.updateCoordinates(x, y);
        this.updateDisplay();
    }
    updateCoordinates(x, y) {
        this.xCoord.textContent = x;
        this.yCoord.textContent = y;
        this.blueValue.textContent = this.currentRGB.b;
    }
    updateDisplay() {
        const { r, g, b } = this.currentRGB;
        const rgbColor = `rgb(${r}, ${g}, ${b})`;
        this.colorDisplay.style.backgroundColor = rgbColor;
        this.rgbValues.textContent = `RGB(${r}, ${g}, ${b})`;
        this.hexValue.textContent = this.rgbToHex(r, g, b);
        this.redValue.textContent = r;
        this.greenValue.textContent = g;
        this.blueValue2.textContent = b;
        this.updateComponentBars();
        this.updatePageBackground();
    }
    updateComponentBars() {
        const { r, g, b } = this.currentRGB;
        const redHeight = (r / 255) * 100;
        const greenHeight = (g / 255) * 100;
        const blueHeight = (b / 255) * 100;
        this.redFill.style.height = `${redHeight}%`;
        this.greenFill.style.height = `${greenHeight}%`;
        this.blueFill.style.height = `${blueHeight}%`;
    }
    updatePageBackground() {
        const { r, g, b } = this.currentRGB;
        const color1 = `rgb(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)})`;
        const color2 = `rgb(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)})`;
        document.body.style.background = `линейный градиент (135 градусов, ${color1} 0%, ${color2} 100%)`;
    }
    rgbToHex(r, g, b) {
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new RGBMixer();
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'перевестиY(20px)';
    setTimeout(() => {
        container.style.transition = 'все 0,8 секунды легко';
        container.style.opacity = '1';
        container.style.transform = 'перевестиY(0)';
    }, 100);
});
document.addEventListener('mouseenter', () => {
    document.body.style.cursor = 'crosshair';
});
setInterval(() => {
    const colorDisplay = document.getElementById('colorDisplay');
    if (colorDisplay) {
        colorDisplay.style.transform = 'масштаб(1,02)';
        setTimeout(() => {
            colorDisplay.style.transform = 'масштаб(1)';
        }, 200);
    }
}, 3000);