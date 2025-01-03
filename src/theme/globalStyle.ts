import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
		font-family: "Inter", sans-serif;
	}

	#root {
		min-height: 100dvh;
		display: flex;
	}

	a {
		text-decoration: none;
		color: black;
	}
`;

export default GlobalStyle;
