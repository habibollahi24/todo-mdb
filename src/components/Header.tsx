import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="text-center p-6 text-3xl text-secondary-300 font-semibold">
      <Link href="/">Todo App</Link>
    </div>
  );
}

export default Header;
