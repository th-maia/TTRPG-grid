'use client'
import React, { useState } from 'react';
//import styles from './tokens.module.css';
import tokenMovement from '../utils/tokenMoviment';
//import Image from "next/image";


export default function TokenGenerator(props: { squareSize: number}) {
	const [tokenImage, setTokenImage] = useState<string>('');
	const [token, setToken] = useState<string[]>([]);
	
	//const tokenId = 0;

	// https://preview.redd.it/0e630cf3sqd91.png?width=1080&crop=smart&auto=webp&s=f6da303d41cad8c970ff9d31c8f17028d31bf785
    const createToken = (tokenURL: string | undefined) => {
		const battleMap = document.getElementById("tokenMenu");
		if (tokenURL && battleMap) {
			setToken([
				...token,
				tokenURL // Put old items at the end
			]);
		}
	};

	return (
		<div className="tokenBox">
			<div id="tokenMenu">
				<input type="url" placeholder="token image URL..." onChange={(e) => setTokenImage(e.target.value)} value={tokenImage}/>
					{tokenImage &&
						<img alt="token preview" src={tokenImage} style={{ height: props.squareSize, width: props.squareSize}}/>
					}
				<button onClick={() => createToken(tokenImage)}>CREATE TOKEN</button>
			</div>
			<div>
				{token.map((e, i)=> {
					return (
							<img alt="token image" key={'token'+i} id={`token${i}`} className="token" src={e} style={{ height: props.squareSize, width: props.squareSize}} onMouseDown={(e) => tokenMovement(e)}/>
					)
				})}
			</div>
		</div>
	);
}