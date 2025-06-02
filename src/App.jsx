import './App.css'
import ListEmployeeComponent from "./components/List.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginComponent from "./components/LoginComponent.jsx";
import EmployeeComponent from "./components/Todo.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <HeaderComponent />
            <Routes>
                <Route path='/' element = {<LoginComponent />}></Route>
                <Route path='/todos' element = {<ListEmployeeComponent />}></Route>
                <Route path='/add-todo' element = {<EmployeeComponent />}></Route>
                <Route path='/update-todo/:id' element={<EmployeeComponent />}></Route>
            </Routes>
            <FooterComponent />
        </BrowserRouter>
    </>
  )
}

export default App
