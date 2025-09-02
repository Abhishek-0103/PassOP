const Navbar = () => {
  return (
    <nav className="bg-purple-700 flex justify-between items-center px-6 py-2 sticky top-0 z-10">
      <h1 className="text-white font-bold text-2xl">PassOP</h1>
      <a href="https://github.com/Abhishek-0103/PassOP" target="blank">
        <div className="flex items-center justify-center bg-purple-950 px-2 gap-1 py-1 rounded-4xl text-white font-medium mr-10 border border-purple-200">
          <img className="w-8" src="/icons/github.svg" alt="GitHub" />
          <p className="text-sm pr-1 ">GitHub</p>
        </div>
      </a>
    </nav>
  );
};

export default Navbar;
