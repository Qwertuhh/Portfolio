function Navbar() {
  return (
    <nav className="flex flex-row justify-center items-center p-4 h-[var(--navbar-height)]">
      <div className="flex flex-row items-center justify-between gap-4 border-2 border-black rounded-full w-[var(--main-width)]">
        <img
          src="./profile-image/neutral_qwertuhh.svg"
          alt="neutral qwertuhh logo"
          className="w-16"
        />
        <div className="mx-auto">
          <ul className="flex flex-row gap-14 cascadia-code-semibold">
            <li>About me</li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
