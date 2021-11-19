import React from "react";

export function LayoutMain(props: { children?: any, color: {primary: string, secondary: string}  }) {
  return <BackGround config={{
    colorBgLeft: props.color.primary,
    colorBgRight: props.color.secondary,
  }} >
    <div className="container p-3 pt-10 sm:p-6 mx-auto p-0 md:p-16 z-10 relative">
      {props.children}
    </div>
  </BackGround>
}

type BackGroundConfig = {
  colorBgLeft: string, 
  colorBgRight: string
}

function BackGround(props: { children: any, config: BackGroundConfig }) {
  const lineColor = props.config.colorBgLeft;
  const bgColor1 = 'transparent';
  const bgColor = props.config.colorBgRight;
  const bgVertical = `linear-gradient(0deg, ${bgColor1} 45%, ${lineColor} 45%, ${lineColor} 55%, ${bgColor1} 55%, ${bgColor1} 20%, ${lineColor} 20%, ${lineColor} 30%,${bgColor1} 30%)`;
  const offset = 0;
  const bgHorizont = `linear-gradient(90deg, ${bgColor} ${45 - offset}%, ${lineColor} ${45 - offset}%, ${lineColor} ${55 - offset}%, ${bgColor} ${55 - offset}%, ${bgColor} ${20 - offset}%, ${lineColor} ${20 - offset}%, ${lineColor} ${30 - offset}%,${bgColor} ${30 - offset}%)`;
  const backGroundStr = `${bgVertical}, ${bgHorizont}`;
  const clipStr = `inset(0 0 0 1.5em)`;
  return <div className="fixed inset-0" style={{ backgroundColor: props.config.colorBgLeft }}>
    <div className="fixed inset-0" style={{ clipPath: clipStr, left: '70%', background: backGroundStr, backgroundSize: '3em 3em' }}>
    </div>
    <div className="w-full h-full overflow-y-auto relative">
      {props.children}
    </div>
  </div>
}

