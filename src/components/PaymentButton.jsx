import React from 'react';

export default function PaymentButton({ lang }) {
  const t = {
    en: "Buy for $10",
    ru: "Купить за $10",
    es: "Comprar por $10",
    de: "Kaufen für 10 $",
    fr: "Acheter pour 10 $",
    it: "Compra per 10 $"
  };

  return (
    <a
      href="https://gumroad.com/l/wishclip"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        padding: '12px 24px',
        background: '#5a00b8',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '16px',
        marginTop: '20px'
      }}
    >
      {t[lang] || t.en}
    </a>
  );
}
