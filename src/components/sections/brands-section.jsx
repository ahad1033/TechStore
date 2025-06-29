"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const fashionBrands = [
  { src: "/images/brands/chanel.svg", alt: "Chanel" },
  { src: "/images/brands/gucci.svg", alt: "Gucci" },
  { src: "/images/brands/prada.svg", alt: "Prada" },
  { src: "/images/brands/louis-vuitton.svg", alt: "Louis Vuitton" },
  { src: "/images/brands/armani.svg", alt: "Armani" },
  { src: "/images/brands/burberry.svg", alt: "Burberry" },
  { src: "/images/brands/zara.svg", alt: "Zara" },
  { src: "/images/brands/hm.svg", alt: "H&M" },
];

export default function BrandsSection() {
  return (
    <section className="py-64 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="my-6 text-2xl lg:text-4xl font-bold text-foreground">
          Trusted by these brands
        </h2>
      </div>

      <div className="pt-10 md:pt-16 lg:pt-20 relative mx-auto flex items-center justify-center lg:max-w-5xl">
        <Carousel opts={{ loop: true }}>
          <CarouselContent className="flex -ml-0">
            {fashionBrands.map((brand, idx) => (
              <CarouselItem
                key={idx}
                className="min-w-0 shrink-0 grow-0 flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
              >
                <div className="mx-10 flex items-center justify-center">
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className="h-10 w-auto grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Edge fading overlays */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
