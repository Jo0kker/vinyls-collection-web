import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

type buildInfo = {
  label: string;
  type: string;
  placeholder: string;
};

type InputTextProps = {
  field: any;
  form: any;
  meta: any;
  buildInfo: buildInfo;
  className?: string;
};

export const InputText = ({
  field,
  form,
  meta,
  buildInfo,
  className,
}: InputTextProps) => {
  return (
    <div className={`${className}`}>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-fuchsia-800 font-roboto"
      >
        {buildInfo.label}
      </label>
      <div className="rounded-md shadow-sm">
        <input
          {...field}
          type={buildInfo.type}
          placeholder={buildInfo.placeholder}
          className={`${
            meta.touched && meta.error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          } block pl-7 pr-12 sm:text-sm border-gray-300 h-auto rounded-md`}
          aria-invalid={meta.touched && meta.error ? "true" : "false"}
          aria-describedby={`${field.name}-error`}
        />
        {meta.touched && meta.error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {meta.touched && meta.error && (
        <p className="mt-2 text-sm text-red-600" id={`${field.name}-error`}>
          {meta.error}
        </p>
      )}
    </div>
  );
};
