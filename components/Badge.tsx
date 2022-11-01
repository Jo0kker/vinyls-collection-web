import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export const Badge = ({ children }: Props) => {
  return (
    <>
      <span className="inline-flex items-center rounded-md bg-black bg-opacity-20 px-3 py-1 text-sm font-medium">
        {children}
      </span>
    </>
  );
};
