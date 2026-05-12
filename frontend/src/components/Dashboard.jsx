function Dashboard({ links, reload }) {

  const deleteLink = async (code) => {

    await fetch(`/api/delete/${code}`, {
      method: "DELETE"
    });

    reload();
  };

  return (
    <div className="card table-card">

      <div className="table-header">
        <h3>ALL LINKS</h3>
      </div>

      <table>

        <thead>
          <tr>
            <th>#</th>
            <th>SHORT LINK</th>
            <th>ORIGINAL URL</th>
            <th>CLICKS</th>
            <th>CREATED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>

          {links.map((link, index) => (

            <tr key={link.code}>

              <td>{index + 1}</td>

              <td>
                <a
                  href={`/${link.code}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.code}
                </a>
              </td>

              <td style={{ maxWidth: "300px" }}>

                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block"
                  }}
                >
                  {link.url}
                </span>

              </td>

              <td>{link.clicks}</td>

              <td>{link.created}</td>

              <td>

                <button
                  className="delete-btn"
                  onClick={() => deleteLink(link.code)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Dashboard;