var activa = 'instrucions';
var nomeXogador = 'Anonymous';
var marcador = new Array();



//amosarOpcion: Amosa ou oculta a sección relativa a cada opción do menú
function amosarOpcion(nova) {
	document.getElementById(activa).classList.remove("activo");
	document.getElementById(nova).classList.add("activo");
	document.getElementById("seccion_" + activa).classList.remove("visibel");
	document.getElementById("seccion_" + activa).classList.add("oculta");
	document.getElementById("seccion_" + nova).classList.remove("oculta");
	document.getElementById("seccion_" + nova).classList.add("visibel");
	activa = nova;
	if (nova == 'estatistica') { xerarMarcador(); }
	if (nova == 'xogo') { iniciarPartida(); }
}

function cambiarXogador(xogador) {

	nomeXogador = xogador;
	var existe = false;

	for(var i =0; i < marcador.length;i++)
		{
			if (marcador[i][0] == nomeXogador)
			 {
			 	existe = true;
			 }
		}
		if(!existe)
		{
			var rexistro = new Array(nomeXogador,"0", "0","0","0");
			marcador.push(rexistro);
		}
	

}

function xerarMarcador() {

	ordearDatos();
	//creamos a táboa das estatísticas.
	taboa ="<h2>ESTATÍSTICAS</h2><table><tr><th>NOME</th><th>XOGADAS</th><th>GAÑADAS</th><th>EMPATADAS</th><th>PERDIDAS</th></tr>";

	for(var i =0; i< marcador.length; i++)
	{
		taboa+="<tr>";
		for(var j =0; j< marcador[i].length;j++)
		{
			taboa+="<td>"+marcador[i][j]+"</td>";
		}
		taboa+="</tr>";
	}
	
	taboa+="</table>";
	seccion_estatistica.innerHTML = taboa;

}

function iniciarPartida() {
	colocadas = 0;
	rematar = false;
	//taboleiro de 3x3: taboleiro[fila][columna]
	var filas = 3;
	var columnas = 3;
	taboleiro = new Array(filas);
	for (var i=0; i<taboleiro.length; i++) {
		taboleiro[i] = new Array(columnas);
		for (var j=0; j<columnas; j++) {
			taboleiro[i][j] = '2'; 
			document.getElementById("cela" + i + j).innerHTML = "";
		}
	};
	quenda = sortearQuenda();	// 0:ordenador, 1:xogador
	if (quenda) {
		quendaXogador.textContent = nomeXogador;
	} else {
		quendaXogador.textContent = "ordenador";
		xogarMaquina();
	} 
}

function sortearQuenda() {
	return Math.round(Math.random());
}

//xogarMaquina: xeramos posicións aleatorias para que xogue a máquina
function xogarMaquina() {
	informacion.innerHTML = "DECIDINDO A XOGADA ";
	retardo = Math.floor(Math.random()*10);
	//ensinamos a mensaxe de espera mentres o ordenador non coloca a súa peza.
		document.getElementById("informe").classList.remove("oculta");
		document.getElementById("informe").classList.remove("error");
		document.getElementById("informe").classList.add("visibel");
		document.getElementById("informe").classList.add("notice");
	var tempo = setInterval(function () { 
				informacion.innerHTML+=" . ";
		if (retardo < 0) {
			clearInterval(tempo);
			do {
				fila = Math.floor(Math.random()*3);
				columna = Math.floor(Math.random()*3);	

			} while (taboleiro[fila][columna] != '2');
			colocarFicha(fila,columna);
			//eliminamos a mensaxe de espera unha vez coloca a ficha do ordenador.
			document.getElementById("informe").classList.remove("visibel");
			document.getElementById("informe").classList.add("oculta");
		}	
		retardo--;
	}, 500);
}

function colocarFicha(fila,columna) {
	//...
			if(quenda == 0 )
			{
				console.log("-----> quenda de 0");

			}else{
				console.log("-----> quenda de 1");
			}

			if(rematar)
			{
				alert("A partida rematou. Acepta para comezar unha nova!");
				iniciarPartida();
			}else
			{

			if(taboleiro[fila][columna] != 2)
			{
				console.log("trampa");
				document.getElementById("informe").classList.remove("oculta");
				document.getElementById("informe").classList.remove("notice");
				document.getElementById("informe").classList.add("visibel");
				document.getElementById("informe").classList.add("error");
				informacion.innerHTML = nomeXogador+", NON FAGAS TRAMPA ";
			}else{

		taboleiro[fila][columna] = quenda;
		document.getElementById("cela" + fila + columna).innerHTML = "<figure><img id='imaxe" + fila + columna + "' src='./imaxes/" + quenda + ".png'></figure>"; 
		colocadas++;
		comprobar(fila,columna);
		if (!rematar) {
			if (quenda) {
				quenda = 0;
				quendaXogador.textContent = "ordenador";
				xogarMaquina();
			} else {
				quenda = 1;
				quendaXogador.textContent = nomeXogador;
			}
		}
	}
}
	//...	
}

function comprobar(fila,columna) {

	console.log(fila);
	console.log(columna);
	 if (quenda == 0)
	 {
	 	taboleiro[fila][columna] = 0;
	 }

	 if (quenda == 1)
	 {
	 	taboleiro[fila][columna] = 1;
	 }

	 //comprobación 
	/* if((taboleiro[fila][0] == quenda) && (taboleiro[fila][1] == quenda) && (taboleiro[fila][2] == quenda))
	 {
	 	linha = "fila";
	 	rematarPartida(true,linha,fila);
	 }

	 if((taboleiro[0][columna] == quenda) && (taboleiro[1][columna] == quenda) && (taboleiro[2][columna] == quenda))
	 {
	 	linha = "columna";
	 	rematarPartida(true,linha,columna);
	 }
	 if((taboleiro[0][0] == quenda) && (taboleiro[1][1] == quenda) && (taboleiro[2][2] == quenda))
	 {
	 	linha = "diagonal";
	 	rematarPartida(true, linha);
	 } 
	 if((taboleiro[2][0] == quenda) && (taboleiro[1][1] == quenda) && (taboleiro[0][2] == quenda))
	 {
	 	linha = "inversa";
	 	rematarPartida(true,linha);
	 }
	 else if (colocadas == 9)
	 {
	 	rematarPartida(false);
	 }*/
	 	
	 	for (var i = 0; i < 3; i++)
	 	{
	 		if ((taboleiro[i][0] == quenda) && (taboleiro[i][1] == quenda) && (taboleiro[i][2] == quenda))
	 		{
	 			linha = "fila";
	 			rematarPartida(true,linha,fila);
	 		}

	 		else if ((taboleiro[0][i] == quenda) && (taboleiro[1][i] == quenda) && (taboleiro[2][i] == quenda))
	 		{
	 			linha = "columna";
	 			rematarPartida(true,linha,columna);
	 		}
		}

	 	if((taboleiro[0][0] == quenda) && (taboleiro[1][1] == quenda) && (taboleiro[2][2] == quenda))
		{
		 	linha = "diagonal";
		 	rematarPartida(true, linha);
		 } 
		else if((taboleiro[2][0] == quenda) && (taboleiro[1][1] == quenda) && (taboleiro[0][2] == quenda))
		{
		 	linha = "inversa";
		 	rematarPartida(true,linha);
		 }
		else if(colocadas == 9)
		{
	 		rematarPartida(false);
	 	}
	
}

function rematarPartida(invictus,cal,indice) {

	console.log("liña-->"+cal+" col/fila-->"+indice);
	console.log("ACABOUSE GAÑA --> " +quenda);

	actualizarMarcador(quendaXogador.textContent,invictus);
	if (invictus) {
		quendaXogador.textContent = "GAÑOU " + quendaXogador.textContent;
		marcarPezas(cal,indice);
	} else {
		quendaXogador.textContent = "EMPATE";
	}
	rematar = true;
}

function marcarPezas(cal,indice) {
	if (cal == "fila") {
		for (var j=0; j<taboleiro[indice].length; j++) {
			document.getElementById("imaxe" + indice + j).classList.add("parpadear");
		}
	}
	if (cal == "columna") {
		for (var i=0; i<taboleiro[indice].length; i++) {
			document.getElementById("imaxe" + i + indice).classList.add("parpadear");
		}
	}
	if (cal == "diagonal") {
		for (var i=0; i<taboleiro.length; i++) {
			document.getElementById("imaxe" + i + i).classList.add("parpadear");
		}
	}
	if (cal == "inversa") {
		for (var i=0; i<taboleiro.length; i++) {
			document.getElementById("imaxe" + i + (2-i)).classList.add("parpadear");
		}
	}
}

function actualizarMarcador(xogador,invictus) {
	console.log("actualizar xogador--> "+ xogador);
	console.log("actualizar invictus--> "+ invictus);

		for(var i =0; i < marcador.length;i++)
			{
				if (marcador[i][0] == nomeXogador)
				 {
				 	marcador[i][1] ++;
				 	console.log("marcador ++ -->"+marcador[i][1]);

				 	if (invictus && xogador == nomeXogador)
				 	{
				 		marcador[i][2] ++; 
				 	}
				 	else if (!invictus)
				 	{
				 		marcador[i][3] ++;
				 	}
				 	else if (invictus && xogador == "ordenador")
				 	{
				 		marcador[i][4] ++;
				 	}
				 }
			}
	
}

function ordearDatos() {
	marcador.sort((function(index) {
    							return function(a,b) {
        						return (a[index] === b[index] ? 0 : (a[index] > b[index] ? -1 : 1));
    							};
								})(2)); // 2 é o índice no vector que representa a columna pola que se ordea
}
