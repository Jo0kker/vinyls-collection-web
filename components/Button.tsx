type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export const Button = (props: ButtonProps) => {
  return (
    <div className={`flex content-center justify-center ${props.className}`}>
      <button className="border border-black py-2 px-4 rounded rounded-3xl">
        {props.children}
      </button>
    </div>
  );
};
