import axios from "axios";
import { useSearchParams } from "next/navigation";
import Router, { useRouter } from "next/router";
import { useState } from 'react';
import { fetchCurrentQueryParams } from './../../utils/utils';
import Dialog from './../dialogBox/Dialog';
import { GenreSelection } from './../genreComponent/GenreSelection';
import Header from './../header/Header';
import DeleteMovie from './../movieForm/DeleteMovie';
import MovieFormResult from './../movieForm/MovieFormResult';
import MovieTitle from './../movieTitle/MovieTitle';
import SortControl, { RELEASE_DATE } from './../sortControl/SortControl';
export const HOST = "http://localhost:4000";

const App = ({ movieData }) => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState(router.query);

  const [selectedGenre, setSelectedGenre] = useState(searchParams['activeGenre'] || 'Adventure');
  const [sortBy, setSortBy] = useState(searchParams['sortBy'] || RELEASE_DATE)
  const query = useSearchParams().get('query') || null;
  const [searchString, setSearchString] = useState(query);


  const [movies, setMovies] = useState(movieData);
  const [genreList, setGenreList] = useState([]);

  const [selectedMovieData, setSelectedMovieData] = useState(null);
  const [showMovieInfoPanel, setShowMovieInfoPanel] = useState(false);


  const [deleteMovieDialog, setDeleteMovieDialog] = useState({
    isOpen: false,
    movieInfo: null
  });
  const [movieFormResult, setMovieFormResult] = useState({
    msg: null,
    isOpen: false,
    isSuccess: true
  })

  const openDeleteMovieDialog = (movieInfo) => {
    setDeleteMovieDialog({
      isOpen: true,
      movieInfo: movieInfo
    });
  };

  const closeDeleteMovieDialog = () => {
    setDeleteMovieDialog({
      isOpen: false,
      movieInfo: null
    });
  };

  const openMovieFormResultDialog = (msg, isSuccess) => {
    setMovieFormResult({
      isSuccess: isSuccess,
      msg: msg,
      isOpen: true
    })
  };

  const closeMovieFormResultDialog = () => {
    setMovieFormResult({
      isSuccess: true,
      msg: null,
      isOpen: false
    })
  };

  const callMoviewAPI = (selectedGenre, sortBy, searchString) => {
    let searchQuerParam = new URLSearchParams();
    searchQuerParam.set("offset", 0);
    searchQuerParam.set("limit", 20);
    if (selectedGenre && !searchString) {
      searchQuerParam.set("filter", selectedGenre);
    }
    searchQuerParam.set("sortBy", sortBy);
    searchQuerParam.set("sortOrder", "desc");
    if (searchString) {
      searchQuerParam.set("searchBy", "title");
      searchQuerParam.set("search", searchString);
    }
    axios.get(HOST + "/movies?" + searchQuerParam.toString())
      .then((response) => {
        setMovies(response.data.data);
      })
      .catch((err) => {
        console.log('error', err)
      });
  }

  const createSearchParamsCustom = () => {
    const queryParams = { activeGenre: selectedGenre, sortBy: sortBy };
    if (searchString) {
      queryParams['query'] = searchString;
    }
    return queryParams.toString();
  }
  const onGenreSelected = (selectedGenre) => {
    console.log("You selected: " + selectedGenre)
    setSearchString(null)
    setSelectedGenre(selectedGenre);
    // navigate({
    //   pathname: "/",
    //   search: createSearchParamsCustom().toString()
    // });
    Router.push("/",createSearchParamsCustom().toString());
  }

  const onTileSelected = (movieData) => {
    // navigate("/movie/" + movieData.id)-
    Router.push("/movie/" + movieData.id)
    setSelectedMovieData(movieData)
    toggleMovieInfoPanel(true)
  }

  const toggleMovieInfoPanel = (show) => {
    window.scrollTo(0, 0)
    setShowMovieInfoPanel(show)
    console.log("toggleMovieInfoPanel called: ", show)
  }

  const viewMovieData = (movieData) => {
    console.log("viewMovieData: ", movieData)
    // alert("viewMovieData: "+ movieData)
    var str = "\n\n";
    for (const [key, value] of Object.entries(movieData)) {
      str = str + key + " : " + value + "\n";
    }
    alert("=====viewMovieData=======" + str)
  }

  const addMovieData = () => {
    // navigate("/movie/add")
    Router.push("/movie/add")
  }

  const editMovieData = (movieData) => {
    console.log("editMovieData: ", movieData)
    // alert("editMovieData: "+ movieData)
    var str = "\n\n";
    for (const [key, value] of Object.entries(movieData)) {
      str = str + key + " : " + value + "\n";
    }
    // alert("=====editMovieData======="+ str)

    // navigate("/" + movieData.id + "/edit?" + fetchCurrentQueryParams(searchParams))
    Router.push("/" + movieData.id + "/edit?" + fetchCurrentQueryParams(searchParams))
  }

  const deleteMovieData = (movieData) => {
    console.log("deleteMovieData: ", movieData)
    // alert("deleteMovieData: "+ movieData)
    var str = "\n\n";
    for (const [key, value] of Object.entries(movieData)) {
      str = str + key + " : " + value + "\n";
    }
    // alert("=====deleteMovieData======="+ str)
    openDeleteMovieDialog(movieData)
  }

  const onSortSelectionListener = (sortBy) => {
    console.log("onSortSelectionListener", sortBy)
    setSortBy(sortBy);
    callMoviewAPI(null,sortBy,null);
  }

  const onSearch = (inputText) => {
    setSearchString(inputText);
    callMoviewAPI(null, sortBy, inputText);
  }

  const onDeleteMovie = (movieInfo) => {
    console.log(movieInfo)
    axios.delete(HOST + "/movies/" + movieInfo.id)
      .then((response) => {
        openMovieFormResultDialog("The movie has been deleted from database successfully", true)
      })
      .catch((err) => {
        console.log('error', err)
        openMovieFormResultDialog("Failed to delete the movie. Please try again !!", false)
      }).finally(() => {
        closeDeleteMovieDialog()
      });
  }


  return (
    <>
      <Header
        selectedMovieData={selectedMovieData}
        showMovieInfoPanel={showMovieInfoPanel}
        toggleMovieInfoPanel={toggleMovieInfoPanel}
        onSearch={onSearch}
        addMovie={addMovieData}
      ></Header>
      <div className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-10 col-md-10 px-0">
              <ul className="nav nav-tabs bg-dark">
                <GenreSelection
                  genres={genreList}
                  defaultSelectedGenre={selectedGenre}
                  onSelect={onGenreSelected}
                ></GenreSelection>
              </ul>
            </div>
            <div className="col-sm-2 col-md-2 px-0">
              <ul className="bg-dark">
                <SortControl
                  defaultSortSelection={sortBy}
                  onSortSelection={onSortSelectionListener}
                ></SortControl>
              </ul>
            </div>
          </div>
        </div>
        <div className="tab-content">
          <div className="row">
            {movies?.map((movie) => (
              <MovieTitle
                key={movie?.id}
                movieTileData={{
                  id: movie?.id,
                  imageURL: movie?.poster_path,
                  movieName: movie?.title,
                  releaseYear: movie?.release_date.split("-")[0],
                  generes: movie?.genres,
                  ...movie,
                }}
                onViewMovieSelect={viewMovieData}
                onEditMovieSelect={editMovieData}
                onDeleteMovieSelect={deleteMovieData}
                onTileSelected={onTileSelected}
              ></MovieTitle>
            ))}
          </div>
        </div>

        <footer>
          {movieFormResult.isOpen && (
            <Dialog title={""} onClose={closeMovieFormResultDialog}>
              <MovieFormResult movieFormResult={movieFormResult}></MovieFormResult>
            </Dialog>
          )}

          {deleteMovieDialog.isOpen && (
            <Dialog title={"DELETE MOVIE"} onClose={closeDeleteMovieDialog}>
              <DeleteMovie movieInfo={deleteMovieDialog.movieInfo} onDeleteMovie={onDeleteMovie}></DeleteMovie>
            </Dialog>
          )}
        </footer>
      </div>
    </>
  );
}

export default App;
