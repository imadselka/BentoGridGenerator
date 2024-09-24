"use client";

import { BentoItem, Layout, LayoutItem } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import GridLayout from "./GridLayout";
import Header from "./Header";
import Sidebar from "./Sidebar";

const exampleLayouts: Layout[] = [
  {
    name: "Portfolio Display",
    items: [
      {
        i: "portfolio-1",
        x: 0,
        y: 0,
        w: 4,
        h: 2,
        title: "Project Showcase",
        content: "A collection of my best work",
        image: "https://via.placeholder.com/400x200",
        link: "#",
      },
      {
        i: "portfolio-2",
        x: 4,
        y: 0,
        w: 4,
        h: 2,
        title: "About Me",
        content: "Learn more about my skills and experience",
      },
      {
        i: "portfolio-3",
        x: 8,
        y: 0,
        w: 4,
        h: 2,
        title: "Contact",
        content: "Get in touch for collaborations",
      },
    ],
  },
  {
    name: "Recipe Collection",
    items: [
      {
        i: "recipe-1",
        x: 0,
        y: 0,
        w: 6,
        h: 2,
        title: "Spaghetti Carbonara",
        content: "Classic Italian pasta dish",
        image: "https://via.placeholder.com/600x200",
        ingredients: ["Pasta", "Eggs", "Pancetta", "Cheese"],
        cookingMethod:
          "Cook pasta, mix with egg and cheese sauce, add pancetta",
      },
      {
        i: "recipe-2",
        x: 6,
        y: 0,
        w: 3,
        h: 2,
        title: "Ingredients",
        content: "Pasta, eggs, pancetta, cheese",
      },
      {
        i: "recipe-3",
        x: 9,
        y: 0,
        w: 3,
        h: 2,
        title: "Cooking Method",
        content: "Step-by-step instructions",
      },
    ],
  },
];

export function BentoGridGenerator() {
  const [gap, setGap] = useState(4);
  const [borderRadius, setBorderRadius] = useState(8);
  const [isDense, setIsDense] = useState(true);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [layouts, setLayouts] = useState<Layout[]>(exampleLayouts);
  const [newLayoutName, setNewLayoutName] = useState("");
  const [selectedLayout, setSelectedLayout] = useState(layouts[0]?.name || "");
  const [items, setItems] = useState<BentoItem[]>(layouts[0]?.items || []);

  // Undo/Redo states
  const [undoStack, setUndoStack] = useState<BentoItem[][]>([]);
  const [redoStack, setRedoStack] = useState<BentoItem[][]>([]);

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
    // Save current state to undo stack before adding
    setUndoStack([...undoStack, items]);
    setRedoStack([]); // Clear redo stack on new action

    const newItem: BentoItem = {
      i: `n${Date.now()}`,
      x: 0,
      y: Infinity,
      w: 3,
      h: 2,
      title: `New Item ${items.length + 1}`,
      content: "Edit this content to describe your new item.",
      image: "https://via.placeholder.com/300x200",
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    // Save current state to undo stack before removing
    setUndoStack((prev) => [...prev, items]);
    setRedoStack([]); // Clear redo stack on new action

    // Use a functional update to ensure you're working with the latest state
    setItems((prevItems) => prevItems.filter((item) => item.i !== id));
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const previousItems = undoStack[undoStack.length - 1];
      setRedoStack([...redoStack, items]); // Push current state to redo stack
      setItems(previousItems);
      setUndoStack(undoStack.slice(0, -1)); // Pop from undo stack
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextItems = redoStack[redoStack.length - 1];
      setUndoStack([...undoStack, items]); // Push current state to undo stack
      setItems(nextItems);
      setRedoStack(redoStack.slice(0, -1)); // Pop from redo stack
    }
  };

  const onLayoutChange = (layout: LayoutItem[]) => {
    const updatedItems = items.map((item) => {
      const layoutItem = layout.find((l) => l.i === item.i);
      return layoutItem ? { ...item, ...layoutItem } : item;
    });
    setItems(updatedItems);
  };

  const getLayouts = () => {
    const baseLayout = items.map((item) => ({
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
      setItems(newLayout.items);
      setSelectedLayout(layoutName);
    }
  };

  const saveCurrentLayout = () => {
    if (newLayoutName.trim() === "") return;
    const newLayout: Layout = {
      name: newLayoutName,
      items: items,
    };
    setLayouts([...layouts, newLayout]);
    setNewLayoutName("");
  };

  const exportTailwindCSS = () => {
    const gridClasses = `grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-${gap} ${
      isDense ? "" : "grid-flow-row-dense"
    }`;

    const itemClasses = items
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

  const canUndo = undoStack.length > 0; // Determine if undo is possible
  const canRedo = redoStack.length > 0; // Determine if redo is possible

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
          undo={undo} // Pass undo function
          redo={redo} // Pass redo function
          newLayoutName={newLayoutName}
          setNewLayoutName={setNewLayoutName}
          saveCurrentLayout={saveCurrentLayout}
          canRedo={canRedo} // Pass actual canRedo state
          canUndo={canUndo} // Pass actual canUndo state
        />
        <main className="flex-1 p-4 overflow-auto">
          <GridLayout
            layouts={getLayouts()}
            gap={gap}
            isDense={isDense}
            borderRadius={borderRadius}
            items={items}
            onLayoutChange={onLayoutChange}
            onRemoveItem={removeItem}
          />
        </main>
      </div>
    </div>
  );
}
