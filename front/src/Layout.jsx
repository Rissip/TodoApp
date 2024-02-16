import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="">
      <nav className="">
        <ul className="">
          <Link to="/" className="">
            Home
          </Link>
          <Link to="/todo" className="">
            Todo
          </Link>
          <Link to="/category" className="">
            Category
          </Link>
        </ul>
      </nav>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
