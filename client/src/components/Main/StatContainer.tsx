interface StatProps {
  first: number;
  second: number;
}

const StatContainer = ({ first, second }: StatProps) => {
  return (
    <div className="w-full flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-[50px]">
      <div className="flex items-center justify-center h-32 rounded-md shadow-card hover:bg-main-bg">
        <h1 className="text-2xl font-medium text-center">
          <span className="text-3xl">{first} </span>
          <br /> Jobs Posted
        </h1>
      </div>
      <div className="flex items-center justify-center h-32 rounded-md shadow-card hover:bg-main-bg">
        <h1 className="text-2xl font-medium text-center">
          <span className="text-3xl">{second} </span>
          <br />
          Active Jobs
        </h1>
      </div>
    </div>
  );
};

export default StatContainer;
