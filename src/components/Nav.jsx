import { Link } from "react-router";

export default function Nav() {
  const navItems = [
    {
      name: "首頁",
      link: "/",
    },
    {
      name: "產品頁",
      link: "/products",
    },
    {
      name: "購物車頁",
      link: "/cart",
    },
  ];
  return (
    <div className="d-flex justify-content-center">
      <ul className="nav mt-5 mb-5">
        {navItems.map((item, i) => {
          const { name, link } = item;
          return (
            <li key={i} className="nav-item ms-5">
              <Link className="nav-link " to={link}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
