'use client';

import React from 'react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import { Project } from '@/data/portfolio-data';

interface PhoneMockupProps {
  project: Project;
}

function IosBatteryIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="0.6"
        y="0.6"
        width="18"
        height="9.8"
        rx="2.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.8"
      />
      <rect
        x="2.4"
        y="2.4"
        width="11"
        height="6.2"
        rx="1.4"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path
        d="M19.6 4C20.3 4.4 20.8 5 20.8 5.5C20.8 6 20.3 6.6 19.6 7V4Z"
        fill="currentColor"
        fillOpacity="0.8"
      />
    </svg>
  );
}

export function DualDeviceMockup({ project }: PhoneMockupProps) {
  const [c1, c2] = project.bannerGradient;
  const androidScreen = project.screens?.[0];
  const iosScreen = project.screens?.[1] ?? project.screens?.[0];

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* ----------------------------------------------------
          BACK DEVICE: Android (Google Pixel 9 Pro)
          Position: left 71%, top 18%, width 27.5%, rotated 8deg
          ---------------------------------------------------- */}
      <div
        className="absolute w-[27.5%] aspect-1620/3136 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
        style={{
          left: '71%',
          top: '18%',
          transform: 'rotate(8deg)',
          filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.45))',
          zIndex: 10,
        }}
      >
        {/* Android Screen Solid Backing (under bezel to eliminate corner gaps) */}
        <div
          className="absolute bg-[#0D0F14] pointer-events-none"
          style={{
            left: '8.5%',
            top: '3.5%',
            width: '83%',
            height: '93%',
            borderRadius: '16% / 8%',
          }}
        />

        {/* Android Screen Viewport (clipped behind bezel) */}
        <div
          className="absolute bg-[#0D0F14] overflow-hidden flex flex-col"
          style={{
            left: '10.5%',
            top: '4.5%',
            width: '79%',
            height: '91%',
            borderRadius: '11.5% / 5.2%',
          }}
        >
          {androidScreen ? (
            <div className="relative w-full h-full">
              <Image
                src={getAssetPath(androidScreen)}
                alt={`${project.title} Android screen`}
                fill
                sizes="(max-width: 768px) 150px, 200px"
                className="object-cover object-top"
              />
            </div>
          ) : (
            <>
              {/* Android Status Bar (right-aligned for clean overlap) */}
              <div className="pt-[5%] px-[8%] pb-[2%] flex items-center justify-end gap-1 text-white/70">
                <span className="text-[4px] font-bold tracking-tighter opacity-75">5G</span>
                <IosBatteryIcon className="w-[8.5px] h-[4.2px] text-white/75" />
              </div>

              {/* Android App Content */}
              <div className="px-[7%] flex flex-col gap-1.5 flex-1 pt-1">
                {/* Themed Android Metric Card */}
                <div
                  className="p-1.5 rounded-md flex flex-col gap-1"
                  style={{
                    background: `linear-gradient(135deg, ${c1}40, ${c2}25)`,
                    border: `1px solid ${c1}50`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-1.5 rounded-full bg-white/70" />
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: c1 }}
                    />
                  </div>
                  <div className="w-12 h-2 rounded-full bg-white/90" />
                  {/* Mini Bar Chart */}
                  <div className="flex items-end gap-1 h-4 pt-1">
                    <div className="flex-1 h-[45%] rounded-t-[1px] bg-white/30" />
                    <div className="flex-1 h-[70%] rounded-t-[1px] bg-white/50" />
                    <div
                      className="flex-1 h-full rounded-t-[1px]"
                      style={{ backgroundColor: c1 }}
                    />
                    <div className="flex-1 h-[60%] rounded-t-[1px] bg-white/40" />
                    <div className="flex-1 h-[85%] rounded-t-[1px] bg-white/60" />
                  </div>
                </div>

                {/* 2 Android Material List Items */}
                <div className="flex flex-col gap-1">
                  <div className="p-1 rounded-[5px] bg-white/5 border border-white/10 flex items-center gap-1.5">
                    <div
                      className="w-3.5 h-3.5 rounded-[3px] shrink-0"
                      style={{ backgroundColor: `${c1}60` }}
                    />
                    <div className="flex-1 flex flex-col gap-0.5">
                      <div className="w-full h-1 rounded-full bg-white/60" />
                      <div className="w-2/3 h-1 rounded-full bg-white/30" />
                    </div>
                  </div>
                  <div className="p-1 rounded-[5px] bg-white/5 border border-white/10 flex items-center gap-1.5">
                    <div
                      className="w-3.5 h-3.5 rounded-[3px] shrink-0"
                      style={{ backgroundColor: `${c2}60` }}
                    />
                    <div className="flex-1 flex flex-col gap-0.5">
                      <div className="w-4/5 h-1 rounded-full bg-white/60" />
                      <div className="w-1/2 h-1 rounded-full bg-white/30" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Android Gesture Navigation Pill */}
              <div className="pb-1.5 pt-1 flex justify-center">
                <div className="w-8 h-0.5 bg-white/40 rounded-full" />
              </div>
            </>
          )}
        </div>

        {/* Real Pixel 9 Pro Transparent Hardware Mockup Frame */}
        <Image
          src={getAssetPath('/images/mockups/pixel-9-pro-obsidian.webp')}
          alt="Android Device Frame"
          fill
          sizes="200px"
          className="object-contain pointer-events-none select-none z-20"
        />
      </div>

      {/* ----------------------------------------------------
          FRONT DEVICE: iOS (Apple iPhone 16)
          Position: left 52.5%, top 9%, width 30.5%, rotated -4deg
          ---------------------------------------------------- */}
      <div
        className="absolute w-[30.5%] aspect-1379/2756 transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1.5"
        style={{
          left: '52.5%',
          top: '9%',
          transform: 'rotate(-4deg)',
          filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.55))',
          zIndex: 20,
        }}
      >
        {/* iOS Screen Solid Backing (under bezel to completely eliminate corner gaps) */}
        <div
          className="absolute bg-[#0B0C10] pointer-events-none"
          style={{
            left: '4.5%',
            top: '2.2%',
            width: '91%',
            height: '95.6%',
            borderRadius: '17% / 8.5%',
          }}
        />

        {/* iOS Screen Viewport (clipped behind bezel) */}
        <div
          className="absolute bg-[#0B0C10] overflow-hidden flex flex-col"
          style={{
            left: '7.25%',
            top: '3.63%',
            width: '85.5%',
            height: '92.74%',
            borderRadius: '14% / 6.5%',
          }}
        >
          {iosScreen ? (
            <div className="relative w-full h-full">
              <Image
                src={getAssetPath(iosScreen)}
                alt={`${project.title} iOS screen`}
                fill
                sizes="(max-width: 768px) 180px, 240px"
                className="object-cover object-top"
              />
            </div>
          ) : (
            <>
              {/* iOS Status Bar with Dynamic Island spacing */}
              <div className="pt-[4.5%] px-[9.5%] pb-[2%] flex items-center justify-between text-white/85">
                <span className="text-[5px] font-semibold tracking-tight">9:41</span>
                {/* Dynamic Island physical pill is inside frame.png at center */}
                <IosBatteryIcon className="w-[9.5px] h-[4.8px] text-white/85" />
              </div>

              {/* iOS App UI Screen */}
              <div className="px-[7%] flex flex-col gap-1.5 flex-1 pt-1">
                {/* Top Themed Hero Banner */}
                <div
                  className="w-full rounded-[7px] p-[8%] flex flex-col justify-end gap-1 shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${c1}, ${c2})`,
                  }}
                >
                  <div className="w-[65%] h-[3.5px] bg-white rounded-full shadow-xs" />
                  <div className="w-[42%] h-[2.5px] bg-white/75 rounded-full" />
                </div>

                {/* 3 Quick Action Chips */}
                <div className="flex gap-1 py-0.5">
                  <div
                    className="flex-1 h-1.25 rounded-full"
                    style={{ backgroundColor: c1 }}
                  />
                  <div
                    className="flex-1 h-1.25 rounded-full opacity-40"
                    style={{ backgroundColor: c1 }}
                  />
                  <div
                    className="flex-1 h-1.25 rounded-full opacity-25"
                    style={{ backgroundColor: c1 }}
                  />
                </div>

                {/* iOS Styled Card Rows */}
                <div className="flex flex-col gap-1.5">
                  <div className="p-1.5 rounded-[7px] bg-[#171922] border border-white/10 flex items-center gap-1.5">
                    <div
                      className="w-4 h-4 rounded-[5px] shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: c1 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
                    </div>
                    <div className="flex-1 flex flex-col gap-0.5">
                      <div className="w-[85%] h-[2.5px] rounded-full bg-white/80" />
                      <div className="w-[50%] h-0.5 rounded-full bg-white/40" />
                    </div>
                  </div>

                  <div className="p-1.5 rounded-[7px] bg-[#171922] border border-white/10 flex items-center gap-1.5">
                    <div
                      className="w-4 h-4 rounded-[5px] shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: c2 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
                    </div>
                    <div className="flex-1 flex flex-col gap-0.5">
                      <div className="w-[75%] h-[2.5px] rounded-full bg-white/80" />
                      <div className="w-[45%] h-0.5 rounded-full bg-white/40" />
                    </div>
                  </div>
                </div>
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="pb-1.5 pt-1 flex justify-center">
                <div className="w-10 h-[2.5px] bg-white/50 rounded-full" />
              </div>
            </>
          )}
        </div>

        {/* Real iPhone 16 Transparent Hardware Mockup Frame */}
        <Image
          src={getAssetPath('/images/mockups/iphone-16-black.webp')}
          alt="iOS Device Frame"
          fill
          sizes="200px"
          className="object-contain pointer-events-none select-none z-20"
        />
      </div>
    </div>
  );
}
