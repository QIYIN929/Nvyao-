import { useState, useEffect } from 'react';
import { PROLOGUE_TEXT } from '../../data/gameContent';

export default function Prologue({ onEnter }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isUnrolled, setIsUnrolled] = useState(false);

  useEffect(() => {
    // 卷轴展开动画延迟
    const unrollTimer = setTimeout(() => setIsUnrolled(true), 500);

    const timers = [];
    PROLOGUE_TEXT.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 1500 + i * 800));
    });
    timers.push(setTimeout(() => setShowTitle(true), 1500 + PROLOGUE_TEXT.length * 800 + 500));
    timers.push(setTimeout(() => setShowButton(true), 1500 + PROLOGUE_TEXT.length * 800 + 1500));
    
    return () => {
      clearTimeout(unrollTimer);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen paper-bg flex items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* 卷轴背景容器 */}
      <div 
        className="relative flex justify-center items-center h-[80vh] transition-all duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          width: isUnrolled ? '100%' : '20px',
          maxWidth: '1200px',
          opacity: isUnrolled ? 1 : 0,
        }}
      >
        {/* 卷轴轴杆 (左右) */}
        <div className="absolute left-0 top-[-2%] bottom-[-2%] w-3 bg-gradient-to-r from-[#4A3728] via-[#6B5B4E] to-[#4A3728] shadow-lg rounded-full z-20"></div>
        <div className="absolute right-0 top-[-2%] bottom-[-2%] w-3 bg-gradient-to-r from-[#4A3728] via-[#6B5B4E] to-[#4A3728] shadow-lg rounded-full z-20"></div>

        {/* 卷轴内容纸张 */}
        <div className="absolute inset-y-0 left-3 right-3 bg-[#F9F6F0] border-y border-[#C29C57]/40 shadow-inner flex flex-row-reverse items-center justify-center overflow-hidden bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix type=%22saturate%22 values=%220%22/%3E%3C/filter%3E%3Crect width=%22400%22 height=%22400%22 filter=%22url(%23noise)%22 opacity=%220.04%22/%3E%3C/svg%3E')]">
          
          <div className="h-full flex flex-row-reverse items-center py-20 px-12 gap-16 relative z-10 w-full justify-center">
            
            {/* 标题印章区 (最右侧) */}
            <div className="flex flex-col items-center justify-start h-full pt-10">
              <div className="opacity-0 animate-ink-fade mb-12" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                <div className="seal w-10 h-24 text-base tracking-[0.3em]">女妖自述</div>
              </div>
              
              {showTitle && (
                <div className="animate-ink-fade flex flex-col items-center">
                  <span className="vertical-text text-xs tracking-widest text-ash mb-8">序章</span>
                  <h1 className="vertical-text text-[2.5rem] md:text-[3.5rem] text-vermillion tracking-[0.3em] font-serif drop-shadow-md" style={{ fontFamily: "'Ma Shan Zheng', serif" }}>
                    女妖自述
                  </h1>
                </div>
              )}
            </div>

            {/* 竖排正文区 (中间) */}
            <div className="flex flex-row-reverse gap-8 md:gap-12 h-[60vh]">
              {PROLOGUE_TEXT.map((line, i) => (
                <p
                  key={i}
                  className="vertical-text text-[15px] md:text-[17px] leading-loose transition-all duration-[1500ms]"
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    color: 'var(--ink-light)',
                    letterSpacing: '0.4em',
                    opacity: visibleLines > i ? 1 : 0,
                    transform: visibleLines > i ? 'translateX(0)' : 'translateX(-20px)',
                    filter: visibleLines > i ? 'blur(0)' : 'blur(4px)',
                  }}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* 按钮与落款区 (最左侧) */}
            {showButton && (
              <div className="animate-ink-fade flex flex-col justify-end items-center h-full pb-10" style={{ animationFillMode: 'forwards' }}>
                <p className="vertical-text text-xs text-ash tracking-[0.3em] leading-loose mb-12">
                  执笔者不知何人<br />
                  字迹时而工整时而潦草<br />
                  某处以浓墨涂去<br />
                  仿佛她曾回头 不甘
                </p>
                <button
                  onClick={onEnter}
                  className="group relative px-3 py-12 border transition-all duration-500 hover-glow"
                  style={{
                    borderColor: 'var(--vermillion)',
                    color: 'var(--vermillion)',
                    background: 'transparent',
                    fontFamily: "'Noto Serif SC', serif",
                    fontSize: '16px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--vermillion)';
                    e.currentTarget.style.color = 'var(--paper)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--vermillion)';
                  }}
                >
                  <span className="vertical-text tracking-[0.3em]">拾起手稿</span>
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
