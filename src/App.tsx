import Container from "./components/Container";
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
				<Route path="/page/:pageNumber" Component={Container} />
				<Route path="/" element={<Navigate to="/page/1" />} />
				<Route path="/page" element={<Navigate to="/page/1" />} />
			</Routes>
		</Router>
	);
}

export default App;
