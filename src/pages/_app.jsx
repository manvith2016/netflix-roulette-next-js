import axios from 'axios';
import App from '../components/app/App';
import '../components/counterComponent/counter.css';
import '../components/dialogBox/Dialog.css';
import '../components/genreComponent/genreSelection.css';
import '../components/movieDetails/MovieDetails.css';
import '../components/movieForm/MovieForm.css';
import '../components/movieTitle/MovieTitle.css';
import '../components/searchComponent/SearchForm.css';
export const HOST = "http://localhost:4000";

const MyApp = ({ data }) => {


    return (
        <App movieData={data} />
    );
};


MyApp.getInitialProps = async ({ query }) => {
    try {
        // Fetch data from an API endpoint
        const response = await axios.get(HOST + "/movies", { params: { query } });
        const data = response.data.data;
        return { data };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default MyApp;
