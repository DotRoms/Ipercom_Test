import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

// Design-system Container component
export const Container = ({ children, className, ref }: Props) => {
  return (
    <div ref={ref} className={clsx(className, "w-full max-w-7xl py-4 mx-auto px-4")}>
      {children}
    </div>
  )
}