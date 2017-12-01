function randomEntre1y(x) { // 1, X
	return Math.ceil (Math.random()*x); 
}

function randomEntre(min, max) {
	return randomEntre1y(max-min+1) +(min-1);
}

function duracionRandom(min, max) {
	// Minutos límite

	// Segundos límite
	min = min * 60; // 60
	max = max * 60; // 180

	// min, max
	// 1, (max-min+1) +(min-1)
	var r = randomEntre(min, max);
	return r;

	// Convertir a min y seg
	// var minutos = Math.floor(r/60);
	// var segundos = r - minutos*60;
	// console.log(minutos + ':' + segundos);
}

function minutosSegundos(segundos) {
	var minutos = Math.floor(segundos/60);
	segundos -= minutos * 60;

	var segundosFormato = (segundos<10 ? '0'+segundos : segundos);
	var minutosFormato = (minutos<10 ? '0'+minutos : minutos);

	return minutosFormato + ':' + segundosFormato;
}

function horasMinutosSegundos(segundos) {
	var minutos = Math.floor(segundos/60);
	segundos -= minutos * 60; // 08:05:03   8*60+5 : 03

	var horas = Math.floor(minutos/60);
	minutos -= horas * 60;

	var segundosFormato = (segundos<10 ? '0'+segundos : segundos);
	var minutosFormato = (minutos<10 ? '0'+minutos : minutos);
	var horasFormato = (horas<10 ? '0'+horas : horas);
	
	return horasFormato + ':' + minutosFormato + ':' + segundosFormato;
}

function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}
Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

function toDate(dateStr) {
    var parts = dateStr.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

function main() {
	// Hora inicio mín y máx
	var hMin = 8;
	var hMax = 18;

	// Segundos transcurridos
	var sInicial;
	var sFinal = hMax * 60 * 60;

	// Días
	var diaUno = toDate('01/09/2016');
	var filasGeneradas = 0;

	while (true) {

		sInicial = hMin * 60 * 60;
		while (sInicial < sFinal) {
			// 1; 28/01/2017; 10:11:10; 10:27:13; 16:02; 963
			var fila = (filasGeneradas+1) + '; ' + convertDate(diaUno);
			sInicial += duracionRandom(2, 6); // retraso
			// console.log('Se inició una prueba a las: ' + horasMinutosSegundos(sInicial));
			fila += '; ' + horasMinutosSegundos(sInicial);
			var sPrueba = duracionRandom(12, 15);
			sInicial += sPrueba; // prueba
			// console.log('Finalizó a las: ' + horasMinutosSegundos(sInicial));
			fila += '; ' + horasMinutosSegundos(sInicial);
			fila += '; ' + minutosSegundos(sPrueba) + '; ' + sPrueba;

			// console.log(fila);
			document.body.innerHTML += fila+'<br />';
			++filasGeneradas;
			if (filasGeneradas == 373) return;
		}
		diaUno = diaUno.addDays(randomEntre1y(5));
	}

}

main();
