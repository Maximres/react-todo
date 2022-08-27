import React from "react";

const useValidId = () => {
  return React.useMemo(() => {
    return `id-${crypto.randomUUID()}`;
  }, []);
};

export default useValidId;
