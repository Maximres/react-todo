import React, { useState, useTransition } from "react";

type Props = {
  uid: string;
  isChecked: boolean;
  onChecked: (uid: string, isChecked: boolean) => void;
};

const SubRowCheckBox = ({ uid, isChecked, onChecked }: Props) => {
  const [checked, setChecked] = useState(isChecked);
  const [_, startTransition] = useTransition();
  const onChange = () => {
    startTransition(() => {
      const value = !checked;
      setChecked(value);
      onChecked(uid, value);
    });
  };
  return (
    <input
      className="form-check-input flex-shrink-0 me-3"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};

export { SubRowCheckBox };
