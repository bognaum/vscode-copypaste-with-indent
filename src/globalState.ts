import * as vsc from 'vscode';

let storage: vsc.Memento;

export {
	getStorage,
	setStorage,
};

function setStorage(st: vsc.Memento) {
	storage = st;
}

function getStorage(): vsc.Memento {
	return storage;
}