console.log("searchAnimal.js loaded");

var animalChoice

$("#leftPanel").hide();


$("#dog").on('click', function (){
	console.log("dog click recognized");
	animalChoice = 'dog';
	console.log("animalChoice: " + animalChoice);
	$("#leftPanel").show();
});

$("#cat").on('click', function (){
	console.log("cat click recognized");
	animalChoice = 'cat';
	console.log("animalChoice: " + animalChoice);
	$("#leftPanel").show();
});