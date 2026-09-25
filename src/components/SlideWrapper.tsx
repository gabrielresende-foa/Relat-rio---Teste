import React, { useEffect, useRef, useState } from 'react';

interface SlideWrapperProps {
  children: React.ReactNode;
  isActive?: boolean;
  isContinuous?: boolean;
}

export const SlideWrapper: React.FC<SlideWrapperProps> = ({
  children,
  isActive = true,
  isContinuous = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (isContinuous) return;

    const handleResize = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;

      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;

      // Desired slide dimensions: 1280 x 720 (16:9)
      const targetWidth = 1280;
      const targetHeight = 720;

      // Allow 32px padding on all sides
      const availWidth = Math.max(320, parentWidth - 48);
      const availHeight = Math.max(240, parentHeight - 48);

      const scaleX = availWidth / targetWidth;
      const scaleY = availHeight / targetHeight;

      // Take the smaller scale to fit entirely within viewport
      const fitScale = Math.min(scaleX, scaleY, 1.25);
      setScale(Math.max(0.25, fitScale));
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [isContinuous]);

  if (isContinuous) {
    return (
      <div className="w-full max-w-[1280px] mx-auto mb-10 slide-page-break">
        <div className="w-full aspect-[16/9] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-800/40">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center p-2 sm:p-4 select-none ${
        isActive ? 'flex' : 'hidden'
      }`}
    >
      <div
        style={{
          width: '1280px',
          height: '720px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
        className="shrink-0 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-800/40 transition-transform duration-200"
      >
        {children}
      </div>
    </div>
  );
};
