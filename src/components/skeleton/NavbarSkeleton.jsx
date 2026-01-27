const NavbarSkeleton = () => {
  return (
    <nav className="border-b sticky top-0 z-50 bg-base-100">
      <div className="navbar container mx-auto px-4">
        {/* LEFT */}
        <div className="navbar-start flex items-center gap-3">
          {/* Mobile menu */}
          <div className="skeleton h-9 w-9 rounded-md lg:hidden"></div>

          {/* Logo */}
          <div className="flex flex-col gap-1">
            <div className="skeleton h-5 w-28"></div>
            <div className="skeleton h-3 w-16"></div>
          </div>
        </div>

        {/* CENTER (Desktop menu) */}
        <div className="navbar-center hidden lg:flex gap-6">
          <div className="skeleton h-4 w-14"></div>
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-24"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>

        {/* RIGHT */}
        <div className="navbar-end flex items-center gap-3">
          {/* Theme toggle */}
          <div className="skeleton h-9 w-9 rounded-full"></div>

          {/* Buttons */}
          <div className="hidden sm:flex gap-2">
            <div className="skeleton h-9 w-20 rounded-lg"></div>
            <div className="skeleton h-9 w-24 rounded-xl"></div>
          </div>

          {/* Avatar */}
          <div className="skeleton h-10 w-10 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSkeleton;
