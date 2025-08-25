import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="hero">
      <div className="overlay">
        <h1>Wishclip — AI music video gifts</h1>
        <p className="desc">
          Create a personalized song and music video gift. Start by confirming
          your access QR code or buy access.
        </p>

        <div className="question">Do you have a QR code?</div>
        <div className="btns">
          <button className="yes" onClick={() => nav("/qr")}>Yes</button>
          <button
            className="no"
            onClick={() =>
              (window.location.href = "https://gumroad.com/your_product_link")
            }
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
