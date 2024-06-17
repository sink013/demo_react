import React, { useEffect, useRef, useState } from "react";
// 封装一个Image组件要求实现裂图处理，如果图片加载失败会显示一个默认错误图片。
const LazyImg = (props) => {
  const ref = useRef();
  const [src, setSrc] = useState("/loading.png");
  //   19.自己实现图片懒加载，而不是用插件（5分）
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setSrc(props.src);
        io.disconnect();
      }
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
    };
  }, []);
  return (
    <>
      <img
        ref={ref}
        {...props}
        alt=""
        src={src}
        onError={() => setSrc("/error.jpg")}
      />
    </>
  );
};

export default LazyImg;
