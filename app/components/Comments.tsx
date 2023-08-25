export const dynamic = "force-dynamic";

import React from "react";
import { db } from "../db";
import { revalidateTag } from "next/cache";
import SubmitButton from "./SubmitButton";

async function getData(id: string) {
  const data = await db.comment.findMany({
    where: {
      movieId: id,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return data;
}

async function postData(formData: FormData) {
  "use server";

  const data = await db.comment.create({
    data: {
      message: formData.get("comment") as string,
      name: formData.get("name") as string,
      movieId: formData.get("id") as string,
    },
  });
  revalidateTag("comment");
  //revalidatePath("/movie/[movieId]");
  //revalidateTag("comment");
}

// async function removeData(id: string) {
//   const data = await db.comment.delete({
//     where: {
//       movieId: id as string,
//     },
//   });

//   revalidatePath("/movie/[movieId]");
// }

async function Comments({ id }: { id: string }) {
  const data = await getData(`${id}`);

  return (
    <div className="rounded-lg">
      <h4 className="text-xl font-semibold mb-5">
        Comments Components{" "}
        <span className="text-sm text-gray-200 font-normal ">
          Movie Id= {id}
        </span>
      </h4>

      <div className="mb-5 flex flex-col gap-y-3">
        {data.map((post) => (
          <div
            key={post.id}
            className="comment-item flex flex-col border rounded-lg mb-2 text-left p-3"
          >
            <div className="comment-header flex justify-between">
              <h5 className="-mt-5 bg-white dark:bg-background px-3 capitalize">
                {post?.name ? post.name : "Guest"}
              </h5>
            </div>
            <div className="comment-content text-sm px-3 text-gray-500 dark:text-stone-300">
              <p>{post.message}</p>
              <p className="text-sm right float-right">
                {post?.createAt.toLocaleTimeString("en-US")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-left bg-slate-200/50  p-5 rounded-xl">
        <form action={postData}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name or Guest"
            className="form-control mb-5 w-full border border-gray-300 hover:border-blue-500 rounded-lg p-2"
          />
          <label htmlFor="comment">Comment</label>
          <textarea
            name="comment"
            id=""
            placeholder="Add your comment..."
            rows={5}
            className="form-control mb-5 w-full border border-gray-300 hover:border-blue-500 rounded-lg p-2"
          ></textarea>
          <input type="hidden" name="id" value={id} />
          <div className="flex flex-row-reverse">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

Comments.propTypes = {};

export default Comments;
