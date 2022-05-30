import "./App.css";
import NotesPage from "./pages/notes/notes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<NotesPage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer autoClose={1200} hideProgressBar={true} />
      </div>
    </>
  );
}

export default App;
