import Container from "./components/Container";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/page/:pageNumber" Component={Container} />
			</Routes>
		</Router>
	);
}

export default App;
