Funci�n newpicas <- cacularPicas (clave,intento,i,picas)
	newpicas <- picas
	Para j<-1 Hasta 4 Con Paso +1 Hacer
		Si Subcadena(ConvertirATexto(clave),i,i)=Subcadena(ConvertirATexto(intento),j,j) Entonces
			newpicas <- newpicas+1
		FinSi
	FinPara
FinFunci�n

Funci�n mensaje <- MensajeFinal (contadorIntentos)
	Escribir contadorIntentos
	Seg�n contadorIntentos Hacer
		1, 2:
			mensaje <- 'Excelente, eres un maestro estas fuera del alcance de los dem�s'
		3, 4:
			mensaje <- 'Muy bueno, puedes ser un gran competidor'
		5, 6, 7, 8:
			mensaje <- 'Bien, estas progresando debes buscar tus l�mites'
		9, 10, 11:
			mensaje <- 'Regular, A�n es largo el camino por recorrer'
		De Otro Modo:
			mensaje <- 'Mal, este juego no es para ti'
	FinSeg�n
FinFunci�n

// Algoritmo del juego de Picas y Fijas
Algoritmo PicasYFijas
	Definir clave Como Entero
	Definir intento, contadorIntentos, picas, fijas Como Entero
	Definir finjuego Como L�gico
	contadorIntentos <- 0
	clave <- Aleatorio(1000,9999)
	finjuego <- Falso // Genera el n�mero secreto sin d�gitos repetidos
	Mientras contadorIntentos<12 Y finjuego=Falso Hacer
		contadorIntentos <- contadorIntentos+1
		Repetir
			Escribir 'Intento #', contadorIntentos, ': Ingresa un n�mero de 4 d�gitos:'
			Leer intento
			// Convierte el n�mero ingresado a cadena para comparar cada d�gito
			Si Longitud(ConvertirATexto(intento))<>4 Entonces
				Escribir 'El n�mero debe tener exactamente 4 d�gitos. Intenta de nuevo.'
				contadorIntentos <- contadorIntentos-1
			FinSi
		Hasta Que Longitud(ConvertirATexto(intento))=4
		// Calcula picas y fijas
		picas <- 0
		fijas <- 0
		Para i<-1 Hasta 4 Con Paso +1 Hacer
			Si Subcadena(ConvertirATexto(clave),i,i)=Subcadena(ConvertirATexto(intento),i,i) Entonces
				fijas <- fijas+1
			FinSi
			picas <- cacularPicas(clave,intento,i,picas)
		FinPara
		// Muestra el resultado del intento
		Escribir 'Picas: ', picas, ', Fijas: ', fijas
		// Comprueba si ha ganado
		Si fijas=4 O contadorIntentos=12 Entonces
			finjuego <- Verdadero
			mensaje <- MensajeFinal(contadorIntentos)
			Escribir mensaje
		FinSi
	FinMientras
FinAlgoritmo
