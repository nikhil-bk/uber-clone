import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>

    <Component {...pageProps} />
    
    </div>
    
  )
  
}

export default MyApp
