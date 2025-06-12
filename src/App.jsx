import './App.css'
import ListEmployeeComponent from "./components/ListComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginComponent from "./components/LoginComponent.jsx";
import EmployeeComponent from "./components/TodoComponent.jsx";
import CreateUserComponent from "./components/CreateUserComponent.jsx";
import HomeComponent from "./components/HomeComponent.jsx";
import {getRole, getToken} from "./services/AuthService.JS";

function App() {

    function AuthenticatedRoute({children}) {
        const token = getToken();
        const isAuth = Boolean(token);
        if (isAuth) {
            return children
        }
        return <Navigate to="/login" />;
    }

    function AuthenticatedAdminRoute({children}) {
        const token = getToken();
        const isAuth = Boolean(token);
        if (isAuth) {
            const role = getRole();
            if(['ROLE_ADMIN', 'ROLE_MANAGER'].includes(role)) {
                return children
            } else {
                return <Navigate to="/todos" />
            }
        }
    }

  return (
    <>
        <BrowserRouter>
            <HeaderComponent />
            <Routes>
                <Route path='/todos' element = {<AuthenticatedRoute><ListEmployeeComponent/></AuthenticatedRoute>}></Route>
                <Route path='/add-todo' element = {<AuthenticatedRoute><EmployeeComponent/></AuthenticatedRoute>}></Route>
                <Route path='/update-todo/:id' element={<AuthenticatedRoute><EmployeeComponent/></AuthenticatedRoute>}></Route>
                <Route path='/create-user' element = {<AuthenticatedAdminRoute><CreateUserComponent /></AuthenticatedAdminRoute>}></Route>
                <Route path='/' element = {<HomeComponent />}></Route>
                <Route path='/login' element = {<LoginComponent />}></Route>
            </Routes>
            <FooterComponent />
        </BrowserRouter>
    </>
  )
}

export default App
