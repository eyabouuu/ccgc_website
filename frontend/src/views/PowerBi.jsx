import React from 'react';

const PowerBIEmbed = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col gap-6 p-4">
      <h2 className="text-2xl font-semibold">Tableau de bord - Power BI</h2>

      <div className="w-full max-w-4xl aspect-video shadow-xl rounded-2xl overflow-hidden">
        <iframe
          title="pfe_tutti"
          width="100%"
          height="100%"
          src="https://app.powerbi.com/view?r=eyJrIjoiYzI2MTg3NTQtNDQ2ZC00Yzk3LTk5MTgtY2I4NDk1NWI4NTFjIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <a
        href="https://app.powerbi.com/view?r=eyJrIjoiYzI2MTg3NTQtNDQ2ZC00Yzk3LTk5MTgtY2I4NDk1NWI4NTFjIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Ouvrir le rapport dans une nouvelle page ↗
      </a>
    </div>
  );
};

export default PowerBIEmbed;
