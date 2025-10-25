import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div>
      <h1 className="text-3xl text-red-700 font-bold">
        Your are not authorized{" "}
      </h1>
      <p>Please go to home page</p>
      <Link type="button" to="/">
        Home
      </Link>
    </div>
  );
};

export default Unauthorized;
