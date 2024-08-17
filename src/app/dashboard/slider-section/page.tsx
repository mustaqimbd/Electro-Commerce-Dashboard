"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/sectionTitle";
import { Textarea } from "@/components/ui/textarea";

import { ImageIcon, Trash2 } from "lucide-react";
import { useState } from "react";

const SliderSection = () => {
  // Initialize state to keep track of accordion items
  const [items, setItems] = useState([{ id: 1 }]);

  // Function to add a new accordion item
  const handleAddMore = () => {
    setItems([...items, { id: items.length + 1 }]);
  };
  // Function to remove an accordion item by its id
  const handleRemove = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };
  return (
    <div className=" w-full flex gap-5 h-screen">
      <div className="flex-1">
        <Card className="p-6 space-y-3">
          <SectionTitle>Slider Banner Set Up</SectionTitle>
          <Accordion type="single" collapsible className="">
            {items.map((item) => (
              <>
                <div className="flex items-start justify-between gap-4 ">
                  <AccordionItem
                    className="w-full"
                    value={`item-${item.id}`}
                    key={item.id}
                  >
                    <AccordionTrigger>Slider Banner {item.id}</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center">
                        <span className="p-4">
                          <ImageIcon width={50} height={50} />
                        </span>
                        <div className="w-full flex gap-2 items-start">
                          <Input placeholder="Banner Url" type="url" />

                          <Button>Save</Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <Trash2
                    className="align-bottom text-red-500 mt-4 "
                    onClick={() => handleRemove(item?.id)}
                  />
                </div>
              </>
            ))}
          </Accordion>
          <Button onClick={handleAddMore}>Add More</Button>
        </Card>
      </div>
      <div className="flex-1">
        <Card className="p-6 space-y-3">
          <SectionTitle className=""> Featured Products Set Up</SectionTitle>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Feature Products One</AccordionTrigger>
              <AccordionContent>
                <div className="flex  items-center">
                  <span className="p-4">
                    <ImageIcon width={100} height={100} />
                  </span>
                  <div className="space-y-3 w-full flex flex-col items-end ">
                    <Input placeholder="Button Url" type="url" />
                    <Textarea placeholder="Banner Heading" />
                    <Button className="align-bottom"> Save Now</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Featured Products Two</AccordionTrigger>
              <AccordionContent>
                <div className="flex  items-center">
                  <span className="p-10">
                    <ImageIcon width={100} height={100} />
                  </span>
                  <div className="space-y-3 w-full flex flex-col items-end ">
                    <Input placeholder="Button Url" type="url" />
                    <Textarea placeholder="Banner Heading" />
                    <Button className="align-bottom"> Save Now</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Featured Products Three</AccordionTrigger>
              <AccordionContent>
                <div className="flex  items-center">
                  <span className="p-10">
                    <ImageIcon width={100} height={100} />
                  </span>
                  <div className="space-y-3 w-full flex flex-col items-end ">
                    <Input placeholder="Button Url" type="url" />
                    <Textarea placeholder="Banner Heading" />
                    <Button className="align-bottom"> Save Now</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </div>
  );
};

export default SliderSection;
