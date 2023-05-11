
import { any } from 'joi';
import { createContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import IsBizOnly from './Auth/isBizOnly';
import RouteGuard from './Auth/RouteGuard';
import Signin from './Auth/Signin';
import Signup, { ISignupData } from './Auth/Signup';
import { setToken } from './Auth/Token';
import AllCardsList from './components/AllCardsList';
import Business from './Auth/Business';
import Businesscard from './components/Businesscard';
import Footer from './components/Footer';
import Header from './components/Header';
import MyFavorCards from './components/MyFavorCards';
import OneCard from './pages/Cards/OneCard';
import About from './pages/About/About';
import CardsList from './pages/Cards/CardsList';
import Edit from './components/Edit';
import Home from './pages/Home/Home';
import { getRequest, postRequest, postRequest2 } from './services/apiService';
import AllUsers from './pages/Users/AllUsers';
import ShowUser from './pages/Users/ShowUser';
import Info from './components/Info';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ArrayOfFavCards from './components/ArrayOfFavCards';
// import IsAdmin from './Auth/IsAdmin';

interface ISignupDatar {
  email: string,
  password: string,
  // isBiz?: Boolean,
}

interface ISignupDatar2 {
  email: string,
  password: string,
  // isBiz?: Boolean,
}
interface Context {
  isBiz: boolean;
  handleLogout: Function;
  signin: Function;
  signin2: Function;
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
          toast.error('no such user. Go to sign up', {
            position: toast.POSITION.TOP_CENTER
          });
          // toast.error("no such user. Go to sign up")
          // navigate('/signup')
         
        } else {
          setToken(json.token);
          setUserName(json.user)
          setISBiz(json.isBiz);
          setAdmin(json.isAdmin);
          setUserName(json.id)
          navigate('/myFavorCards')
        }
      }).catch((error) => {
        console.log(error)
      }
      )
  }




  function signin2(data:ISignupDatar2) {
    const res = postRequest2(
      'users/signin2',
      data, 
      false
    );
    if (!res) return;
    res.then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          console.log('Hello')
          toast.error('no such user. Go to sign up', {
            position: toast.POSITION.TOP_CENTER
          });
          // toast.error("no such user. Go to sign up")
          // navigate('/signup')
          
        } else {
         
          setToken(json.token);
          setUserName(json.user)
          setISBiz(json.isBiz);
          setAdmin(json.isAdmin);
          setUserName(json.id)
          // navigate('/resetpassword')
        }
      }).catch((error) => {
        console.log(error)
      }
      )
  }
  
  useEffect(() => {
    handleLogout()
  }, []);

  // function logoyyyu() {
  //   const timer = setTimeout(() => {
  //     console.log('This will run after 1 second!')
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }
 

  
  
  function handleLogout() {
      setISBiz(false);
      setUserName('');
      navigate('/');
  }

  return (

    <>
      <AppContext.Provider value={{
        isBiz,
        userName,
        handleLogout,
        signin,
        signin2,
        isAdmin,
       
       
       
      }}>

       
        <Header />
        <ToastContainer />
        <Routes>
        {/* <Route
            path='/'
            element={<Main />}
          /> */}
          <Route
            path='/'
            element={<Home />}
            
          />
           <Route
            path='/arrayOfFavCards/:id'
            element={<ArrayOfFavCards />}
            
          />
           <Route
            path='/resetpassword'
            element={<ResetPassword handler2={signin2}
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
          {/* <Route
            path='/IsAdmin'
            element={<IsAdmin />}
          /> */}
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
