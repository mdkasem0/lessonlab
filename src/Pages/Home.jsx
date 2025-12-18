import React, { useEffect, useState } from "react";
import MyCarousel from "../Components/Home/MyCarousel";
import WhyLearningSection from "../Components/Home/WhyLearningSection";
import LessonGrid from "../Components/Home/LessonGrid";
import Wraper from "../Components/Wraper";
import TopContributors from "../Components/Home/TopContributors";
import MostSavedLessons from "../Components/Home/MostSavedLessons";
import axios from "axios";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";

const Home = () => {
  const [data, setData] = useState({
    featuredLessons: [],
    topContributors: [],
    mostSavedLessons: [],
  });
  const [loader, setLoader] = useState(false);
  console.log(data.topContributors)

  useEffect(() => {
    setLoader(true);

    axios
      .get(`${import.meta.env.VITE_ApiCall}/api/homepage-data`)
      .then((res) => {
        setData(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      });
  }, []);
  if (loader) {
    return <LoaderSpainer />;
  }

  return (
    <main className="">
      {/* Hero Carousel */}
      <section>
        <MyCarousel />
      </section>

      {/* Featured Lessons */}
      <section className="mt-16">
        <Wraper>
          <LessonGrid lessons={data.featuredLessons} />
        </Wraper>
      </section>

      {/* Why Learning From Life Matters */}
      <section className="mt-20 bg-gray-100 dark:bg-gray-900">
        <Wraper>
          <WhyLearningSection />
        </Wraper>
      </section>

      {/* Top Contributors */}
      <section className="mt-16">
        <Wraper>
          <TopContributors contributors={data.topContributors} />
        </Wraper>
      </section>

      {/* Why Learning From Life Matters */}
      <section className="mt-20 bg-gray-100 dark:bg-gray-900">
        <Wraper>
          <MostSavedLessons lessons={data.mostSavedLessons} />
        </Wraper>
      </section>
    </main>
  );
};

export default Home;
