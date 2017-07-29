export default ({ message }) =>
  <aside>
    {message}
    <style jsx>{`
      aside {
        padding: 1.5em;
        font-size: 14px;
        color: white;
        background-color: #18bc9c;
      }
    `}</style>
  </aside>;
