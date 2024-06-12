import { useState } from "react";

interface Tour {
  id: string;
  title: string;
  image: string;
  location: string;
  price: number;
  ratingsAverage: number;
  faviorate: boolean;
  tourCategory: string;
  city: string;
  country: string;
}

const useFavorite = (initialTours: Tour[]) => {
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  const handleFavorite = (tour: Tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
  };

  const toggleFavorite = (tour: Tour) => {
    const updatedTours = tours.map((t) =>
      t.id === tour.id ? { ...t, faviorate: !t.faviorate } : t
    );
    setTours(updatedTours);
    closeModal();
  };

  return {
    tours,
    setTours,
    handleFavorite,
    isModalOpen,
    closeModal,
    selectedTour,
    toggleFavorite,
  };
};

export default useFavorite;
