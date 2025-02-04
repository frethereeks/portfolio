"use client";
import CountUp, { CountUpProps } from "react-countup";

export default function AppCounter({
  start,
  end,
  prefix = "",
  suffix = "",
  duration,
  separator = ",",
  ...props
}: CountUpProps) {
  return (
    <CountUp
      start={start ?? 0.039}
      end={end}
      duration={duration ?? 2.75}
      separator={separator}
      enableScrollSpy={true}
      prefix={prefix}
      suffix={suffix}
      {...props}
    >
      {({ countUpRef }) => (
        <>
          <span ref={countUpRef} />
        </>
      )}
    </CountUp>
  );
}
