import {Link} from "react-router-dom";

const Home: React.FC = () : React.JSX.Element => {
    return(<>
          <Link to="/signup">
              <button>SignUp</button>
          </Link>
          <Link to="/login">
               <button className="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900">Login</button>
          </Link>
    </>)
}

export default Home;