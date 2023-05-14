
import { any } from 'joi';
import { createContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import IsBizOnly from './pages/Auth/isBizOnly';
import RouteGuard from './pages/Auth/RouteGuard';
import Signin from './pages/Auth/Signin';
import Signup, { ISignupData } from './pages/Auth/Signup';
import { setToken } from './pages/Auth/Token';
import AllCardsList from './components/AllCardsList';
import Business from './pages/Auth/SignupBusiness';
import Businesscard from './pages/Cards/CreateCard';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MyFavorCards from './pages/FavoriteCards/MyFavorCards';
import OneCard from './pages/ShowOneCard/ShowOneCard';
import About from './pages/About/About';
import CardsList from './pages/Cards/CardsList';
import Edit from './components/EditCard';
import Home from './pages/Home/Home';
import {patchRequest, postRequest } from './services/apiService';
import AllUsers from './pages/Users/AllUsers';
import ShowUser from './pages/Users/ShowUser';
import Info from './pages/Info/Info';
import ResetPassword from './components/ResetPassword';
import Entarence from './pages/Entarence/Entarence';
interface ISignupDatar {
  email: string,
  password: string,
}
interface ISignupDatar2 {
  email: string,
  password: string,
}
interface Context {
  isBiz: boolean;
  handleLogout: Function;
  signin: Function;
  updatePassword: Function;
  userName: string;
  isAdmin: boolean;
}
export const AppContext = createContext<Context | null>(null);

function App() {
  const [isBiz, setISBiz] = useState<boolean>(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [isAdmin, setAdmin] = useState<boolean>(false);


  function signin(data: ISignupDatar) {
    const res = postRequest(
      'users/signin',
      data,
      false

    );
    if (!res) return;
    res.then(response => response.json())
      .then(json => {
        if (json.error) {
          toast.error(json.error, {
            position: toast.POSITION.TOP_CENTER
          });
        } else {
          setToken(json.token);
          setUserName(json.user)
          setISBiz(json.isBiz);
          setAdmin(json.isAdmin);
          setUserName(json.id)
          navigate('/myFavorCards')
          toast.success('Welcome' + ' ' + `${json.name}` + '!', {
            position: toast.POSITION.TOP_CENTER
        });
        }
      }).catch((error) => {
        console.log(error)
      }
      )
  }

  function updatePassword(data: ISignupDatar2) {
    const res = patchRequest(
      'users/newPassword',
      data,

    );
    if (!res) return;
    res.then(response => response.json())
      .then(json => {
        toast.success("Successully", {
          position: toast.POSITION.TOP_CENTER
        });
        console.log(json)
        if (json.error) {
          console.log('Hello')
          toast.error(json.error, {
            position: toast.POSITION.TOP_CENTER
          });
        } else {
          setToken(json.token);
          setUserName(json.user)
          setISBiz(json.isBiz);
          setAdmin(json.isAdmin);
          setUserName(json.id)
          navigate('/')
        }
      }).catch((error) => {
        console.log(error)
      }
      )
  }

  useEffect(() => {
    handleLogout()
  }, []);

  function handleLogout() {
    toast.success('Logout was successful,see you later', {
      position: toast.POSITION.TOP_CENTER
  });
    setISBiz(false);
    setUserName('');
    navigate('/entarence');
  }

  return (
    <>
      <AppContext.Provider value={{
        isBiz,
        userName,
        handleLogout,
        signin,
        updatePassword,
        isAdmin,
      }}>

        <Header />
        <ToastContainer />
        <Routes>
          <Route
            path='/entarence'
            element={<Entarence />}
          />
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/resetpassword'
            element={<ResetPassword resetPassword={updatePassword}
            />}
          />
          <Route
            path='/info'
            element={<Info />}
          />
          <Route
            path='/allcardslist'
            element={<AllCardsList title={''} subTitle={''} address={''} phone={''} image={{
              url: '',
              alt: ''
            }} category={''} CategoryClick={any} />}
          />
          <Route
            path='/signup'
            element={<Signup />}
          />
          <Route
            path='/signin'
            element={<Signin handler={signin}
              handleLog={handleLogout}
            />}
          />
          <Route
            path='/cardslist'
            element={
              <RouteGuard>
                <CardsList />
              </RouteGuard>
            }
          />
          <Route
            path='/business'
            element={<Business />}
          />
          <Route
            path='/myFavorCards'
            element={<MyFavorCards />}
          />
          <Route
            path='/AllUsers'
            element={<AllUsers />}
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/oneCard/:id'
            element={<OneCard />}
          />
          <Route
            path='/ShowUser/:id'
            element={
              <RouteGuard>
                <ShowUser />
              </RouteGuard>
            }
          />
          <Route
            path='/businesscard'
            element={<Businesscard />}
          />
          <Route
            path='/edit/:id'
            element={<RouteGuard>
              <Edit />
            </RouteGuard>}
          />
          <Route
            path='/isBiz'
            element={<IsBizOnly />}
          />
        </Routes>
        <Footer />
      </AppContext.Provider>
    </>
  );
}

export default App;
