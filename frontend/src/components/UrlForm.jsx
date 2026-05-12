import { useState } from "react";

function UrlForm({ reload }) {

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shorten = async () => {

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await res.json();

    setShortUrl(data.short_url);

    setUrl("");

    reload();
  };

  return (
    <div className="card form-card">

      <h3>SHORTEN A URL</h3>

      <div className="form-row">

        <input
          type="text"
          placeholder="https://your-long-url.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={shorten}>
          Shorten
        </button>

      </div>

      {shortUrl && (
        <a
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
        >
          {shortUrl}
        </a>
      )}

    </div>
  );
}

export default UrlForm;