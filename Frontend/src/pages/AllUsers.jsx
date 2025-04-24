import React, { useEffect, useRef, useState, useCallback } from 'react';
import HackathonCard from '../explore/HackathonCard';
import { useExploreStore } from '../store/explore.store';
import { useLocation } from 'react-router-dom';
import UserCard from '../explore/UserCard';

const AllUsers = () => {
  const { get50Users, viewAllUsers, hasMore, resetViewAllUsers } = useExploreStore();
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef();
  const hasFetchedOnce = useRef(false);
  const location = useLocation();


  useEffect(() => {
    if (hasFetchedOnce.current) return;
    hasFetchedOnce.current = true;

    setIsFetching(true);
    get50Users({ more: 1, limit: 50 }).finally(() => setIsFetching(false));
  }, []);

  useEffect(() => {
    resetViewAllUsers();
  }, [location.pathname]);

  const lastCardRef = useCallback(
    (node) => {
      if (!node) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          console.log("Last card is in view");

          const nextPage = page + 1;
          setPage(nextPage);
          setIsFetching(true);
          get50Users({ more: nextPage, limit: 50 }).finally(() =>
            setIsFetching(false)
          );
        }
      });

      observerRef.current.observe(node);
    },
    [page, hasMore, isFetching, viewAllUsers]
  );

  return (
    <div className="bg-black w-full pt-16">
      <div className="text-white font-poppins font-medium flex flex-wrap justify-center">
        {viewAllUsers?.map((ele, i) => {
          const isLast = i === viewAllUsers.length - 1;
          return (
            <div key={ele._id} ref={isLast ? lastCardRef : null}>
              <UserCard ele={ele} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllUsers;

