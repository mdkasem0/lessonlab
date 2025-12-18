import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import LessonInfoSection from "../Components/LifeLessonDetails/LessonInfoSection";
import SimilarLessons from "../Components/LifeLessonDetails/SimilarLessons";
import CommentSection from "../Components/LifeLessonDetails/CommentSection";
import StatsEngagement from "../Components/LifeLessonDetails/StatsEngagement";
import CreatorCard from "../Components/LifeLessonDetails/CreatorCard";
import LessonMetadata from "../Components/LifeLessonDetails/LessonMetadata";
import InteractionButtons from "../Components/LifeLessonDetails/InteractionButtons";
import Wraper from "../Components/Wraper";
import axios from "axios";
import { toast } from "react-toastify";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";
import { useAuth } from "../Context/useAuth";
import { UserUtils } from "../Utils/UserUtils";


const LifeLessonDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [lesson, setLesson] = useState();
  const [fetching, setFetching] = useState(false);
  const { user } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken(); // get Firebase token
        const data = await UserUtils.getCurrentUser(token); // fetch user from backend
        setLoggedUser(data);
      } catch (err) {
        console.error("Error fetching logged user:", err);
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setFetching(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_ApiCall}/lesson/${id}`
        );
        setLesson(data.lesson);
      } catch (err) {
        toast.error("Failed to load lesson");
      } finally {
        setFetching(false);
      }
    };
    fetchLesson();
  }, [id]);

  // Check premium access
  const showUpgradeBanner = lesson?.accessLevel === "premium" && !loggedUser.isPremium;

  if (showUpgradeBanner) {
    return (
      <div className="container mx-auto p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Premium Lesson</h1>
        <p className="text-gray-600 mb-6">
          Upgrade to premium to view the full lesson.
        </p>
        <button
          onClick={() => navigate("/upgrade-plan")}
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-600 rounded font-semibold"
        >
          Upgrade Now
        </button>
        <div className="mt-8 opacity-50 blur-sm">
          {/* Optionally show blurred preview */}
          <LessonInfoSection lesson={lesson} />
        </div>
      </div>
    );
  }

  if (fetching || !lesson) return <LoaderSpainer />;

  return (
    <div className="container mx-auto  space-y-8">
      <div>
        <LessonInfoSection lesson={lesson} />
      </div>
      <Wraper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
          <LessonMetadata lesson={lesson} />
          <StatsEngagement lesson={lesson} />
          <CreatorCard creator={lesson} />
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4 max-w-full">
          <InteractionButtons
            lesson={lesson}
            user={user}
            setLesson={setLesson}
          />
        </div>
      </Wraper>
      <div className="mt-20 bg-gray-100 dark:bg-gray-900 py-5">
        <Wraper>
          <CommentSection lessonId={lesson._id} user={user} />
        </Wraper>
      </div>
      <Wraper>
        <SimilarLessons currentLesson={lesson} />
      </Wraper>
    </div>
  );
};

export default LifeLessonDetailsPage;
