export default function Home({ onYes }) {
  const gumroad = import.meta.env.VITE_GUMROAD_URL || "https://gumroad.com";

  return (
    <section className="hero">
      <div className="content">
        <div className="card">
          <h1 className="title">Create a musical greeting or love confession with AI</h1>
          <p className="subtitle">
            Write the lyrics with our assistant, pick a style, optionally upload your voice, and we’ll generate a 1-minute music video.
          </p>

          <div className="card stack">
            <p className="white" style={{margin:0, fontWeight:600}}>Do you have a QR code?</p>
            <div className="row">
              <button className="btn btn-primary" onClick={onYes}>Yes</button>
              <a className="btn btn-ghost" href={gumroad}>No — Buy access ($30)</a>
            </div>
          </div>

          <p className="small mt">
            Your QR is validated once, then linked to the final video. Offline buyers use QR; online buyers go straight to creation.
          </p>
        </div>
      </div>
    </section>
  );
}
