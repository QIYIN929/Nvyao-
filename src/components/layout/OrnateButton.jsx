export default function OrnateButton({ children, onClick, className = '' }) {
  return (
    <button type="button" className={`ornate-btn ${className}`} onClick={onClick}>
      <svg className="ornate-btn-frame" viewBox="0 0 200 48" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M8 24 L20 10 L180 10 L192 24 L180 38 L20 38 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M14 24 L22 16 L178 16 L186 24 L178 32 L22 32 Z" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
      </svg>
      <span className="ornate-btn-label">{children}</span>
    </button>
  );
}
