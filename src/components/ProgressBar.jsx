function ProgressBar({ subtotal, threshold }) {
  const progress = Math.min((subtotal / threshold) * 100, 100);

  return (
    <div className="progress-container">
      <div className="progress-labels">
        <span>₹{subtotal}</span>
        <span>₹{threshold} for free gift</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      {subtotal < threshold && (
        <p className="progress-message">
          Add ₹{threshold - subtotal} more to get a free gift!
        </p>
      )}
    </div>
  );
}

export default ProgressBar;
