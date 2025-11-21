import { RefObject } from "react";

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropDownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropDownWidth = 240;

    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // Adjust left position if dropdown overflows the viewport

    if (left + dropDownWidth > window.innerWidth) {
      left = rect.right + window.scrollX - dropDownWidth;

      if (left < 0) {
        left = window.innerWidth - dropDownWidth - 16;
      }
    }

    if (left < 0) {
      left = 16; // Ensure it doesn't go off the left edge
    }

    return { top, left };
  };

  return {
    getDropDownPosition,
  };
};
