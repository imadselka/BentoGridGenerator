"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import GridLayout from "./GridLayout";
import Header from "./Header";
import Sidebar from "./Sidebar";

type BentoItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  content: string;
};

type layoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type Layout = {
  name: string;
  items: BentoItem[];
};

const exampleLayouts: Layout[] = [
  // Define example layouts if needed
];

type HistoryState = {
  past: BentoItem[][];
  present: BentoItem[];
  future: BentoItem[][];
};

type HistoryAction =
  | { type: "UPDATE"; items: BentoItem[] }
  | { type: "UNDO" }
  | { type: "REDO" };

const historyReducer = (
  state: HistoryState,
  action: HistoryAction
): HistoryState => {
  switch (action.type) {
    case "UPDATE":
      return {
        past: [...state.past, state.present],
        present: action.items,
        future: [],
      };
    case "UNDO":
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    case "REDO":
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      };
    default:
      return state;
  }
};

export function BentoGridGenerator() {
  const [gap, setGap] = useState(4);
  const [borderRadius, setBorderRadius] = useState(8);
  const [isDense, setIsDense] = useState(true);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [layouts, setLayouts] = useState<Layout[]>(exampleLayouts);
  const [newLayoutName, setNewLayoutName] = useState("");
  const [selectedLayout, setSelectedLayout] = useState(layouts[0]?.name || "");

  const [history, dispatch] = useReducer(historyReducer, {
    past: [],
    present: exampleLayouts[0]?.items || [],
    future: [],
  });

  const updateLayout = useCallback(() => {
    const width = window.innerWidth;
    let newBreakpoint = "lg";
    if (width < 768) newBreakpoint = "sm";
    else if (width < 1200) newBreakpoint = "md";

    setCurrentBreakpoint(newBreakpoint);
  }, []);

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

  const addItem = () => {
    const newItem: BentoItem = {
      i: String(history.present.length + 1),
      x: 0,
      y: Infinity,
      w: 3,
      h: 2,
      title: `New Item ${history.present.length + 1}`,
      content: "Edit this content to describe your new item.",
    };
    dispatch({ type: "UPDATE", items: [...history.present, newItem] });
  };

  const removeItem = (id: string) => {
    const updatedItems = history.present.filter((item) => item.i !== id);
    dispatch({ type: "UPDATE", items: updatedItems });
  };

  const onLayoutChange = (layout: layoutItem[]) => {
    const updatedItems = history.present.map((item) => {
      const layoutItem = layout.find((l) => l.i === item.i);
      return layoutItem ? { ...item, ...layoutItem } : item;
    });
    dispatch({ type: "UPDATE", items: updatedItems });
  };

  const getLayouts = () => {
    const baseLayout = history.present.map((item) => ({
      ...item,
      w:
        currentBreakpoint === "sm"
          ? Math.min(item.w * 2, 4)
          : currentBreakpoint === "md"
          ? Math.min(item.w * 1.5, 8)
          : item.w,
    }));
    return {
      lg: baseLayout,
      md: baseLayout,
      sm: baseLayout,
    };
  };

  const handleLayoutChange = (layoutName: string) => {
    const newLayout = layouts.find((layout) => layout.name === layoutName);
    if (newLayout) {
      dispatch({ type: "UPDATE", items: newLayout.items });
      setSelectedLayout(layoutName);
    }
  };

  const saveCurrentLayout = () => {
    if (newLayoutName.trim() === "") return;
    const newLayout: Layout = {
      name: newLayoutName,
      items: history.present,
    };
    setLayouts([...layouts, newLayout]);
    setNewLayoutName("");
  };

  const exportTailwindCSS = () => {
    const gridClasses = `grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-${gap} ${
      isDense ? "" : "grid-flow-row-dense"
    }`;

    const itemClasses = history.present
      .map((item) => {
        return `<div class="col-span-${item.w} row-span-${item.h} bg-secondary text-secondary-foreground rounded-[${borderRadius}px] p-6">
  <h3 class="text-lg font-semibold">${item.title}</h3>
  <p>${item.content}</p>
</div>`;
      })
      .join("\n  ");

    return `<div class="${gridClasses}">
  ${itemClasses}
</div>`;
  };

  return (
    <div className="flex flex-col h-screen">
      <Header exportTailwindCSS={exportTailwindCSS} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          layouts={layouts}
          handleLayoutChange={handleLayoutChange}
          selectedLayout={selectedLayout}
          gap={gap}
          setGap={setGap}
          borderRadius={borderRadius}
          setBorderRadius={setBorderRadius}
          isDense={isDense}
          setIsDense={setIsDense}
          addItem={addItem}
          undo={() => dispatch({ type: "UNDO" })}
          redo={() => dispatch({ type: "REDO" })}
          newLayoutName={newLayoutName}
          setNewLayoutName={setNewLayoutName}
          saveCurrentLayout={saveCurrentLayout}
        />
        <main className="flex-1 p-4 overflow-auto">
          <GridLayout
            layouts={getLayouts()}
            gap={gap}
            isDense={isDense}
            history={history}
            onLayoutChange={onLayoutChange}
            onRemoveItem={removeItem}
          />
        </main>
      </div>
    </div>
  );
}
