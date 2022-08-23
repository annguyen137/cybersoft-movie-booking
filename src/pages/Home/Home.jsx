import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner/Banner";
import MovieShowing from "./MovieShowing/MovieShowing";
import TheaterTabs from "./TheaterTabs/TheaterTabs";
import { getTheatersBrandWithShowtime } from "redux/slices/theatersSlice";
import { getMovieListPagination } from "redux/slices/moviesSlice";
import { getMovieBanner } from "redux/slices/moviesSlice";
import PageLoading from "components/Loading/PageLoading";
import QuickTicket from "./QuickTicket/QuickTicket";
import AppInfo from "./AppInfo/AppInfo";

const Home = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const [showLoading, setShowLoading] = useState(false);

  const { theatersBrandWithShowtime, isTheatersLoading } = useSelector((state) => {
    return state.theaters;
  });

  const { banners, moviesPagination } = useSelector((state) => {
    return state.movies;
  });

  useEffect(() => {
    if (!theatersBrandWithShowtime.length && !banners.length && !Object.keys(moviesPagination).length) {
      dispatch(getMovieBanner());
      dispatch(getMovieListPagination(1));
      dispatch(getTheatersBrandWithShowtime());
      setShowLoading(true);
    }
  }, []);

  setTimeout(() => {
    setShowLoading(false);
  }, 1000);

  if (showLoading || isTheatersLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <Banner />
      <QuickTicket />
      <MovieShowing />
      <TheaterTabs />
      <AppInfo />
    </>
  );
};

export default Home;
