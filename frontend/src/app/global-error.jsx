'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '1rem',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            Something went wrong
          </h1>
          <p style={{ color: '#666', maxWidth: '28rem' }}>
            {error?.message || 'The app hit an unexpected error.'}
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
