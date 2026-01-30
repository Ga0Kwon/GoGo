export default function HalfStarRating({ value, onChange, size = 24 }) {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (e, star) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    onChange(star - (isHalf ? 0.5 : 0));
  };

  return (
    <div className="flex gap-1">
      {stars.map((star) => {
        const fill =
          value >= star
            ? "100%"
            : value >= star - 0.5
            ? "50%"
            : "0%";

        return (
          <div
            key={star}
            className="relative cursor-pointer"
            style={{ width: size, height: size }}
            onClick={(e) => handleClick(e, star)}
          >
            {/* 빈 별 */}
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 w-full h-full text-gray-300"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87
                       1.18 6.88L12 17.77l-6.18
                       3.25L7 14.14 2 9.27l6.91-1.01z" />
            </svg>

            {/* 채운 별 */}
            <div
              className="absolute inset-0 overflow-hidden text-pink-400"
              style={{ width: fill }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87
                         1.18 6.88L12 17.77l-6.18
                         3.25L7 14.14 2 9.27l6.91-1.01z" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
