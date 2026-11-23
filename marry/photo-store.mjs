const storeName = 'photos';
let databasePromise;

function openDatabase() {
    databasePromise ??= new Promise((resolve, reject) => {
        const request = indexedDB.open('marry-photo-album', 1);
        request.onupgradeneeded = () => request.result.createObjectStore(storeName, { autoIncrement: true });
        request.onerror = () => reject(request.error);
        request.onblocked = () => {
            request.onsuccess = () => request.result.close();
            reject(new Error('Photo storage is blocked'));
        };
        request.onsuccess = () => {
            const database = request.result;
            database.onversionchange = () => {
                database.close();
                databasePromise = undefined;
            };
            resolve(database);
        };
    }).catch(error => {
        databasePromise = undefined;
        throw error;
    });
    return databasePromise;
}

async function withPhotos(mode, operation) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction(storeName, mode);
        let result;
        transaction.oncomplete = () => resolve(result);
        transaction.onabort = () => reject(transaction.error ?? new Error('Photo storage transaction aborted'));
        operation(transaction.objectStore(storeName), value => { result = value; });
    });
}

export function readSavedPhotos() {
    return withPhotos('readonly', (store, finish) => {
        const request = store.getAll();
        request.onsuccess = () => finish(request.result);
    });
}

export function savePhoto(photo, limit) {
    return withPhotos('readwrite', (store, finish) => {
        const count = store.count();
        count.onsuccess = () => {
            const hasRoom = count.result < limit;
            if (hasRoom) store.add(photo);
            finish(hasRoom);
        };
    });
}

export function clearSavedPhotos() {
    return withPhotos('readwrite', store => store.clear());
}
