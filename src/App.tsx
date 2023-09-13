import CardContainer from "./components/CardContainer";
import DetailContainer from "./components/DetailContainer";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import "./App.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/page/:pageNumber" Component={CardContainer} />
				<Route path="/" element={<Navigate to="/page/1" />} />
				<Route path="/page" element={<Navigate to="/page/1" />} />
				<Route path="/detail/:id" Component={DetailContainer} />
			</Routes>
		</Router>
	);
}

export default App;
