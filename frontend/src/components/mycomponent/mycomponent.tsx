import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import { getInitialState, updateCallStatus } from "@/lib/features/callStatus/callStatusSlice";
import { useEffect } from "react";

export const MyComponent = () => {
  const store = useAppStore();
  const value = useAppSelector((state) => state.callStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    store.dispatch(updateCallStatus("trying"));
  }, []);

  return (
    <div className="flex justify-between space-x-2">
      <button
      className="bg-slate-800 text-white"
        onClick={() => {
          dispatch(updateCallStatus("calling"));
        }}
      >
        Update
      </button>
      <button
      onClick={() => {dispatch(getInitialState())}}
      className="bg-slate-800 text-white"
      >
        Return to Initial State
      </button>
      <h1 className="bg-red-500">{value.status}</h1>
    </div>
  );
};
