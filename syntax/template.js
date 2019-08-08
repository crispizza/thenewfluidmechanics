var name = 'k8805';
var name2 = "Hack'em";
var letter = 'Lorem ipsum dolor sit amet, \n'+name+' consectetur adipiscing elit. \n\n' +name2+ ' Proin vestibulum erat lectus, \nut lacinia sem convallis in.\n';
console.log(letter);

letter = `Lorem ipsum dolor sit amet, 
${name} consectetur adipiscing elit. 

${name2} Proin vestibulum erat lectus, 
ut lacinia sem convallis in.
${1+1}`; 
console.log(letter);

