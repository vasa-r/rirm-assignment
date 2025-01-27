interface LoaderProps {
  width: string;
  height: string;
}

const Loader = ({ width, height }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center">
      <div
        style={{ width, height }}
        className="border-4 border-white rounded-full border-t-transparent animate-spin"
      ></div>
    </div>
  );
};

export default Loader;
