"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid"
import { toast } from "react-hot-toast";
import supabase from "../(utils)/supabase";

function ReviewForm() {
  const { id: productId } = useParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function onSubmit(e: any) {
    e.preventDefault();
    const id = toast.loading("Submitting review...", {
      position: 'bottom-center'
    })
    console.log(uuidv4())
    const { error } = await supabase
      .from("reviews")
      .insert({
        id: uuidv4(),
        name,
        rating,
        review,
        product_id: productId,
        date: Date.now()
      })
    if(error) {
      toast.error(`Could not submit review`, {
        position: 'bottom-center',
        id
      })
      return;
    }
    toast.success(`Review successfully submitted`, {
      position: 'bottom-center',
      id
    })
    setReview("");
    setEmail("");
    setName("");
    setRating(0);
    console.log(rating, review, name, email);
  }

  return (
    <form onSubmit={onSubmit} className="mb-16">
      <h2 className="text-3xl font-semibold mb-2">Add a review</h2>
      {/* Rating */}
      <div className="flex flex-col mb-4">
        <label className="leading-loose mb-2">Your rating</label>
        <div className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <i
              onClick={() => setRating(index + 1)}
              className={`${
                index + 1 <= rating ? "fa-solid text-yellow-400" : "fa-regular"
              } fa-star px-1 text-xl cursor-pointer`}
              key={index}
            ></i>
          ))}
        </div>
      </div>
      {/* Review */}
      <div className="flex flex-col mb-4">
        <label className="leading-loose mb-2">Your review</label>
        <textarea
          className="border resize-none p-2 scrollbar-hide bg-neutral-100"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={8}
          required
        ></textarea>
      </div>
      {/* Name and email */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-grow flex flex-col">
          <label className="leading-loose mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border resize-none p-2 bg-neutral-100"
            required
          />
        </div>
        <div className="flex-grow flex flex-col">
          <label className="leading-loose mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border resize-none p-2 bg-neutral-100"
            required
          />
        </div>
      </div>
      {/* Submit */}
      <button className="h-12 text-white bg-lime-500 font-medium leading-none outline-none relative overflow-hidden group w-full xs:w-48">
        <div className="absolute inset-0 bg-lime-600 translate-y-[101%] group-hover:translate-y-0 duration-200"></div>
        <span className="relative">Submit</span>
      </button>
    </form>
  );
}
export default ReviewForm;
