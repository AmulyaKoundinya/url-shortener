function StatsCards({ stats }) {

  const cards = [
    ["TOTAL LINKS", stats.total_links || 0],
    ["TOTAL CLICKS", stats.total_clicks || 0],
    ["TOP URL CLICKS", stats.top_clicks || 0],
    ["CREATED TODAY", stats.created_today || 0]
  ];

  return (
    <div className="stats-grid">

      {cards.map((card, index) => (
        <div className="card stat-card" key={index}>
          <p>{card[0]}</p>
          <h2>{card[1]}</h2>
        </div>
      ))}

    </div>
  );
}

export default StatsCards;