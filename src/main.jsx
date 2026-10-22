import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class AppErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.error('Portfolio render failed:', error)
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="boot-fallback">
          <span className="boot-fallback__mark" aria-hidden="true">BS</span>
          <p className="boot-fallback__eyebrow">BHARAT SA · PORTFOLIO</p>
          <h1 className="boot-fallback__title">The page hit a problem.</h1>
          <p className="boot-fallback__copy">
            The portfolio could not finish rendering. Reload the page to try again.
          </p>
          <button
            className="boot-fallback__button"
            type="button"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </main>
      )
    }

    return this.props.children
  }
}

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </StrictMode>
  )
}
