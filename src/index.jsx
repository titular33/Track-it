
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = document.querySelector('.root');
ReactDOM.render(
    <App/>
    , root
);
serviceWorkerRegistration.updateViaCache();

reportWebVitals();

