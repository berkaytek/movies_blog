import ReactLoading from "react-loading";

export const LoadingAnimation = () => (
  <div className="flex flex-col items-center -mt-16">
    <ReactLoading type="spinningBubbles" color="#007BFF" height={50} width={50} />
    <p className="mt-4 text-gray-600">Loading data from API</p>
  </div>
);
