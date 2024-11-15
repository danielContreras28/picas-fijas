Algoritmo PiedraPapelTijera
	Definir victorias, derrotas, empates Como Entero
	victorias <- 0
	empates <- 0
	derrotas <- 0
	
	Repetir
		Escribir "Vamos a jugar piebra, papel o tijera"
		Escribir "para piedra ingresa 1"
		Escribir "para papel ingresa 2"
		Escribir "para tijeras ingresa 3"
		Escribir "para salir 4"
		
		eleccionMaquina <- Aleatorio(1,3)
		Leer eleccionUsuario
		
		Si eleccionMaquina = eleccionUsuario Entonces
			Escribir  "Es un empate. Ambos eligieron lo mismo"
			empates <- empates + 1
		SiNo
			Si(eleccionMaquina = 1 y eleccionUsuario = 2) o (eleccionMaquina = 2 y eleccionUsuario = 3) o (eleccionMaquina = 3 y eleccionUsuario = 1) Entonces
				Escribir "!Ganaste!"
				victorias <- victorias +1
			SiNo
				Escribir "!perdiste¡"
				derrotas <- derrotas + 1
			FinSi
		FinSi
		
		Escribir  "Victorias:", victorias, " Empates:", empates, " Derrotas:", derrotas
		
	Hasta Que eleccionUsuario <> 1 y eleccionUsuario <> 2 y eleccionUsuario <> 3
	
FinAlgoritmo
