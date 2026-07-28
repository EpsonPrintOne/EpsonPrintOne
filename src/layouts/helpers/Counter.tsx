import DynamicIcon from "@/helpers/DynamicIcon";
import { markdownify } from "@/lib/utils/textConverter";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Counter = ({
  content,
  icon,
  value,
  unit,
}: {
  value: number;
  content: string;
  icon: string;
  unit: string;
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="text-center px-2">
      <DynamicIcon
        className="text-primary dark:text-darkmode-primary w-12 h-12 inline-block"
        icon={icon}
      />

      <h2 className="mb-3">
        {inView && <CountUp end={value} />}
        {unit}
      </h2>

      <h5
        className="leading-9 text-text dark:text-darkmode-text"
        dangerouslySetInnerHTML={{ __html: markdownify(content) }}
      />
    </div>
  );
};

export default Counter;
