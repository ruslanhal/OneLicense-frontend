import React from 'react'

interface SkeletonProps{
    skeletons:number[]
}

export default function Skeleton({skeletons}) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {skeletons.map((item) => (
          <div
            key={item}
            className="w-[100%] h-[450px] bg-[#A9A9A9] border border-[D3D3D3]"
          ></div>
        ))}
      </div>
  )
}
