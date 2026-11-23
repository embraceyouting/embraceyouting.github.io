import { createGestureControls } from './gestures.mjs';

const samples = ['ky1.jpg', 'ky2.jpg', 'ky3.jpg'];
const photoLimit = 60;
const maxImageEdge = 960;

const byId = id => document.getElementById(id);
const container = byId('canvas-container');
const sceneStatus = byId('scene-status');
const cameraButton = byId('camera-toggle');
const modeButtons = [...byId('modes').querySelectorAll('button')];
const photoList = byId('photo-list');
const photoCount = byId('photo-count');
const photoStatus = byId('photo-status');
const dialog = byId('photo-dialog');
const dialogImage = byId('dialog-image');
const fileButton = byId('file-button');
const folderButton = byId('folder-button');
const fileInput = byId('file-input');
const folderInput = byId('folder-input');

const photos = [];
let scene;
let sceneReady = false;
let mode = 'TREE';
let focusedPhoto = null;
let importing = false;

function updateControls() {
    for (const button of modeButtons) {
        button.disabled = !sceneReady || (button.dataset.mode === 'FOCUS' && !photos.length);
        button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
    }
    cameraButton.disabled = !sceneReady;
}

function setMode(next, photo) {
    if (!sceneReady) return;
    if (next === 'FOCUS' && !photos.length) return;
    if (next === 'FOCUS' && !photo) {
        const previous = photos.indexOf(focusedPhoto);
        photo = photos[(previous + 1) % photos.length];
    }

    if (focusedPhoto) focusedPhoto.button.setAttribute('aria-pressed', 'false');
    focusedPhoto = next === 'FOCUS' ? photo : null;
    if (focusedPhoto) {
        focusedPhoto.button.setAttribute('aria-pressed', 'true');
        focusedPhoto.button.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
    mode = next;
    scene.setMode(mode, focusedPhoto?.object);
    updateControls();
}

const cameraControls = createGestureControls({
    button: cameraButton,
    panel: byId('camera-panel'),
    status: byId('camera-status'),
    video: byId('webcam'),
    select: byId('camera-select'),
    onPointer: (x, y) => scene?.setPointer(x, y),
    onMode: setMode,
});
cameraButton.addEventListener('click', cameraControls.toggle);

function setSceneStatus(message, ready) {
    sceneStatus.textContent = message;
    sceneStatus.hidden = !message;
    sceneReady = ready;
    if (!ready) cameraControls.stop();
    updateControls();
}

function openPhoto(photo) {
    if (sceneReady) {
        setMode('FOCUS', photo);
        return;
    }
    dialogImage.src = photo.src;
    dialogImage.alt = photo.name;
    if (!dialog.open) dialog.showModal();
}

function addPhoto(src, name, image) {
    const photo = { src, name, image, object: scene?.addPhoto(image) };
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'photo';
    button.type = 'button';
    button.title = name;
    button.setAttribute('aria-label', name);
    button.setAttribute('aria-pressed', 'false');
    const thumbnail = document.createElement('img');
    thumbnail.src = src;
    thumbnail.alt = '';
    thumbnail.loading = 'lazy';
    thumbnail.decoding = 'async';
    button.append(thumbnail);
    button.addEventListener('click', () => openPhoto(photo));
    item.append(button);
    photoList.append(item);
    photo.button = button;
    photos.push(photo);
    photoCount.textContent = String(photos.length);
    updateControls();
}

async function loadImage(src) {
    const image = new Image();
    image.src = src;
    await image.decode();
    return image;
}

const initialPhotos = Promise.allSettled(samples.map(file => loadImage('./images/' + file))).then(results => {
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            addPhoto('./images/' + samples[index], `示例照片 ${index + 1}`, result.value);
        }
    });
});

async function loadLocalPhoto(file) {
    const original = URL.createObjectURL(file);
    let image;
    try {
        image = await loadImage(original);
    } finally {
        URL.revokeObjectURL(original);
    }

    const scale = Math.min(1, maxImageEdge / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);

    const format = file.type === 'image/jpeg' ? 'image/jpeg' : 'image/webp';
    const blob = await new Promise(resolve => canvas.toBlob(resolve, format, 0.86));
    if (!blob) throw new Error('Unable to prepare photo');
    addPhoto(URL.createObjectURL(blob), file.name, canvas);
}

async function importPhotos(event) {
    const files = [...event.target.files].filter(file =>
        file.type.startsWith('image/') || /\.(avif|bmp|gif|heic|heif|jpe?g|png|svg|webp)$/i.test(file.name),
    );
    event.target.value = '';
    if (importing) return;
    if (!files.length) {
        photoStatus.textContent = '所选内容中没有可导入的图片。';
        return;
    }

    importing = true;
    fileButton.disabled = folderButton.disabled = true;
    photoStatus.textContent = '正在导入照片…';
    await initialPhotos;
    let added = 0;
    let failed = 0;
    let skipped = 0;
    for (const file of files) {
        if (photos.length >= photoLimit) {
            skipped = files.length - added - failed;
            break;
        }
        try {
            await loadLocalPhoto(file);
            added++;
        } catch {
            failed++;
        }
    }

    photoStatus.textContent = [
        added && `已添加 ${added} 张`,
        failed && `${failed} 张无法读取`,
        skipped && `已达 ${photoLimit} 张上限，跳过 ${skipped} 张`,
    ].filter(Boolean).join(' · ');
    importing = false;
    fileButton.disabled = folderButton.disabled = false;
}

fileButton.addEventListener('click', () => fileInput.click());
folderButton.addEventListener('click', () => folderInput.click());
folderButton.hidden = !('webkitdirectory' in folderInput);
fileInput.addEventListener('change', importPhotos);
folderInput.addEventListener('change', importPhotos);
byId('close-photo').addEventListener('click', () => dialog.close());

for (const button of modeButtons) {
    button.addEventListener('click', () => setMode(button.dataset.mode));
}

container.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse') container.setPointerCapture(event.pointerId);
});
container.addEventListener('pointermove', event => {
    const bounds = container.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
    scene?.setPointer(Math.max(-1, Math.min(x, 1)), Math.max(-1, Math.min(y, 1)));
});
window.addEventListener('keydown', event => {
    if (event.key.toLowerCase() === 'h' && !event.repeat && !event.metaKey && !event.ctrlKey &&
        !event.altKey && !dialog.open && !event.target.matches?.('input, select, textarea, [contenteditable]')) {
        document.body.classList.toggle('presentation');
    }
});

try {
    const { createScene } = await import('./scene.mjs');
    scene = createScene(container, setSceneStatus);
    for (const photo of photos) photo.object = scene.addPhoto(photo.image);
    setSceneStatus('', true);
} catch (error) {
    console.warn('Unable to start the 3D scene.', error);
    setSceneStatus('3D 场景暂时无法加载，仍可添加和查看照片。', false);
}
