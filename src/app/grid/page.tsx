//to do- fazer que quando digitado o input do numero de colunas ou do numero de linhas espero uns segundos para só depois chamar a função gerarMatrix 
//to do- fazer que uma variavel global no CSS :root para tentar diminuir o tempo de renderização de inumeros componentes.

'use client'
import React, { useState, useMemo } from 'react';
import styles from './styles.module.css';

//import Image from "next/image";
import TokenGenerator from '../components/tokenGenerator';
//import useDebounce from '../utils/debounce';

// https://preview.redd.it/ldk93bpvpd491.jpg?auto=webp&s=4738d8c01b50d64c2e78113e1a2f1330f1fd58e5

export default function Grid() {
	const [manyLines, setManyLines] = useState<number>(0);
	const [squaresPerLine, setSquaresPerLine] = useState<number>(0);
	const [squareSize, setSquareSize] = useState<number>(100);

	const [backgroundURL, setBackgroundURL] = useState<string>('');

	const squareMatrix = useMemo(() => {
		return generateMatrix(manyLines, squaresPerLine)
	}, [manyLines, squaresPerLine])
	// devemos usar o debounce somente quando temos mais de 100 linha * 100 colunas
	//const debounceChange = useDebounce(500);
	/*
	const handleChange = (string: string, setState: React.Dispatch<React.SetStateAction<string | number>>, middleware: React.Dispatch<React.SetStateAction<string | number>>) => {
		setState(Number(string));
		debounceChange(setState, string, middleware);// setNumberInState
	}*/


	// event has type React.ChangeEvent<HTMLInputElement>
	const middlewareSetNumberInState = (string: string, setState: React.Dispatch<React.SetStateAction<number>>) => {
		
		if(manyLines == 0) { 
			setManyLines(1)
		}
		if(squaresPerLine == 0) {
			setSquaresPerLine(1)
		}
		const number = Number(string);
		/*
		if(number <= 5 && setState == setSquareSize) {
			number = 35
		}*/

		// the html attribute "max" don't function corretly if you type a number more than that number.
		const max300 = number >= 300 ? 300 : number
    	setState(max300)
  	};
	// esse for for está muito demorado gerando toda vez que a pagina é atualizada.
	// podemos usar o CSS counter-increment: e o counter-reset para dar os valores das linhas e colunas.
	//plano é fazer uma memoização, useMemo e só carregar a parte mostrada na tela e escalonamento de com cada elemento 
	function generateMatrix(manyLines: number, squaresPerLine: number) {
		//300 * 300 =3100 - 3300
		console.time()
		const matriz: React.JSX.Element[] = [];

		for (let i = 0; i < manyLines; i++) {
		  
		  const linha: React.JSX.Element[] = [];
		  for (let j = 0; j < squaresPerLine; j++) {
			linha.push(
			  <div key={`${i}-${j}`} className="square">
				{i + 1}- {j + 1}
			  </div>
			);
		  }
		  matriz.push(
			<div key={`linha-${i}`} className="line">
			  {linha}
			</div>
		  );
		}
		console.timeEnd()
		return matriz
	};

	
	return (
		<div className={styles.menu}>
			<div key="grid-options" >
				<label htmlFor="column">column:</label>
				<input id="column" type="number" min="0" max="300" onChange={(e) => middlewareSetNumberInState(e.target.value, setSquaresPerLine)} value={squaresPerLine} className={styles.inputNum}/>
				<label htmlFor="line">line:</label>
				<input id="line" type="number" min="0" max="300" onChange={(e) => middlewareSetNumberInState(e.target.value, setManyLines)} value={manyLines} className={styles.inputNum}/>
				<label htmlFor="size">size:</label>
				<input id="size" type="number" min="10" max="300" onChange={(e) => middlewareSetNumberInState(e.target.value, setSquareSize)} value={squareSize} className={styles.inputNum}/>
				<label htmlFor="battleMap">battle map:</label>
				<input type="url" placeholder="battlemap URL..."  onChange={(e) => setBackgroundURL(e.target.value)} value={backgroundURL} />
				<span> or </span>
				<input type="file" accept="image/png, image/jpeg" />
			</div>
			{squareSize > 0 && 
				<TokenGenerator squareSize={Number(squareSize)}/>
			}
			{backgroundURL && 
				<img alt="battle map" className={styles.background} src={backgroundURL}/>
			}
			<div className="allGrid" style={{ width: squareSize*squaresPerLine, height: squareSize*manyLines}} >
				{squareMatrix}
			</div>

		</div>
	);
}