/*******************
INITIALIZATION
*******************/
function checkIfAdKitReady(event) {
	adkit.onReady(initializeCreative);
}

function initializeCreative(event) {
	document.getElementById("banner").addEventListener("click", clickthrough);
}

function clickthrough(event){
	EB.clickthrough();
}
/*******************
END OF CREATIVE FUNCTIONS
*******************/
var videoExpandable = new videoExpandable();
window.addEventListener("load", checkIfAdKitReady);