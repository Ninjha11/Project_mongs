"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import ComboBox from "@/components/ComboBox";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [physicianName, setPhysicianName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const addPhysician = async () => {
    if (!physicianName) return;

    try {
      const res = await fetch('/api/physicians', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: physicianName }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Physician added:', data);
        setPhysicianName("");
        toggleDrawer();
      } else {
        const errorData = await res.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Failed to add physician', error);
    }
  };

  return (
    <div className="relative min-h-screen">
      <ComboBox onSelect={setSelectedOption} />
      <Button
        className="absolute bottom-0 right-0 m-4 z-10 bg-white text-black rounded-full w-12 h-12 flex items-center justify-center"
        onClick={toggleDrawer}
      >
        +
      </Button>
      {isDrawerOpen && (
        <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
          <div className="p-4">
            <h2 className="text-lg font-bold text-center mb-3 text-black">Type Physician's Name to Add</h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Type here..."
              value={physicianName}
              onChange={(e) => setPhysicianName(e.target.value)}
            />
            <div className="flex justify-center mt-4">
              <Button className="bg-navy-700 text-black rounded-full px-8" onClick={addPhysician}>
                Add
              </Button>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
}
