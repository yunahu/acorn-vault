import { createGlobalStyle } from 'styled-components';

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

	input {
		border: 1px solid ${({ theme }) => theme.colors.border};

		&:focus {
    	outline: 1px solid ${({ theme }) => theme.colors.primary};
    	box-shadow: 0 0 8px rgba(44, 76, 59, 0.6);
  	}
	}

	.ant-table-cell:has(> input) {
		padding: 0px  !important;
	}
`;

export default GlobalStyle;
