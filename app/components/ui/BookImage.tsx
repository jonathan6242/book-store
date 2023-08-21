'use client'
import Image from "next/image"

function BookImage({ url }: { url: string }) {
  return (
    <figure className="w-full max-w-xs lg:max-w-sm shadow-lg flex-shrink-0">
      <Image
        src={url}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        style={{ height: "auto", width: "100%" }}
      />
    </figure>
  )
}
export default BookImage