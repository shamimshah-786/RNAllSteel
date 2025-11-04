"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

// Sample project images data
const allProjects = [
  {
    id: 1,
    src: "/projects/main-gates/ms-decorative-main-gate-house.webp",
    title: "Mild Steel Decorative Main Gate",
    category: "Main Gates",
  },
  {
    id: 2,
    src: "/projects/street-stalls/stainless-steel-food-cart-stall.webp",
    title: "Stainless Steel Food Stalls",
    category: "Street Stalls",
  },
  {
    id: 3,
    src: "/projects/window-grills/stainless-steel-window-grill-modern.webp",
    title: "Modern Stainless Steel Window Grill",
    category: "Window Grills",
  },
  {
    id: 4,
    src: "/projects/main-gates/stainless-steel-main-gate-house.webp",
    title: "Stainless Steel Main Gate",
    category: "Main Gates",
  },
  {
    id: 5,
    src: "/projects/railings/stainless-steel-staircase-railing.webp",
    title: "Stainless Steel Staircase Railing",
    category: "Railings",
  },
  {
    id: 6,
    src: "/projects/window-grills/designer-ss-window-grill.webp",
    title: "Designer Stainless Steel Window Grill",
    category: "Window Grills",
  },
  {
    id: 7,
    src: "/projects/railings/steel-staircase-railing.webp",
    title: "Steel Staircase Railing",
    category: "Railings",
  },
  {
    id: 8,
    src: "/projects/collapsible-gates/collapsible-steel-gate.webp",
    title: "Collapsible Steel Gate",
    category: "Collapsible Gates",
  },
  {
    id: 9,
    src: "/projects/main-doors/ss-designer-main-door.webp",
    title: "Stainless Steel Designer Main Door",
    category: "Main Doors",
  },
  {
    id: 10,
    src: "/projects/railings/ss-staircase-railing-decorative-pillars.webp",
    title: "SS Staircase Railing with Decorative Pillars",
    category: "Railings",
  },
  {
    id: 11,
    src: "/projects/main-gates/ss-staircase-safety-gate.webp",
    title: "Stainless Steel Staircase Safety Gate",
    category: "Main Gates",
  },
  {
    id: 12,
    src: "/projects/main-gates/wrought-iron-designer-main-gate-gold.webp",
    title: "Wrought Iron Designer Main Gate with Gold Finish",
    category: "Main Gates",
  },
  {
    id: 13,
    src: "/projects/main-gates/laser-cut-steel-main-gate.webp",
    title: "Modern Laser Cut Steel Main Gate",
    category: "Main Gates",
  },
  {
    id: 14,
    src: "/projects/main-gates/ms-sliding-main-gate-laser-cut.webp",
    title: "Modern Mild Steel Sliding Main Gate with Laser Cut Panel",
    category: "Main Gates",
  },
  {
    id: 15,
    src: "/projects/collapsible-gates/collapsible-steel-window-gate.webp",
    title: "Collapsible Steel Window Gate",
    category: "Collapsible Gates",
  },
  {
    id: 16,
    src: "/projects/railings/ss-balcony-railing-designer.webp",
    title: "SS Balcony Railing with Designer Panels",
    category: "Railings",
  },
  {
    id: 17,
    src: "/projects/main-doors/ss-main-door-wooden-finish.webp",
    title: "SS Main Door with Wooden Finish",
    category: "Main Doors",
  },
  {
    id: 18,
    src: "/projects/window-grills/ss-window-grill-apartment.webp",
    title: "Stainless Steel Window Grill for Apartment",
    category: "Window Grills",
  },
  {
    id: 19,
    src: "/projects/main-gates/ss-swing-compound-main-gate.webp",
    title: "SS Swing Main Gate with Decorative Design",
    category: "Main Gates",
  },
  {
    id: 20,
    src: "/projects/railings/ss-balcony-railing-curved-design.webp",
    title: "Stainless Steel Balcony Railing with Curved Design",
    category: "Railings",
  },
  {
    id: 21,
    src: "/projects/railings/ss-mezzanine-railing-metal-stairs.webp",
    title: "Stainless Steel Mezzanine Railing with Metal Staircase",
    category: "Railings",
  },
  {
    id: 22,
    src: "/projects/railings/ss-bungalow-balcony-railing-window-grill.jpg",
    title: "SS Railings and Window Grills for Modern Bungalow",
    category: "Railings",
  },
];

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const imagesPerLoad = 20;

  useEffect(() => {
    setIsClient(true);
    loadMoreProjects();
  }, []);

  const loadMoreProjects = () => {
    const nextProjects = allProjects.slice(
      loadedCount,
      loadedCount + imagesPerLoad
    );
    setVisibleProjects((prev) => [...prev, ...nextProjects]);
    setLoadedCount((prev) => prev + imagesPerLoad);
  };

  const hasMoreProjects = loadedCount < allProjects.length;

  // Open full screen image
  const openFullScreen = (project, index) => {
    setSelectedImage(project);
    setCurrentImageIndex(index);
  };

  // Close full screen
  const closeFullScreen = () => {
    setSelectedImage(null);
  };

  // Navigate to next image
  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % visibleProjects.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(visibleProjects[nextIndex]);
  };

  // Navigate to previous image
  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + visibleProjects.length) % visibleProjects.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(visibleProjects[prevIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeFullScreen();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex]);

  // Responsive column calculation - fixed hydration issue
  const getColumnCount = () => {
    if (!isClient) return 4; // Default for SSR
    
    const width = window.innerWidth;
    if (width < 640) return 2; // mobile
    if (width < 1024) return 3; // tablet
    return 4; // desktop
  };

  const organizeIntoColumns = (items) => {
    const count = getColumnCount();
    const columns = Array.from({ length: count }, () => []);

    items.forEach((item, index) => {
      const columnIndex = index % count;
      columns[columnIndex].push(item);
    });

    return columns;
  };

  const columns = organizeIntoColumns(visibleProjects);

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Our Projects
          </h1>
          <div className="w-20 md:w-24 h-1 bg-blue-600 mx-auto mb-4 md:mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Explore our portfolio of steel fabrication projects showcasing
            quality workmanship and innovative designs across Mumbai and Thane.
          </p>
        </div>

        {/* Pinterest Style Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-auto">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4 md:gap-6">
              {column.map((project, i) => {
                const globalIndex = visibleProjects.findIndex(p => p.id === project.id);
                return (
                  <div
                    key={i}
                    className="break-inside-avoid group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                    onClick={() => openFullScreen(project, globalIndex)}
                  >
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={project.src}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9jkHLUw8RdcfWbp+5Q0mCqwyuJzJEYiDsVUBA2tUqKcKmsf//Z"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

                      {/* Overlay - always visible on mobile, on hover for desktop */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white font-semibold text-sm md:text-lg mb-1 line-clamp-2">
                          {project.title}
                        </h3>
                        <span className="text-blue-300 text-xs md:text-sm font-medium">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreProjects && (
          <div className="text-center mt-12 md:mt-16">
            <button
              onClick={loadMoreProjects}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
            >
              Load More Projects ({allProjects.length - loadedCount} remaining)
            </button>
            <p className="text-gray-500 mt-3 md:mt-4 text-sm md:text-base">
              Showing {visibleProjects.length} of {allProjects.length} projects
            </p>
          </div>
        )}

        {/* No more projects message */}
        {!hasMoreProjects && visibleProjects.length > 0 && (
          <div className="text-center mt-12 md:mt-16">
            <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md mx-auto shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                That's All!
              </h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                You've seen all our projects. Interested in starting your own?
              </p>
              <a
                href="/contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-colors duration-300 text-sm md:text-base"
              >
                Start Your Project
              </a>
            </div>
          </div>
        )}

        {/* Full Screen Image Viewer */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeFullScreen}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 text-white hover:text-gray-300 transition-colors duration-200 bg-black/50 rounded-full p-2"
              aria-label="Close"
            >
              <IoMdClose className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200 bg-black/50 rounded-full p-3"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200 bg-black/50 rounded-full p-3"
              aria-label="Next image"
            >
              <FaChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Image Container */}
            <div className="relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
              {/* Image */}
              <div className="relative flex-1 flex items-center justify-center">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Image Info */}
              <div className="bg-white p-4 md:p-6 rounded-t-2xl mt-4">
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">
                  {selectedImage.title}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium text-sm md:text-base">
                    {selectedImage.category}
                  </span>
                  <span className="text-gray-500 text-sm md:text-base">
                    {currentImageIndex + 1} / {visibleProjects.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Touch Navigation for Mobile */}
            <div 
              className="absolute inset-0 z-0 md:hidden"
              onClick={(e) => {
                if (e.clientX < window.innerWidth / 2) {
                  prevImage();
                } else {
                  nextImage();
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}