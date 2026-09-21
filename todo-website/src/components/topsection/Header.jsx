/**
 * A component that is the header of the website.
 *
 * Contains a h1 and a p for the tagline
 *
 * @returns {React.ReactElement}
 */
function Header() {
  return (
    <header>
      <div className="header-div">
        <h1>TODO WEBSITE</h1>
      </div>
      <div className="tagline-div">
        <p>Just Do It!</p>
      </div>
    </header>
  );
}

export default Header;
