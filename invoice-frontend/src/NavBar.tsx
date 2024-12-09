import React from "react";
import { NavLink } from "react-router-dom";

type Props = {};

const navLinks = [
  {
    name: "Home",
    relativeUrl: "/",
  },
  {
    name: "Customers",
    relativeUrl: "/customers",
  },
  {
    name: "Invoices",
    relativeUrl: "/invoices",
  },
  {
    name: "Overdue invoices",
    relativeUrl: "/overdueInvoices",
  },
];

const NavBar = (props: Props) => {
  return (
    <div id="navbar">
      <ul>
        {navLinks.map((link, i) => (
          <NavRow key={i} name={link.name} url={link.relativeUrl} />
        ))}
      </ul>
    </div>
  );
};

type NavLinkProps = {
  name: string;
  url: string;
};
const NavRow = (props: NavLinkProps) => {
  return <NavLink to={props.url}>{props.name}</NavLink>;
};

export default NavBar;
