'use client'

const SectionTitle = ({
    title = ""
  }: {
    title?: string;
  }) => {
    return (
      <div className="mx-auto max-w-max">
          <h2 className="text-center text-primary title uppercase mb-1">
              {title}
          </h2>
          <div className="flex flex-col gap-1 items-center">
            <div className="h-[2.5px] w-32 bg-primary" />
          </div>
      </div>
    );
  };
  
  export default SectionTitle;
  