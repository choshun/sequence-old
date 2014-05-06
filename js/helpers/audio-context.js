//shim for web context
contextClass = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;

if (contextClass) {
	// Web Audio API is available.
	context = new contextClass();
}