import Link from "next/link";

export default ({ pathname, authenticated, query = false }) =>
  <header>
    <Link prefetch href="/">
      <a className={pathname === "/" && "is-active"}>Home</a>
    </Link>

    {authenticated &&
      <Link prefetch href="/user">
        <a className={pathname === "/user" && !query && "is-active"}>Profile</a>
      </Link>}

    {!authenticated &&
      <Link prefetch href="/auth/login">
        <a className={pathname === "/auth/login" && "is-active"}>Login</a>
      </Link>}

    {!authenticated &&
      <Link prefetch href="/auth/register">
        <a className={pathname === "/auth/register" && "is-active"}>Register</a>
      </Link>}

    {authenticated &&
      <Link prefetch href="/auth/logout">
        <a className={pathname === "/auth/logout" && "is-active"}>Logout</a>
      </Link>}

    <style jsx>{`
      header {
        margin-bottom: 25px;
      }
      a {
        font-size: 14px;
        margin-right: 15px;
        text-decoration: none;
      }
      .is-active {
        text-decoration: underline;
      }
    `}</style>
  </header>;
