export default ({ message }) =>
  <aside>
    {message}
    <style jsx>{`
      aside {
        padding: 1.5em;
        font-size: 14px;
        color: white;
        background-color: #db291c;
      }
    `}</style>
  </aside>;
