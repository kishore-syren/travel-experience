import {Link} from "react-router-dom";

const Home: React.FC = () : React.JSX.Element => {
    return(<>
          <Link to="/signup">
              <button>SignUp</button>
          </Link>
          <Link to="/login">
               <button>Login</button>
          </Link>
    </>)
}

export default Home;